import React from 'react';
import Plot from 'react-plotly.js';

export default class SingleBearing extends React.Component {
    constructor (props) {
        super(props);

        this.state = {

        }
    }

    render () {
        return (
            <div style={{width: '100%', height: 'calc(100% - 30px)' }}>
                <Plot style={{width: '100%', height: '100%'}}
                    data={[{
                        x: [1, 2, 3, 4],
                        y: [10, 15, 13, 17],
                        type: 'scatter'
                      }]}
                    layout={{ autosize: true,  showlegend: false, margin: {l: 10, r: 10, b: 10, t: 10}}}
                    
                ></Plot>
            </div>
        )
    }
}