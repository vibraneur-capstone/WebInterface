import React from 'react';
import { Button } from 'react-bootstrap';

export default class AddPanel extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            types: [
                'Single Bearing',
                'Bearing Dataset',
                'Unhealthy Bearings',
                'Bearing Coverage',
                'Bearing Count',
                'Add Bearing',
                'Add Sensor',
            ],
            display: false
        }
        
        this.display = this.display.bind(this);
    }

    display () {
        this.setState({
            display: !this.state.display
        })
    }

    render () {
        let buttons = [];
        if (this.state.display) {
            for (let type in this.state.types) {
                buttons.push(
                    <button
                        key={type}
                        className='button panel_type_button'
                        onClick={() => {this.props.addPanel(this.state.types[type]); this.display()}}
                    >{this.state.types[type]}</button>
                )
            }    
        }
 
        return (
            <div className='AddPanel'>
                <div className='panel_button_container'>
                    {buttons}
                </div>
                <button 
                    className='button'
                    style={this.props.style}
                    onClick={this.display}
                >+</button>
            </div>
        )
    }
}