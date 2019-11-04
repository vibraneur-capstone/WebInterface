import React from 'react';
import Panel from './Panel.jsx';
import { Button } from 'react-bootstrap';

export default class Dashboard extends React.Component {
    constructor (props) {
        super (props);

        this.state = {

        }
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
            <div style={containerStyle}>
                <Panel>

                </Panel>

                <Button style={addPanelStyle}
                    
                >+</Button>
            </div>
        )
    }
}