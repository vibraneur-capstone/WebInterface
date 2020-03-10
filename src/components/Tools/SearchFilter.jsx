import React from 'react';
import axios from 'axios';
import FilterResults from 'react-filter-search';

export default class SearchFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: ''
        };

        this.updateSensors = this.updateSensors.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }

    componentWillMount() {
        if ('data' in this.props) {
            this.updateSensors('data', this.props.data);
        } else if ('dataSource' in this.props) {
            this.sendRequest(this.props.dataSource, this.updateSensors);
        }
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    updateSensors(id, value) {
        if (id === 'sensors') {
            /*let data = [];
            value.forEach(function (value) {
                data.push(value.id);
            })*/
            this.setState({
                data: value
            })
        } else if (id === 'data') {
            this.setState({
                data: value
            })
        } else {
            throw new Error("Invalid ID")
        }
    }

    /*
        sends a Request for the expected data
    */
    sendRequest(url, callback) {
        axios.get(url).then(function (response) {
            // Check to make sure the data has actually been returned
            if (response.data !== undefined) {
                let sensors = response.data.bearingList;
                if (sensors === undefined) {
                    return;
                } else {
                    callback('sensors', sensors);
                }
            }
        }).catch(function (error) {
            // handle error
            console.warn("Error: ", error);
        })
    }

    render() {
        let input = <input key='searchQuery' style={{margin: '10px', float: 'left'}} type="text" value={this.state.value} placeholder={'search'} onChange={this.handleChange} />
                
        let results = <div style={{width: '100%', height: '100%', 'overflowY': 'scroll', 'overflowX': 'hidden', 'backgroundColor': '#246e89', padding: '8px'}}>
            <FilterResults
                colours={this.props.colours}
                value={this.state.value}
                data={this.state.data}
                renderResults={this.props.renderResults}
            />
        </div>

        let content;
        if (this.state.value === '') {
            content = [input]
        } else {
            content = [input, results];
        }

        return (
            <div style={{ float: 'left', width: '100%', 'maxHeight': '200px'}}>
                {content}        
            </div>
        );
    }
}