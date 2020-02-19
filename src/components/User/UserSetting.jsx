import React from 'react';
import { SwatchesPicker } from 'react-color';

export default class UserSettings extends React.Component {

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(color, event) {
        console.warn("COLOUR: ", color, event);
        
        let colours = this.props.colours;
        colours.primary = color.hex
        this.props.modifyUserSetting('colours', colours);
        // color = {
        //   hex: '#333',
        //   rgb: {
        //     r: 51,
        //     g: 51,
        //     b: 51,
        //     a: 1,
        //   },
        //   hsl: {
        //     h: 0,
        //     s: 0,
        //     l: .20,
        //     a: 1,
        //   },
        // }
    }

  

  render() {
    return (<div style={this.props.style}>
        <h2>Pick Colours:</h2>
        <SwatchesPicker onChange={this.handleChange} style={{margin: '15px'}} onChange={ this.handleChange } />;
    </div>)
  }
}