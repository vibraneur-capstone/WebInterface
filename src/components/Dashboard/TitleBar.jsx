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
            radius: '50%',
            position: 'absolute',
            right: '0px',
            width: '10px',
            height: '30px',
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

