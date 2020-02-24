import React from 'react';
import FindBearing from '../../Tools/FindBearing.jsx';
import BearingGraph from './SingleBearing/BearingGraph';
import BearingStats from './SingleBearing/BearingStats';

export default class SingleBearing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: undefined,
            search: false, //true,
            type: 1,
            types: [BearingGraph, BearingStats]
        }

        this.changeBearing = this.changeBearing.bind(this);
        this.leftClick = this.leftClick.bind(this);
        this.rightClick = this.rightClick.bind(this);
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

    leftClick () {

    }

    rightClick () {

    }

    render() {

        let content;

        if (this.state.search) {
            content = <FindBearing changeBearing={this.changeBearing}></FindBearing>
        } else {

            let leftArrow = <button
                className='panelFlipLeft'
                onClick={this.leftClick}
            ></button>;
            let rightArrow = <button
                className='panelFlipRight'
                onClick={this.rightClick}
            >
            </button>;
            content = <BearingGraph></BearingGraph>
            /*content = <Plot style={{ width: '100%', height: '100%' }}
                data={[{
                    x: [1, 2, 3, 4],
                    y: [10, 15, 13, 17],
                    type: 'scatter'
                }]}
                layout={{ autosize: true, showlegend: false, margin: { l: 10, r: 10, b: 10, t: 10 } }}

            ></Plot>*/
            content = [leftArrow, content, rightArrow];
        }
        return (
            <div className='inside_panel'>
                {content}
            </div>
        )
    }
}