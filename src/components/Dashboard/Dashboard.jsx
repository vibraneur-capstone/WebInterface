import React from 'react';
import Panel from './Panel.jsx';
import { Button } from 'react-bootstrap';
import jQuery from 'jquery'; 

export default class Dashboard extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            panelFocus: 'undefined',
            nextID: 2,
            panels: [],
        }
        
        this.changeFocus = this.changeFocus.bind(this);
        this.removePanel = this.removePanel.bind(this);
        this.addSingleBearing = this.addSingleBearing.bind(this);
    }

    /*
        Changes the panel that the user is currently focusing on
        id: The id of the component now in focus
    */
    changeFocus (e, id) {
        console.warn("CHANGE FOCUS: ", e, id);
        if (e !== undefined) {
            e.stopPropagation()
        }
        this.setState({
            panelFocus: id
        })
    }

    removePanel(id) {
        let panels = this.state.panels;
        let idx = panels.indexOf(id)
        panels.splice(idx, 1);
        this.setState({
            panels: panels
        })
    }

    addSingleBearing() {
        let panels = this.state.panels;
        panels.push(this.state.nextID);

        this.setState({
            panels: jQuery.extend([], panels),
            nextID: this.state.nextID + 1
        })
    }

    render () {
        let panels = []
        console.warn("PANELS: ", this.state.panels);
        for (let idx in this.state.panels) {
            console.warn("IDX: ", idx);
            panels.push (
                <Panel
                    id={idx}
                    key={idx}
                    focus={this.state.panelFocus}
                    changeFocus={this.changeFocus}
                    removePanel={this.removePanel}
                ></Panel>    
            )
        }

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
                {panels}
                <Button 
                    style={addPanelStyle}
                    onClick={this.addSingleBearing}
                >+</Button>
            </div>
        )
    }
}