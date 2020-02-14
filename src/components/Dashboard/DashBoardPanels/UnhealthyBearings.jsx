import React from 'react';
import BearingDatabase from './BearingDatabase';


export default class UnhealthyBearings extends React.Component {
    constructor (props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        if ('config' in this.props) {
            let config = this.props.config;
            if (config !== undefined && 'id' in config) {
                this.props.setTitle(config.id);
            } else {
                // We have to search for the bearing from user input
                this.setState({
                    search: true,
                })
            }
        } else {
            this.props.setTitle('Unhealthy Bearings')
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