import React from 'react';
import Button from '../../../Tools/Button.jsx';

export default class TimeScale extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div>
                <Button
                    contents='30min'
                    colours={this.props.colours}
                    onClick={() => this.props.updateTimeScale(.5)}
                ></Button>
                <Button
                    contents='1 hour'
                    colours={this.props.colours}
                    onClick={() => this.props.updateTimeScale(1)}
                ></Button>
                <Button
                    contents='2 hours'
                    colours={this.props.colours}
                    onClick={() => this.props.updateTimeScale(2)}
                ></Button>
                <Button
                    contents='4 hours'
                    colours={this.props.colours}
                    onClick={() => this.props.updateTimeScale(4)}
                ></Button>
                <Button
                    contents='8 hours'
                    colours={this.props.colours}
                    onClick={() => this.props.updateTimeScale(8)}
                ></Button>
            </div>
        )
    }
}