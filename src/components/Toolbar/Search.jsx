import React from 'react';
import SearchFilter from '../Tools/SearchFilter.jsx';
import { Button } from 'react-bootstrap';
export default class Search extends React.Component {

    results (results) {
        return <div>
            {results.map(el => (
                <Button
                    onClick={() => this.props.setBearing(el.id)}
                    className='searchButton'
                >
                    <span>{el.tags.name}</span>
                    
                </Button>
            ))}
        </div> 
    }

    render () {
        return (
            <div className='searchInBar'>
                <SearchFilter
                    renderResults={this.results}
                    setBearing={this.props.changeBearing}
                    dataSource='https://sensor.vibraneur.com/inventory/v1/husky/bearings?status=ALL'
                ></SearchFilter>
            </div>
                
        )
    }
}