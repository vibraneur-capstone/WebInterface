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
        this.getSensors();
        this.props.setTitle('Sensors')
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
        let url = 'https://sensor.vibraneur.com/inventory/v1/husky/bearings?status=' + status;
        this.sendRequest(url, this.updateSensors);

        // Create mock response for testing
        /*let test = [
            {
                "id": 'b14567',
                "status": 'ONLINE'
            },
            {
                "id": 'b14568',
                "status": 'OFFLINE'
            },
            {
                "id": 'b14569',
                "status": 'DECOMMISSIONED'
            },
            {
                "id": 'b14570',
                "status": 'ONLINE'
            },
            {
                "id": 'b14571',
                "status": 'ONLINE'
            },
        ]

        

        this.updateSensors('sensors', test);
        //*/
    }

    updateSensors(id, value) {
        if (id === 'sensors') {
            for (let sensor in value) {
                let sensor_obj = value[sensor]
                if (sensor_obj !== undefined) {
                    let id = sensor_obj.id
                    sensor_obj.id = <Button className='databaseID' onClick={() => this.props.addPanel('Single Bearing', { 'id': id })}>{id}</Button>
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
            console.warn("Response: ", response);
            console.warn("Data: ", response.data);
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
            <div className='BearingDatabase' style={{ width: '100%', height: 'calc(100% - 30px)' }}>
                {table}
            </div>
        )
    }
}