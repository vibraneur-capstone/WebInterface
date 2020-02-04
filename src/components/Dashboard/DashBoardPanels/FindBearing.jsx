import React from 'react';
import SearchFilter from './SearchFilter';


export default class FindBearing extends React.Component {
    render () {
        return (
            <div>
                <SearchFilter
                    setBearing={this.props.changeBearing}
                    dataSource='https://sensor.vibraneur.com/inventory/v1/husky/sensors?status=ONLINE'
                ></SearchFilter>
            </div>
        )
    }
}