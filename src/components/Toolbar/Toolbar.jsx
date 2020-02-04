import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import FindBearing from '../Tools/FindBearing.jsx';

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableSearch: false,
            enableDropdowns: false
        }
        
        this.launchSingleBearing = this.launchSingleBearing.bind(this);
    }

    launchSingleBearing() {

    }

    render() {
        return (
            <div className='toolbar'>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand onClick={this.props.toggleSettings} href="#home">{this.props.user}</Navbar.Brand>
                    {/* 
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        
                    </Navbar.Collapse>
                    */}
                    <Form inline>
                            <FindBearing
                                changeBearing={this.launchSingleBearing}
                            ></FindBearing>
                            {/*<FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                            {/*<Button variant="outline-success">Search</Button>*/}
                    </Form>
                </Navbar>
            </div>
        )
    }
}