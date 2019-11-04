import React from 'react';
import TitleBar from './TitleBar.jsx';
import Draggable from 'react-draggable';
import SingleBearing from './DashBoardPanels/SingleBearing.jsx';


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
    }

    render () {

        let containerStyle = {
            border: '1px solid black'
        }

        containerStyle = {...containerStyle, ...this.state.style
        }

        let titleStyle = {
            border: '1px solid black',
            width: '100%',
        }

        if (this.props.focus === this.props.id) {
            let newStyle = {
                backgroundColor: 'red'
            }
            containerStyle = {...containerStyle, ...newStyle}
        }

        return (
            <Draggable onDrag={() => this.props.changeFocus(this.props.id)}>
                <div style={containerStyle} onClick={() => this.props.changeFocus(this.props.id)}>
                    <TitleBar style={titleStyle}
                        removePanel={this.removePanel}
                    ></TitleBar>
                    <SingleBearing>
                    </SingleBearing>
                </div>
            </Draggable>
        )
    }
}