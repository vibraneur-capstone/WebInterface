import React from 'react';
import { SwatchesPicker } from 'react-color';
import TextBox from '../Tools/TextBox.jsx';
//import Swatches from '../Tools/ColorPicker/Swatches.js';
export default class UserSettings extends React.Component {

    constructor (props) {
        super(props);

        this.primaryColourChange = this.primaryColourChange.bind(this);
        this.secondaryColourChange = this.secondaryColourChange.bind(this);
        this.backgroundColourChange = this.backgroundColourChange.bind(this);
    }

    primaryColourChange(color, event) {
        let colours = this.props.colours;
        colours.primary = color.hex
        this.props.modifyUserSetting('colours', colours);
    }

    secondaryColourChange(color, event) {
      let colours = this.props.colours;
      colours.secondary = color.hex
      this.props.modifyUserSetting('colours', colours);
    }

    backgroundColourChange(color, event) {
      let colours = this.props.colours;
      colours.background = color.hex
      this.props.modifyUserSetting('colours', colours);
    }


    render() {
      let textStyle = {
        color: this.props.colours.primary
      }
    
    
      return (<div style={this.props.style}>
        <h3 style={textStyle}>Primary Colour:</h3>
        <SwatchesPicker style={{margin: '15px'}} onChange={ this.primaryColourChange } />;
        
        <h3 style={textStyle}>Secondary Colour:</h3>
        <SwatchesPicker style={{margin: '15px'}} onChange={ this.secondaryColourChange } />;
    
        <h3 style={textStyle}>Background Colour:</h3>
        <SwatchesPicker style={{margin: '15px'}} onChange={ this.backgroundColourChange } />;
    
        <h3 style={textStyle}>Organization:</h3>
        <TextBox

        ></TextBox>
      </div>)
  }
}