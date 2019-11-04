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
            width: this.props.width,
            height: '30px',
            bottom: '1px solid black',
        }

        let buttonStyle = {
            border: '1px solid gray',
            radius: '50%',
            position: 'relative',
            right: '0px',
            backgroundColor: 'white',
            width: '10px',
            height: '10px',
        }

        return (
            <div style={containerStyle}>
                <Button style={buttonStyle}
                    onClick={this.removePanel}
                >x</Button>
                <Button style={buttonStyle}
                    onClick={this.somethingElse}
                >o</Button>
            </div>
        )
    }
}

