import React from 'react';
import TitleBar from './TitleBar.jsx';
import Draggable from 'react-draggable';


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

        return (
            <Draggable>
                <div style={containerStyle}>
                    <TitleBar
                        width={this.state.width}
                        removePanel={this.removePanel}
                    ></TitleBar>
                </div>
            </Draggable>
        )
    }
}