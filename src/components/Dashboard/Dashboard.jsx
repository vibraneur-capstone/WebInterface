import React from 'react';
import Panel from './Panel.jsx';
import { Button } from 'react-bootstrap';
import jQuery from 'jquery'; 
import AddPanel from './DashBoardPanels/AddPanel.jsx';

export default class Dashboard extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            panelFocus: 'undefined',
            nextID: 2,
            panels: {},
        }
        
        this.changeFocus = this.changeFocus.bind(this);
        this.addPanel = this.addPanel.bind(this);
        this.removePanel = this.removePanel.bind(this);
        
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
        //let idx = panels.indexOf(id)
        delete panels[id]
        //panels.splice(idx, 1);
        this.setState({
            panels: panels
        })
    }

    addPanel(type) {
        console.warn("TYPE: ", type)
        let panels = jQuery.extend({}, this.state.panels);

        panels[this.state.nextID] = {
            type: type
        }
        console.warn("PANELS: ", panels)
        this.setState({
            panels: panels,
            nextID: this.state.nextID + 1
        })
    }

    render () {
        let panels = []
        console.warn("PANELS: ", this.state.panels);
        for (let key in this.state.panels) {
            let obj = this.state.panels[key];
            panels.push (
                <Panel
                    id={key}
                    key={key}
                    config={obj}
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
                <AddPanel
                    style={addPanelStyle}
                    addPanel={this.addPanel}
                >
                </AddPanel>
                {/*<Button 
                    style={addPanelStyle}
                    onClick={this.addSingleBearing}
                >+</Button>*/}
            </div>
        )
    }
}