import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import SockJsClient from 'react-stomp';
import TimeScale from './TimeScale.jsx';
import jQuery from 'jquery';
import { AreaChart, linearGradient, Area, Label, defs, stop, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default class DSPProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateRange: undefined,
            DSPdata: {
                'raw': {
                    'data': []
                },
                'rms': {
                    'data': []
                },
                'kurtosis': {
                    'data': []
                },
                'crest': {
                    'data': []
                },
                'shape': {
                    'data': []
                }
            },
            features: ['raw', 'crest', 'shape', 'rms', 'kurtosis'],
        }
        this.fetchData = this.fetchData.bind(this);
        this.getDates = this.getDates.bind(this);
        this.updateData = this.updateData.bind(this);
        this.handleRealTime = this.handleRealTime.bind(this);
        this.updateLayout = this.updateLayout.bind(this);
        this.getCurrentTime = this.getCurrentTime.bind(this);
        this.getTimeRange = this.getTimeRange.bind(this);
    }

    componentDidMount() {
        let dates = this.getDates();
        this.fetchData(dates.startDate, dates.endDate);
        //this.updateTimeScale();
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    /*
        Fetches Timestamps of available data
    */
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

    /*
        Fetches HISTORICAL bearing data to display in a plot
    */
    fetchData(startDate, endDate) {
        let self = this;
        let url = 'https://streaming.vibraneur.com/vape-data-streaming/v1/data/dsp?sensorId=123&from=' + startDate + '&to=' + endDate;
        axios.get(url).then(function (response) {
            // Check to make sure the data has actually been returned
            if (response.data !== undefined) {
                /*if (response.data !== undefined) {
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
                }*/
            }
        }.bind(this)).catch(function (error) {
            // handle error
            console.warn("Error: ", error);
        })
    }

    /*
        SOLE FUNCTION WHICH CAN UPDATE PLOTLY DATA
    
        both for historical and real-time
    */
    updateData(dataType, data, timestamp) {
        let DSPdata = jQuery.extend({}, this.state.DSPdata);
        let newDateRange = this.getTimeRange(1, timestamp);
        for (let key in DSPdata) {

            if (key === dataType) {
                let value = DSPdata[key].data;
                if (value.length !== 0) {
                    // Remove first value
                    
                    while (value[0].date < newDateRange[0]) {
                        value.splice(0, 1)
                    }
                    value.splice(value.length - 1, 1)
                    // Remove last value
                }
                value = [{
                    date: newDateRange[0],
                    [key]: undefined
                }].concat(value);
                value.push({
                    date: Date.parse(timestamp),
                    [key]: data
                })
                value.push({
                    date: newDateRange[1],
                    [key]: undefined
                })
                DSPdata[key].data = value;
                //value[dataType] = [].concat(value[dataType]).concat(data);
                //value.name = [].concat(value.name).concat([this.formatDateObject(timestamp)]);
            }
        }
        this.setState({
            DSPdata: DSPdata,
            dateRange: newDateRange,
        }, () => {  })
    }

    updateLayout() {
        console.warn("updateLayout")
    }

    handleRealTime(response) {
        for (let tag in response) {
            if (this.state.features.includes(tag)) {
                this.updateData(tag, response[tag], response.timestamp);
            }
        }
    }


    getCurrentTime() {
        let date = new Date();
        return date;
    }

    // Returns the time range in epoch time [start, end]
    getTimeRange(range, endTime) {
        endTime = new Date(endTime);
        endTime.setMinutes(endTime.getMinutes() + 0.2);
        let startTime = new Date(endTime);

        startTime.setMinutes(endTime.getMinutes() - range);

        let start = Date.parse(startTime);
        let end = Date.parse(endTime);

        return [start, end];
    }

    formatDateObject(date) {
        date = new Date(date);
        let formatted = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
        return formatted;
    }

    render() {

        let data = [];

        let plots = [];


        for (let key in this.state.DSPdata) {
            let value = this.state.DSPdata[key].data;
            plots.push(
                <AreaChart
                    key={key}
                    //revision={this.state.revision}
                    //data={this.state.DSPdata}
                    //onUpdate={this.updateLayout}
                    //layout={jQuery.extend({}, this.state.layout)}
                    syncId='plot'
                    width={400}
                    height={100}
                    data={jQuery.extend([], value)}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                    <def>
                        <linearGradient
                            x1="0" y1="0" x2="0" y2="1"
                            type="monotone"
                            dataKey={key}
                            stroke="#8884d8"
                            dot={false}
                            isAnimationActive={false}
                        >
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        </linearGradient>
                    </def>
                    <Area type="monotone" dataKey={key} stroke="#8884d8" dot={false}
                        isAnimationActive={false} fillOpacity={1} fill="url(#colorUv)" />
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip formatter={(value, name, props) => {
                        
                        return [value, name, props]
                        }}/>
                    <XAxis dataKey="date" type='number' domain={0} tickFormatter={this.formatDateObject} allowDataOverflow={true} />
                    <YAxis dataKey={key} label={{ value: key, angle: -90, position: 'insideLeft' }}>
                    </YAxis>
                </AreaChart>
            )
        }
        return (
            <div>
                {/*<StartDatePull colours={this.props.colours}></StartDatePull>*/}
                <SockJsClient url='https://streaming.vibraneur.com/vape-data-streaming/v1/websocket' topics={['/message/dsp/' + this.props.id]}
                    onMessage={this.handleRealTime}
                    ref={(client) => { this.clientRef = client }} />
                <SockJsClient url='https://streaming.vibraneur.com/vape-data-streaming/v1/websocket' topics={['/message/sensor/' + this.props.id]}
                    onMessage={this.handleRealTime}
                    ref={(client) => { this.clientRef = client }} />

                {/*<Plot style={{ width: '100%', height: '100%' }}*/}
                {plots}
                {/*}></Plot>*/}
                <TimeScale
                    colours={this.props.colours}
                    updateTimeScale={this.updateTimeScale}
                ></TimeScale>
                {/*<EndDatePull colours={this.props.colours}></EndDatePull>*/}
            </div>
        )
    }
}