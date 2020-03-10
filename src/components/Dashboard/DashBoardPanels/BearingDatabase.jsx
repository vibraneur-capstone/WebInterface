import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import FilterableTable from 'react-filterable-table';

export default class BearingDatabase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.getSensors = this.getSensors.bind(this);
        this.updateSensors = this.updateSensors.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }

    componentDidMount() {
        if ('config' in this.props) {
            let config = this.props.config;
            if (config !== undefined && 'id' in config) {
                this.props.setTitle(config.id);
            } else {
                // We have to search for the bearing from user input
                this.setState({
                    search: true,
                })
            }
        } else {
            this.props.setTitle('Sensors')
        }
        this.getSensors();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.sensors !== nextState.sensors) {
            return true;
        } else {
            return false;
        }
    }

    getSensors() {
        let status = 'ALL';
        if ('status' in this.props) {
            status = this.props.status;
        }
        let url = 'https://sensor.vibraneur.com/inventory/v1/' + this.props.organization + '/bearings?status=' + status;
        this.sendRequest(url, this.updateSensors);
    }

    updateSensors(id, value) {
        if (id === 'sensors') {
            let new_sensors = [];
            for (let sensor in value) {
                let sensor_obj = value[sensor]
                if (sensor_obj !== undefined) {
                    let internalID = sensor_obj.id;
                    let status = sensor_obj.status;
                    let tags = sensor_obj.tags;
                    sensor_obj = tags;
                    tags['internalID'] = internalID;
                    tags['status'] = status;
                    let id = sensor_obj.id
                    sensor_obj.id = <Button className='databaseID' onClick={() => this.props.addPanel('Single Bearing', { 'config': {'id': internalID} })}>{id}</Button>
                }

                value[sensor] = sensor_obj;
            }

            this.setState({
                sensors: value
            })

        } else {
            throw new Error('Invalid Parameter')
        }
    }


    /*
        sends a Request for the expected data
    */
    sendRequest(url, callback) {
        axios.get(url).then(function (response) {
            // Check to make sure the data has actually been returned
            if (response.data !== undefined) {
                let sensors = response.data.bearingList;
                if (sensors === undefined) {
                    console.warn("Empty Response");
                    return;
                } else {
                    callback('sensors', sensors);
                }
            }
        }).catch(function (error) {
            // handle error
            console.warn("Error: ", error);
        })
    }

    render() {

        let table;
        if (this.state.sensors !== undefined) {
            let sensors = this.state.sensors;

            table = <FilterableTable
                className='sensor_table'
                data={sensors}
                fields={
                    [{
                        name: 'id',
                        displayName: "ID",
                        inputFilterable: true,
                        sortable: true,
                        emptyDisplay: '--'
                    },
                    {
                        name: 'status',
                        displayName: "Status",
                        inputFilterable: true,
                        sortable: true,
                        emptyDisplay: '--'
                    }]
                }
            ></FilterableTable>
        }


        return (
            <div className='inside_panel BearingDatabase'>
                {table}
            </div>
        )
    }
}