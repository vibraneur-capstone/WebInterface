import React from 'react';
import Plot from 'react-plotly.js';
import EndDatePull from './EndDatePull.jsx';
import StartDatePull from './StartDatePull.jsx';

export default class RULDisplay extends React.Component {
    constructor (props) {
        super (props);
        
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(type, date1, date2) {

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