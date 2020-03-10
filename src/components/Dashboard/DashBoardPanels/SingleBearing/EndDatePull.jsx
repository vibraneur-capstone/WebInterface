import React from 'react';
import Button from '../../../Tools/Button.jsx';

export default class EndDatePull extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        let barStyle = {
            width: '20px',
            height: '200px',
        }
        return (
            <Button
                style={barStyle}
                colours={this.props.colours}
            ></Button>
        )
    }
}