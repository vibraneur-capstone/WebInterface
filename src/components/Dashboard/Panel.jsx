import React from 'react';
import TitleBar from './TitleBar.jsx';
import Draggable from 'react-draggable';

import SingleBearing from './DashBoardPanels/SingleBearing.jsx';
import BearingDatabase from './DashBoardPanels/BearingDatabase.jsx';
import UnhealthyBearings from './DashBoardPanels/UnhealthyBearings.jsx';
import BearingCoverage from './DashBoardPanels/BearingCoverage.jsx';

import { Resizable } from 're-resizable';

export default class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            panelTypes: {
                'Single Bearing': SingleBearing,
                'Bearing Dataset': BearingDatabase,
                'Unhealthy Bearings': UnhealthyBearings,
                'Bearing Coverage': BearingCoverage,
            },
            style: {
                height: '300px',
                width: '300px'
            },
            maximized: false,
            draggable: true,
        }

        this.removePanel = this.removePanel.bind(this);
        this.toggleDraggable = this.toggleDraggable.bind(this);
        this.toggleMaximize = this.toggleMaximize.bind(this);
        this.choosePanel = this.choosePanel.bind(this);
    }

    removePanel() {
        console.warn("Removing Panel");
        this.props.removePanel(this.props.id);
    }

    choosePanel(type) {
        
    }

    toggleDraggable () {
        this.setState({
            draggable: !this.state.draggable
        })
    }

    toggleMaximize () {
        this.setState({
            maximized: !this.state.maximized
        })
        this.toggleDraggable()
    }

    saveState(state) {
        console.warn("ON STOP: ", state.lastX, state.lastY);
        this.setState({
            offset: {
                x: state.lastX,
                y: state.lastY,
            }
        })
    }

    render() {

        let draggableStyle = {
            backgroundColor: '#f8f9fa'
        }

        draggableStyle = {
            ...draggableStyle, ...this.state.style
        }

        let titleStyle = {
            border: '1px solid #f8f9fa',
            width: '100%',
        }

        if (this.props.focus === this.props.id) {
            let newStyle = {
            }
            draggableStyle = { ...draggableStyle, ...newStyle }
        }

        let containerStyle = {
            width: '100%',
            height: '100%',
        }
        console.warn("PROPS: ", this.props);
        const TagName = this.state.panelTypes[this.props.config.type];
        console.warn("TAGNAME: ", TagName)

        let size;
        let position;
        let resizePermissions = undefined;
        if (this.state.maximized) {
            size = {
                height: '100%',
                width: '100%',
            }
            position = {
                x: 0,
                y: 0,
            }
            resizePermissions = { top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }
        } else {
            size = { width: this.state.style.width, height: this.state.style.height }
            position = this.state.lastState
        }
        return (

            <Draggable 
                onDrag={(e) => this.props.changeFocus(e, this.props.id)}
                onStop={(e, draggable) => this.saveState(draggable)}
                disabled={!this.state.draggable}
                position={position}
            >
                <Resizable
                    enable={resizePermissions}
                    size={size}
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
                <div style={containerStyle} className='panelContainer' onClick={(e) => this.props.changeFocus(e, this.props.id)}>
                    <TitleBar style={titleStyle}
                        removePanel={this.removePanel}
                        toggleDraggable={this.toggleDraggable}
                        toggleMaximize={this.toggleMaximize}
                    ></TitleBar>
                    <TagName>
                    </TagName>
                </div>
                </Resizable>

            </Draggable >
            
        )
    }
}