import React from 'react';
import TitleBar from './TitleBar.jsx';
import Draggable from 'react-draggable';
import SingleBearing from './DashBoardPanels/SingleBearing.jsx';
import { Resizable } from 're-resizable';

export default class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                height: '300px',
                width: '300px'
            }
        }

        this.removePanel = this.removePanel.bind(this);
    }

    removePanel() {
        console.warn("Removing Panel");
        this.props.removePanel(this.props.id);
    }

    render() {

        let draggableStyle = {
            border: '4px solid f8f9fa'
        }

        draggableStyle = {
            ...draggableStyle, ...this.state.style
        }

        let titleStyle = {
            border: '1px solid f8f9fa',
            width: '100%',
        }

        if (this.props.focus === this.props.id) {
            let newStyle = {
                backgroundColor: '#f8f9fa'
            }
            draggableStyle = { ...draggableStyle, ...newStyle }
        }

        let containerStyle = {
            width: '100%',
            height: '100%',
        }

        return (

            <Draggable onDrag={(e) => this.props.changeFocus(e, this.props.id)}>
                <Resizable
                    size={{ width: this.state.style.width, height: this.state.style.height }}
                    onResizeStart={(e) => {e.stopPropagation()}}
                    onResizeStop={(e, direction, ref, d) => {
                        e.stopPropagation();
                        this.setState({
                            style: {
                                width: this.state.style.width + d.width,
                                height: this.state.style.height + d.height,
                            }
                        });
                    }}
                    style={draggableStyle}
                >
                <div style={containerStyle} onClick={(e) => this.props.changeFocus(e, this.props.id)}>
                    <TitleBar style={titleStyle}
                        removePanel={this.removePanel}
                    ></TitleBar>
                    <SingleBearing>
                    </SingleBearing>
                </div>
                </Resizable>

            </Draggable >
            
        )
    }
}