import React from 'react';
import Panel from './Panel.jsx';
import { Button } from 'react-bootstrap';

export default class Dashboard extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            panelFocus: 'undefined',
            nextID: 1
        }
        
        this.changeFocus = this.changeFocus.bind(this);
    }

    /*
        Changes the panel that the user is currently focusing on
        id: The id of the component now in focus
    */
    changeFocus (id) {
        this.setState({
            panelFocus: id
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

        for (let panel in this.state.panels) {

        }

        return (
            <div style={containerStyle}>
                <Panel
                    id={1}
                    focus={this.state.panelFocus}
                    changeFocus={this.changeFocus}
                >
                </Panel>

                <Button style={addPanelStyle}
                    
                >+</Button>
            </div>
        )
    }
}