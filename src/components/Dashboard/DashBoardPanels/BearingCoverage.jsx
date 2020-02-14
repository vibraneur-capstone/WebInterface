import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

export default class BearingCoverage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
        }

        this.getCoverage = this.getCoverage.bind(this);
        this.updateCoverage = this.updateCoverage.bind(this);
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
            this.props.setTitle('Coverage')
        }
        this.getCoverage();
    }

    getCoverage() {
        let url = 'https://sensor.vibraneur.com/inventory/v1/husky/bearing/count'
        this.sendRequest(url, this.updateCoverage);
    }

    updateCoverage(id, value) {
        let label = [];
        let label_val = [];
        
        if (id === 'coverage') {
            for (let idx in value) {
                if (idx !== 'total') {
                    label.push(idx);
                    label_val.push(value[idx]);
                }
            }

            this.setState({
                labels: label,
                label_vals: label_val
            })
        } else {
            throw new Error("Invalid ID");
        }
    }


    /*
        sends a Request for the expected data
    */
   sendRequest(url, callback) {
    axios.get(url).then(function (response) {
        // Check to make sure the data has actually been returned
        if (response.data !== undefined) {
            let sensors = response.data;
            if (sensors === undefined) {
                return;
            } else {
                callback('coverage', sensors);
            }
        }
    }).catch(function (error) {
        // handle error
        console.warn("Error: ", error);
    })
}

    render() {
        return (
            <div style={{width: '100%', height: 'calc(100% - 30px)' }}>
                <Plot style={{width: '100%', height: '100%'}}
                    data={[{
                        values: this.state.label_vals,
                        labels: this.state.labels,
                        textinfo: "label+percent",
                        textposition: "inside",
                        hole: .3,
                        type: 'pie'
                    }]}
                    layout={{ autosize: true,  showlegend: false, margin: {l: 10, r: 10, b: 10, t: 10}}}
                    
                ></Plot>
            </div>
        )
    }
}