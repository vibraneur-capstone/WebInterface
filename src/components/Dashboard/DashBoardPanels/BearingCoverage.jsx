import React from 'react';
import Plot from 'react-plotly.js';

export default class BearingCoverage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
        }
    }

    render() {
        return (
            <div style={{width: '100%', height: 'calc(100% - 30px)' }}>
                <Plot style={{width: '100%', height: '100%'}}
                    data={[{
                        values: [19, 26, 55],
                        labels: ['Residential', 'Non-Residential', 'Utility'],
                        type: 'pie'
                    }]}
                    layout={{autosize: true,  showlegend: false, margin: {l: 10, r: 10, b: 10, t: 10}}}
                    
                ></Plot>
            </div>
        )
    }
}