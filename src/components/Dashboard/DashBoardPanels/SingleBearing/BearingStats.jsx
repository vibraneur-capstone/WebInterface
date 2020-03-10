import React from 'react';
import axios from 'axios';

export default class BearingStats extends React.Component {
    constructor (props) {
        super(props);
      
        this.state = {
            settings: {}
        }

        this.sendRequest = this.sendRequest.bind(this);   
        this.updateSettings = this.updateSettings.bind(this);
    }

    componentDidMount() {
        this.sendRequest('https://sensor.vibraneur.com/inventory/v1/bearing?id=' + this.props.id, this.updateSettings)
    }

    updateSettings (data) {
        console.warn("UPDATE SETTINGS");
        let settings = data.tags;
        this.setState({
            settings: settings
        })

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
                    callback(data);
                }
            }
        }).catch(function (error) {
            // handle error
            console.warn("Error: ", error);
        })
    }

    render () {
      
        let settings = this.state.settings;
        let settingDiv = []
        
        if (settings !== undefined) {
            for (let [key, value]of Object.entries(settings)) {
                let string = key + ' : ' + value;
                settingDiv.push(<div key={key}>{string}</div>)
            }    
        }
        
        return (
            <div>
                {settingDiv}
            </div>
        )
    }
}