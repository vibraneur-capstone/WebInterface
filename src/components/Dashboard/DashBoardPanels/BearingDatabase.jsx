import React from 'react';
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
    }

    getSensors() {
        //let url = 'https://sensor.vibraneur.com/inventory/v1/org/ford-mortor/machine/modling-machine/sensors?status=ONLINE'

        // Create mock response for testing
        let test = [
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

        //this.sendRequest(url);
    }

    updateSensors(id, value) {
        if (id === 'sensors') {
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
                let sensors = response.data.sensorList;
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
            let sensors = this.state.sensors.sensorList;
            
            table = <FilterableTable
                data={sensors}
                fields={
                    [{
                        name: 'id',
                        displayName: "ID",
                        inputFilterable: true,
                        sortable: true
                    },
                    {
                        name: 'status',
                        displayName: "Status",
                        inputFilterable: true,
                        sortable: false,
                    }]
                }
            ></FilterableTable>
        }
        

        return (
            <div>
                {table}
            </div>
        )
    }
}