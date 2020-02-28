import React from 'react';
import SearchFilter from './SearchFilter';
import Button from '../Tools/Button.jsx';

export default class FindBearing extends React.Component {

    constructor(props) {
        super (props);

        this.results = this.results.bind(this);
    }

    results (results) {
        return <div>
            {results.map(el => (
                <Button
                    onClick={() => this.props.setBearing(el.id)}
                    classes='searchCol'
                    colours={this.props.colours}
                    contents={<span>{el.tags.name}</span>}
                >
                </Button>
            ))}
        </div> 
    }

    render () {
        return (
            <div>
                <SearchFilter
                    renderResults={this.results}
                    setBearing={this.props.changeBearing}
                    dataSource={'https://sensor.vibraneur.com/inventory/v1/' + this.props.organization + '/bearings?status=ALL'}
                ></SearchFilter>
            </div>
        )
    }
}