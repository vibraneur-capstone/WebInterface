import React from 'react';
import BearingDatabase from './BearingDatabase';


export default class UnhealthyBearings extends React.Component {
    constructor (props) {
        super(props);

        this.state = {

        }
    }

    render () {
        return (
            <BearingDatabase
                style={this.props.style}
                config={this.props.config}
                setTitle={this.props.setTitle}
                addPanel={this.props.addPanel}
                status='ALARM'
            ></BearingDatabase>
        )
    }
}