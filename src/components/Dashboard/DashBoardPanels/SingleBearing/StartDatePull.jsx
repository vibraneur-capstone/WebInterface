import React from 'react';
import Button from '../../../Tools/Button.jsx';
export default class StartDatePull extends React.Component {
    constructor (props) {
        super(props);
    }



    render () {
        let barStyle = {
            width: '100%',
            height: '100%',
        }

        return (
            <Button
                style={barStyle}
                colours={this.props.colours}
            ></Button>
        )
    }
}