import React from 'react';

export default class InvertedButton extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            buttonState: 'normal'
        }
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
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

    render () {

        let colourStyle;
        
        switch (this.state.buttonState) {
            case 'active':
                console.warn("ACTIVE SWITCH")
                colourStyle = {
                    'background-color': this.props.colours.secondary,
                    'color': this.props.colours.primary,
                    'border': '1px solid ' + this.props.colours.secondary,
                }
                break;

            case 'hover':
                console.warn("HOVER SWITCH")
                colourStyle = {
                    'background-color': this.props.colours.primary,
                    'color': this.props.colours.secondary,
                    'border': '1px solid ' + this.props.colours.secondary,
                }
                break;

            case 'normal':
                colourStyle = {
                    'background-color': this.props.colours.secondary,
                    'color': this.props.colours.primary,
                    'border': '1px solid ' + this.props.colours.secondary,
                }
                break;
        }
        
        let style = { ...this.props.style, ...colourStyle};

        return (
            <button
            //className='button'
            className={this.props.classes}
            style={style}
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
            onClick={this.props.onClick}
            >
                {this.props.contents}
            </button>
        )
    }
}