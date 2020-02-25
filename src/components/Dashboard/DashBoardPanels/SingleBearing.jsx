import React from 'react';
import FindBearing from '../../Tools/FindBearing.jsx';
import BearingGraph from './SingleBearing/BearingGraph';
import BearingStats from './SingleBearing/BearingStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default class SingleBearing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: undefined,
            search: true,
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

            //Styling for left and right toggle buttons
            let buttonStyle = {
                width: '10%',
                'font-size': '25px',
                'background-color': 'inherit', 
                border: '0px'
            }

            let leftArrow = <button
                style={buttonStyle}
                className='panelFlipLeft'
                onClick={this.leftClick}
            >
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>;
            let rightArrow = <button
                style={buttonStyle}
                className='panelFlipRight'
                onClick={this.rightClick}
            >
                <FontAwesomeIcon icon={faChevronRight}/>
            </button>;
            content = <div>
                <BearingGraph
                
                ></BearingGraph>
            </div>
            /*content = <Plot style={{ width: '100%', height: '100%' }}
                data={[{
                    x: [1, 2, 3, 4],
                    y: [10, 15, 13, 17],
                    type: 'scatter'
                }]}
                layout={{ autosize: true, showlegend: false, margin: { l: 10, r: 10, b: 10, t: 10 } }}

            ></Plot>*/
            content = <table style={{width: '100%'}}>
                <tr style={{width: '100%'}}>
                    <td style={{width: '5%'}}>{leftArrow}</td>
                    <td style={{width: '90%'}}>{content}</td>
                    <td style={{width: '5%'}}>{rightArrow}</td>
                </tr>
            </table>
        }
        return (
            <div className='inside_panel'>
                {content}
            </div>
        )
    }
}