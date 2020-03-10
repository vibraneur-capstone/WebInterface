import React from 'react';
import FindBearing from '../../Tools/FindBearing.jsx';
import BearingGraph from './SingleBearing/BearingGraph';
import BearingStats from './SingleBearing/BearingStats';
import DSPProducts from './SingleBearing/DSPProducts';
import RULDisplay from './SingleBearing/RULDisplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default class SingleBearing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: undefined,
            search: true,
            type: 0,
            types: [BearingGraph, BearingStats, DSPProducts, RULDisplay],
            title: ''
        }

        this.changeBearing = this.changeBearing.bind(this);
        this.leftClick = this.leftClick.bind(this);
        this.rightClick = this.rightClick.bind(this);
    }

    componentDidMount() {
        if ('config' in this.props) {
            let config = this.props.config;
            if (config !== undefined && 'id' in config) {
                if ('userID' in config) {
                    this.props.setTitle(config.userID);
                } else {
                    this.props.setTitle(config.id);
                }
                this.setState({
                    search: false,
                    id: config.id,
                })
            }
        }
    }

    changeBearing(bearing_id) {
        this.props.setTitle(bearing_id);
        this.setState({
            id: bearing_id,
            search: false
        })
    }

    leftClick() {
        if (this.state.type === 0) {
            this.setState({
                type: this.state.types.length - 1
            })
        } else {
            this.setState({
                type: this.state.type - 1
            })
        }
    }

    rightClick() {
        if (this.state.type === this.state.types.length - 1) {
            this.setState({
                type: 0
            })
        } else {
            this.setState({
                type: this.state.type + 1
            })
        }
    }

    render() {

        let content;

        if (this.state.search) {
            content = <div>
                <div style={{float: 'left', padding: '15px'}}>Select Bearing:</div>
                <FindBearing organization={this.props.organization} colours={this.props.colours} setBearing={this.changeBearing}></FindBearing>
            </div>
            
        } else {

            //Styling for left and right toggle buttons
            let buttonStyle = {
                width: '10%',
                'fontSize': '15px',
                'backgroundColor': 'inherit',
                border: '0px',
                top: '45%',
                position: 'relative',
            }

            let leftArrow = <button
                style={buttonStyle}
                className='panelFlipLeft'
                onClick={this.leftClick}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>;
            let rightArrow = <button
                style={buttonStyle}
                className='panelFlipRight'
                onClick={this.rightClick}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>;
            let Component = this.state.types[this.state.type]
            content = <div>
                <Component
                    colours={this.props.colours}
                    id={this.state.id}
                ></Component>
            </div>
            /*content = <Plot style={{ width: '100%', height: '100%' }}
                data={[{
                    x: [1, 2, 3, 4],
                    y: [10, 15, 13, 17],
                    type: 'scatter'
                }]}
                layout={{ autosize: true, showlegend: false, margin: { l: 10, r: 10, b: 10, t: 10 } }}

            ></Plot>*/
            content = <div style={{
                height: '100%',
                width: '100%',
                display: 'flex'
            }}>
                <div style={{
                    width: '4%',
                    float: 'left',
                    height: '100%',
                    position: 'relative'
                }}>{leftArrow}</div>
                <div style={{
                    width: '91%',
                    float: 'left',
                    position: 'relative',
                    height: '100%',
                    'overflow': 'scroll'
                }}>{content}</div>
                <div style={{
                    width: '4%',
                    float: 'right',
                    height: '100%',
                    position: 'relative'
                }}>{rightArrow}</div>
            </div>

        }
        return (
            <div className='inside_panel'>
                {content}
            </div>
        )
    }
}