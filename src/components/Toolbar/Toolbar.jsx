import React from 'react';
import { Navbar } from 'react-bootstrap';

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableSearch: false,
            enableDropdowns: false
        }
        
    }

    render() {
        return (
            <div style={{'backgroundColor': this.props.colours.primary}} className='toolbar'>
                <Navbar expand="lg">
                    <Navbar.Brand style={{color: this.props.colours.secondary}} onClick={this.props.toggleSettings} href="#home">{this.props.user}</Navbar.Brand>
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
                </Navbar>
            </div>
        )
    }
}