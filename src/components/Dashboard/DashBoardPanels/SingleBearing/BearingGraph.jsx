import React from 'react';
import Plot from 'react-plotly.js';
import EndDatePull from './EndDatePull.jsx';
import StartDatePull from './StartDatePull.jsx';
import SockJS from 'sockjs-client-web';
import SockJsClient from 'react-stomp';

export default class BearingGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.fetchData = this.fetchData.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    fetchData(date1, date2) {
    }

    updateData (response) {
        //let new_data = this.state.data;
        
        this.setState({
            data: this.state.data.concat(response.data)
        })
    }


    render() {
        return (
            <table style={{ width: '100%', height: '100%' }}>
                <tbody>
                    <tr style={{ width: '100%', height: '100%' }}>
                        <td style={{ width: '5%', height: '100%' }}>
                            <StartDatePull colours={this.props.colours}></StartDatePull>
                        </td>
                        <td style={{ width: '90%', height: '100%' }}>
                            <SockJsClient url='https://streaming.vibraneur.com/vape-data-streaming/v1/websocket' topics={['/message/sensor']}
                                onMessage={this.updateData}
                                ref={(client) => { this.clientRef = client }} />
                            <Plot style={{ width: '100%', height: '100%' }}
                                data={[{
                                    y: this.state.data,
                                   
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