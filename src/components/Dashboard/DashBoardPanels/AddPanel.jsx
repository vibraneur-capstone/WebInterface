import React from 'react';

export default class AddPanel extends React.Component {

    constructor(props) {
        super(props);

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
            display: false,
            buttonState: 'normal',
        }

        this.display = this.display.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    display() {
        this.onClick();
        this.setState({
            display: !this.state.display
        })
    }

    mouseEnter() {
        console.warn("MOUSE ENTER")
        this.setState({
            buttonState: 'hover'
        })
    }

    mouseLeave() {
        console.warn("MOUSE LEAVE")
        this.setState({
            buttonState: 'normal'
        })
    }

    onClick() {
        this.setState({
            buttonState: 'active'
        })
    }

    render() {

        // Colour Styling
        let mainColourStyle;

        switch (this.state.buttonState) {
            case 'active':
                console.warn("ACTIVE SWITCH")
                mainColourStyle = {
                    'background-color': this.props.colours.primary,
                    'color': this.props.colours.secondary,
                    'border': '1px solid ' + this.props.colours.primary,
                }
                break;

            case 'hover':
                console.warn("HOVER SWITCH")
                mainColourStyle = {
                    'background-color': this.props.colours.secondary,
                    'color': this.props.colours.primary,
                    'border': '1px solid ' + this.props.colours.primary,
                }
                break;

            case 'normal':
                mainColourStyle = {
                    'background-color': this.props.colours.primary,
                    'color': this.props.colours.secondary,
                    'border': '1px solid ' + this.props.colours.primary,
                }
                break;
        }

        // Creates buttons to select panel type
        let buttons = [];
        if (this.state.display) {
            for (let type in this.state.types) {
                buttons.push(
                    <button
                        //style={colourStyle}
                        key={type}
                        className='button panel_type_button'
                        onClick={() => { this.props.addPanel(this.state.types[type]); this.display() }}
                    >{this.state.types[type]}</button>
                )
            }
        }

        let style = { ...this.props.style, ...mainColourStyle}

        return (
            <div className='AddPanel'>
                <div className='panel_button_container'>
                    {buttons}
                </div>
                <button
                    //className='button'
                    style={style}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    onClick={this.display}
                >+</button>
            </div>
        )
    }
}