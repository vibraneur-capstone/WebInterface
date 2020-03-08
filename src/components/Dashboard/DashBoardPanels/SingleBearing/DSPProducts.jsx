import React from 'react';
import Plot from 'react-plotly.js';
import EndDatePull from './EndDatePull.jsx';
import StartDatePull from './StartDatePull.jsx';
import axios from 'axios';

export default class DSPProducts extends React.Component {
    constructor (props) {
        super (props);
        
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(startDate, endDate) {
        let url = 'https://streaming.vibraneur.com/vape-data-streaming/v1/dsp/data?sensorId=123&from=1583631051&to=1583800251'
        axios.get(url).then(function (response) {
            // Check to make sure the data has actually been returned
            if (response.data !== undefined) {
                console.warn("DATA: ", response.data);
                if (response.data === undefined) {
                    console.warn("Empty Response");
                    return;
                } 
            }
        }).catch(function (error) {
            // handle error
            console.warn("Error: ", error);
        })
    }



    render () {
        return (
            <table style={{ width: '100%', height: '100%' }}>
                <tbody>
                <tr style={{ width: '100%', height: '100%' }}>
                    <td style={{ width: '5%', height: '100%' }}>
                        <StartDatePull colours={this.props.colours}></StartDatePull>
                    </td>
                    <td style={{ width: '90%', height: '100%' }}>
                        <Plot style={{ width: '100%', height: '100%' }}
                            data={[{
                                x: [1, 2, 3, 4],
                                y: [10, 15, 13, 17],
                                type: 'scatter'
                            }]}
                            layout={{ autosize: true, showlegend: false, margin: { l: 10, r: 10, b: 10, t: 10 } }}
                        ></Plot>
                    </td>
                    <td style={{ width: '5%', height: '100%' }}>
                        <EndDatePull colours={this.props.colours}></EndDatePull>
                    </td>
                </tr> 
                </tbody>
            </table>
                
        )
    }
}