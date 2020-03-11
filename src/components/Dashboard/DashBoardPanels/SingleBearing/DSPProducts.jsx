import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import SockJsClient from 'react-stomp';
import TimeScale from './TimeScale.jsx';

export default class DSPProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateRange: undefined,
            DSPdata: { 'rms': [], 'kurtosis': [], 'crest': [], 'shape': [], timestamps: [] },
            revision: 2,
            features: ['rms', 'kurtosis', 'crest', 'shape'],
        }
        this.fetchData = this.fetchData.bind(this);
        this.getDates = this.getDates.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateRaw = this.updateRaw.bind(this);
        this.updateTimeScale = this.updateTimeScale.bind(this);
    }

    componentDidMount() {
        let dates = this.getDates();
        this.fetchData(dates.startDate, dates.endDate);
    }

    componentDidUpdate(prevProps, prevState) {
        console.warn("LPREVSTATE: ", prevState);
        console.warn("THIS.STATE: ", this.state);
    }

    getDates(bearingID) {

        this.setState({
            dateRange: {
                startDate: 1583800251,
                endDate: 1583800251
            }
        })

        return {
            startDate: 1583800251,
            endDate: 1583800251
        }
    }

    fetchData(startDate, endDate) {
        let self = this;
        let url = 'https://streaming.vibraneur.com/vape-data-streaming/v1/data/dsp?sensorId=123&from=' + startDate + '&to=' + endDate;
        axios.get(url).then(function (response) {
            // Check to make sure the data has actually been returned
            if (response.data !== undefined) {
                if (response.data !== undefined) {
                    let data = []
                    for (let feature in this.state.features) {
                        
                        if (this.state.dateRange !== undefined && response.data !== undefined) {
                            let tmp = parseFloat(feature) + 1;
                            let plotNumY = 'y' + (tmp).toString();
                            let plotNumX = 'x' + (tmp).toString();
                            
                            if (this.state.features[feature] in response.data) {
                                data.push(
                                    {
                                        x: response.data['timestamps'],
                                        y: response.data[this.state.features[feature]],
                                        xaxis: plotNumX,
                                        yaxis: plotNumY,
                                        type: 'scatter',
                                        mode: 'lines',
                                        name: this.state.features[feature]
                                    }
                                )
                            } 
                        }
                    }
                    
                    self.setState({
                        DSPdata: data,
                        revision: this.state.revision + 1
                    })
                    console.warn("Empty Response");
                    return;
                }
            }
        }.bind(this)).catch(function (error) {
            // handle error
            console.warn("Error: ", error);
        })
    }

    updateData(response) {
        console.warn("RESPONSE: ", response);
        let DSPdata = this.state.DSPdata//jQuery.extend({}, this.state.DSPdata);

        for (let key in DSPdata) {
            if (DSPdata[key].name in response) {
                console.warn("KEY: ", key);
                console.warn("DSPdata[key]: ", DSPdata[key])
                DSPdata[key].x = [].concat(DSPdata[key].x).concat([response.timestamp]);
                DSPdata[key].y = [].concat(DSPdata[key].y).concat([response[DSPdata[key].name]]);
            } 
        }
        //DSPdata['timestamps'].push(response.timestamp);

        this.setState({
            DSPdata: DSPdata,
            revision: this.state.revision + 1
        })
    }

    updateRaw (response) {
        console.warn("RAW RESPONSE: ", response);
        let DSPdata = this.state.DSPdata;
        if (this.state.features.includes('raw')) {
            for (let data in this.state.DSPdata) {
                console.warn("DATA: ", data);
                console.warn("RESPONSE.data: ", response.data);
                console.warn("response.timestamp: ", response.timestamp);
                if (DSPdata[data].name == 'raw') {
                    DSPdata[data].x = [].concat(DSPdata[data].x).concat([response.timestamp])
                    DSPdata[data].y = [].concat(DSPdata[data].y).concat(response.data);
                }
            }
        } else {
            let features = this.state.features;
            features.push('raw');
            DSPdata.push({
                x: response.data['timestamps'],
                                        y: response.data,
                                        x: [response.timestamp],
                                        xaxis: 'x5',
                                        yaxis: 'y5',
                                        type: 'scatter',
                                        mode: 'lines',
                                        name: 'raw'
            })
            this.setState({
                features: features
            })
        }

        this.setState({
            DSPdata: DSPdata,

        })
    }

    updateTimeScale (timescale) {
        console.warn("TIMESCALE: ", timescale);
    }

    render() {

        console.warn("RENDERING")
        let data = [];
        /*for (let feature in this.state.features) {
            console.warn("FEATURE: ", feature, this.state.features[feature])
            if (this.state.dateRange !== undefined && this.state.DSPdata !== undefined) {
                let tmp = parseFloat(feature) + 1;
                let plotNumY = 'y' + (tmp).toString();
                let plotNumX = 'x' + (tmp).toString();
                data.push(
                    {
                        x: this.state.DSPdata['timestamps'],
                        y: this.state.DSPdata[this.state.features[feature]],
                        xaxis: plotNumX,
                        yaxis: plotNumY,
                        type: 'scatter',
                        name: this.state.features[feature]
                    }

                )
            }
        }*/

        console.warn("REVISION: ", this.state.revision)
        return (
            <div>
                {/*<StartDatePull colours={this.props.colours}></StartDatePull>*/}
                <SockJsClient url='https://streaming.vibraneur.com/vape-data-streaming/v1/websocket' topics={['/message/dsp']}
                    onMessage={this.updateData}
                    ref={(client) => { this.clientRef = client }} />
                <SockJsClient url='https://streaming.vibraneur.com/vape-data-streaming/v1/websocket' topics={['/message/sensor']}
                    onMessage={this.updateRaw}
                    ref={(client) => { this.clientRef = client }} />

                <Plot style={{ width: '100%', height: '100%' }}
                    key={'plot'}
                    //revision={this.state.revision}
                    data={this.state.DSPdata}
                    layout={{
                        grid: { rows: 5, columns: 1, pattern: 'independent' },
                        autosize: true,
                        showlegend: true,
                        margin: { l: 35, r: 35, b: 35, t: 35 },
                        legend: {
                            x: 0,
                            y: 1.1,
                            traceorder: "normal",
                            font: {
                                family: "sans-serif",
                                size: 12,
                                color: "black"
                            },
                            opacity: 0,

                            //bgcolor: "LightSteelBlue",

                            orientation: "h"
                        },

                    }}
                ></Plot>
                <TimeScale
                    colours={this.props.colours}
                    updateTimeScale={this.updateTimeScale}
                ></TimeScale>
                {/*<EndDatePull colours={this.props.colours}></EndDatePull>*/}
            </div>
        )
    }
}