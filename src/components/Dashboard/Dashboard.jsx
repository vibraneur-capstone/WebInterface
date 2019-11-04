import React from 'react';
import Panel from './Panel.jsx';
import { Button } from 'react-bootstrap';

export default class Dashboard extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            panelFocus: 'undefined',
            nextID: 2,
            panels: [],
        }
        
        this.changeFocus = this.changeFocus.bind(this);
        this.addSingleBearing = this.addSingleBearing.bind(this);
    }

    /*
        Changes the panel that the user is currently focusing on
        id: The id of the component now in focus
    */
    changeFocus (e, id) {
        if (e !== undefined) {
            e.stopPropagation()
        }
        this.setState({
            panelFocus: id
        })
    }


    addSingleBearing(bearingID) {
        let panels = this.state.panels

        panels.push(
            <Panel
                id={this.state.nextID}
                focus={this.state.panelFocus}
                changeFocus={this.changeFocus}
            ></Panel>
        )
        this.setState({
            panels: panels,
            nextID: this.state.nextID + 1
        })
    }

    render () {

        let containerStyle = this.props.style;

        let addPanelStyle = {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            right: '50px',
            bottom: '50px',
            position: 'absolute',
        }
        

        return (
            <div style={containerStyle} onClick={() => {this.changeFocus(undefined, undefined)}}>
                <Panel
                    id={1}
                    focus={this.state.panelFocus}
                    changeFocus={this.changeFocus}
                >
                </Panel>
                {this.state.panels}
                <Button 
                    style={addPanelStyle}
                    onClick={this.addSingleBearing}
                >+</Button>
            </div>
        )
    }
}