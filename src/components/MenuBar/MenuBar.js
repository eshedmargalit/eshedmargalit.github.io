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
import {
  FaCalculator,
  FaRegCalendar,
  FaBrain,
  FaRegListAlt
} from "react-icons/fa";

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
                <NavLink>
                  <FaRegListAlt />
                  {` `}CV
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/Research">
                <NavLink>
                  <FaBrain />
                  {` `}Research
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/PaperReviews">
                <NavLink>
                  <FaRegCalendar />
                  {` `}Paper-a-Week
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/DPCalc">
                <NavLink>
                  <FaCalculator />
                  {` `}d&#39; Calculator
                </NavLink>
              </LinkContainer>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MenuBar;
