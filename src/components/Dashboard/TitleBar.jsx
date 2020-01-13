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
            width: '25px',
            height: '25px',
        }

        return (
            <div style={containerStyle}>
                <Button style={buttonStyle}
                    onClick={this.props.removePanel}
                >x</Button>
                <Button style={buttonStyle}
                    onClick={this.props.toggleDraggable}
                >o</Button>
            </div>
        )
    }
}

