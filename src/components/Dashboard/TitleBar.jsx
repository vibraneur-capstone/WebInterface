import React from 'react';
import { Button } from 'react-bootstrap';

export default class TitleBar extends React.Component {
    constructor (props) {
        super (props)

        this.state = {

        }
    }

    render () {

        let containerStyle = {
            width: '100%',
            height: '30px',
        }

        let buttonStyle = {
            border: '1px solid gray',
            'border-radius': '50%',
            position: 'relative',
            float: 'right',
            top: '5px',
            right: '5px',
            width: '17px',
            height: '17px',
            padding: '0px',
        }

        return (
            <div style={containerStyle}>
                <h5 style={{float: 'left', 'padding-left': '10px'}}>{this.props.title}</h5>
                <Button style={buttonStyle}
                    onClick={this.props.removePanel}
                ></Button>
                <Button style={buttonStyle}
                    onClick={this.props.toggleDraggable}
                ></Button>
                <Button style={buttonStyle}
                    onClick={this.props.toggleMaximize}
                ></Button>
            </div>
        )
    }
}

