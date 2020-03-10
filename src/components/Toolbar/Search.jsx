import React from 'react';
import SearchFilter from '../Tools/SearchFilter.jsx';
import Button from '../Tools/Button.jsx';
export default class Search extends React.Component {

    constructor (props) {
        super(props);

        this.results = this.results.bind(this);
    }

    results (results) {
        return <div>
            {results.map(el => (
                <Button
                    key={el.id}
                    onClick={() => this.props.addPanel('Single Bearing', el.id)}
                    colours={this.props.colours}
                    organization={this.props.organization}
                    classes='searchButton'
                    contents={<span>{el.tags.name}</span>}
                >
                </Button>
            ))}
        </div> 
    }

    render () {

        let style = {
            'backgroundColor': this.props.colours.primary
        }

        return (
            <div style={style} className='searchInBar'>
                <SearchFilter
                    renderResults={this.results}
                    setBearing={this.props.changeBearing}
                    dataSource={'https://sensor.vibraneur.com/inventory/v1/' + this.props.organization + '/bearings?status=ALL'}
                ></SearchFilter>
            </div>
                
        )
    }
}