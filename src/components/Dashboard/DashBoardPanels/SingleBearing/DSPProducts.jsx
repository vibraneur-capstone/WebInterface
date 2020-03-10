import React from 'react';
import Plot from 'react-plotly.js';
import EndDatePull from './EndDatePull.jsx';
import StartDatePull from './StartDatePull.jsx';
import axios from 'axios';


export default class DSPProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateRange: undefined,
            DSPData: undefined,
            features: ['rms', 'kurtosis', 'crest', 'shape'],
        }
        this.fetchData = this.fetchData.bind(this);
        this.getDates = this.getDates.bind(this);
    }

    componentDidMount() {
        let dates = this.getDates();
        this.fetchData(dates.startDate, dates.endDate);
    }

    getDates(bearingID) {

        this.setState({
            dateRange: {
                startDate: 1583631051,
                endDate: 1583800251
            }
        })

        return {
            startDate: 1583631051,
            endDate: 1583800251
        }
    }

    fetchData(startDate, endDate) {
        let self = this;
        let url = 'https://streaming.vibraneur.com/vape-data-streaming/v1/dsp/data?sensorId=123&from=' + startDate + '&to=' + endDate;
        axios.get(url).then(function (response) {
            // Check to make sure the data has actually been returned
            if (response.data !== undefined) {
                console.warn("DATA: ", response.data);
                if (response.data !== undefined) {
                    self.setState({
                        DSPData: response.data
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




    render() {

        console.warn("RENDERING: ", this.state.DSPData)
        console.warn("DSP DATA: ", this.state.DSPData);
        let data = [];
        for (let feature in this.state.features) {
            console.warn("FEATURE: ", feature);
            console.warn(this.state.features[feature])

            if (this.state.dateRange !== undefined && this.state.DSPData !== undefined) {
                let tmp = parseFloat(feature) + 1;
                console.warn("TEMP: ", tmp);
                let plotNumY = 'y' + (tmp).toString();
                let plotNumX = 'x' + (tmp).toString();
                console.warn("PLOTNUM: ", plotNumX, plotNumY)
                data.push(
                    {
                        x: this.state.DSPData['timestamps'],
                        y: this.state.DSPData[this.state.features[feature]],
                        xaxis: plotNumX,
                        yaxis: plotNumY,
                        type: 'scatter',
                        name: this.state.features[feature]
                    }

                )

                console.warn("RMS: ", this.state.DSPData.rms)

            }
        }
        return (
            <div>
                {/*<StartDatePull colours={this.props.colours}></StartDatePull>*/}
                <Plot style={{ width: '100%', height: '100%' }}
                    key={'plot'}
                    data={data}
                    layout={{
                        grid: { rows: 4, columns: 1, pattern: 'independent' },
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
                {/*<EndDatePull colours={this.props.colours}></EndDatePull>*/}
            </div>
        )
    }
}