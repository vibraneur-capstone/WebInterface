import React from 'react';
import Panel from './Panel.jsx';
import jQuery from 'jquery';
import AddPanel from './DashBoardPanels/AddPanel.jsx';

export default class Dashboard extends React.Component {
    constructor (props) {
        super (props);

        if ('config' in this.props) {
            this.state = {
                panels: this.props.config.panels,
                nextID: this.props.config.panels.length + 1,
                panelFocus: 'undefined',
            }
        } else {
            this.state = {
                panelFocus: 'undefined',
                nextID: 2,
                panels: {},
            };    
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

    addPanel(type, config) {
        let panels = jQuery.extend({}, this.state.panels);

        panels[this.state.nextID] = {
            type: type,
        }

        if (config !== undefined) {
            panels[this.state.nextID] = {...panels[this.state.nextID], ...config}
        }

        this.setState({
            panels: panels,
            nextID: this.state.nextID + 1
        })
    }

    render () {
        let panels = [];
        for (const key in this.state.panels) {
            const obj = this.state.panels[key];
            panels.push (
                <Panel
                    id={key}
                    key={key}
                    config={obj}
                    colours={this.props.colours}
                    focus={this.state.panelFocus}
                    changeFocus={this.changeFocus}
                    addPanel={this.addPanel}
                    removePanel={this.removePanel}
                    organization={this.props.organization}
                />
            )
        }

        let containerStyle = this.props.style;

        let addPanelStyle = { 
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            right: '50px',
            bottom: '50px',
            'zIndex': 2,
            position: 'absolute',
        };
        

        return (
            <div style={containerStyle} onClick={() => {this.changeFocus(undefined, undefined)}}>
                {panels}
                <AddPanel
                    colours={this.props.colours}
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
