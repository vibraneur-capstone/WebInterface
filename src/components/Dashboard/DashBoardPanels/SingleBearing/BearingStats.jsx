import React from 'react';
import axios from 'axios';

export default class BearingStats extends React.Component {
    constructor (props) {
        super(props);

        this.sendRequest = this.sendRequest.bind(this);   
    }

    componentDidMount() {
        this.sendRequest('https://sensor.vibraneur.com/inventory/v1/sensor?id=5e35e369d956e2dad90fbfda', this.updateSettings)
    }

    updateSettings (data) {
        let settings = data.settings
    }

    sendRequest(url, callback) {
        axios.get(url).then(function (response) {
            // Check to make sure the data has actually been returned
            if (response.data !== undefined) {
                let data = response.data;
                if (data === undefined) {
                    console.warn("Empty Response");
                    return;
                } else {
                    callback('sensors', data);
                }
            }
        }).catch(function (error) {
            // handle error
            console.warn("Error: ", error);
        })
    }

    render () {

        let settings = {
            Name: 1,
            Status: 2,
            id: 3,
            Sensors: 4
        }

        let settingDiv = []
        for (let [key, value]of Object.entries(settings)) {
            let string = 'Setting' + key + ' : ' + value;
            settingDiv.push(<div>{string}</div>)
        }


        return (
            <div>
                {settingDiv}
            </div>
        )
    }
}