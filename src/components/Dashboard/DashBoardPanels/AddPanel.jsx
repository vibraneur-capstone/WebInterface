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
                'Bearing Coverage'
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
                console.warn("TYPE: ", type)
                buttons.push(
                    <Button
                        key={type}
                        className='panel_type_button'
                        
                        onClick={() => {this.props.addPanel(this.state.types[type]); this.display()}}
                    >{this.state.types[type]}</Button>
                )
            }    
        }
 
        return (
            <div className='AddPanel'>
                <div className='panel_button_container'>
                    {buttons}
                </div>
                <Button 
                    style={this.props.style}
                    onClick={this.display}
                >+</Button>
            </div>
        )
    }
}