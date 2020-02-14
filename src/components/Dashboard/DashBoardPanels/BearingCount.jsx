import React from 'react'

export default class BearingCount extends React.Component {
    constructor(props) {
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
            this.props.setTitle('Bearing Count')
        }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}