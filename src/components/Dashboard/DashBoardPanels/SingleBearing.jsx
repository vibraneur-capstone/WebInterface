import React from 'react';
import Plot from 'react-plotly.js';
import FindBearing from '../../Tools/FindBearing.jsx';
export default class SingleBearing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: undefined,
            search: true,
        }

        this.changeBearing = this.changeBearing.bind(this);
    }

    componentDidMount() {
        if ('config' in this.props) {
            let config = this.props.config;
            if (config !== undefined && 'id' in config) {
                this.props.setTitle(config.id);
                this.setState({
                    search: false
                })
            }
        }
    }

    changeBearing (bearing_id) {
        this.props.setTitle(bearing_id);
        this.setState({
            id: bearing_id,
            search: false
        })
    }

    render() {

        let content;

        if (this.state.search) {
            content = <FindBearing changeBearing={this.changeBearing}></FindBearing>
        } else {
            content = <Plot style={{ width: '100%', height: '100%' }}
                data={[{
                    x: [1, 2, 3, 4],
                    y: [10, 15, 13, 17],
                    type: 'scatter'
                }]}
                layout={{ autosize: true, showlegend: false, margin: { l: 10, r: 10, b: 10, t: 10 } }}

            ></Plot>
        }
        return (
            <div style={{ width: '100%', height: 'calc(100% - 30px)' }}>
                {content}
            </div>
        )
    }
}