import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavLink
} from "reactstrap";

class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <LinkContainer to="/">
            <NavbarBrand>Eshed Margalit</NavbarBrand>
          </LinkContainer>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <LinkContainer to="/CV">
                <NavLink>CV</NavLink>
              </LinkContainer>
              <LinkContainer to="/Research">
                <NavLink>Research</NavLink>
              </LinkContainer>
              <LinkContainer to="/Fun">
                <NavLink>Fun!</NavLink>
              </LinkContainer>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MenuBar;
