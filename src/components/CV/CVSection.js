import React, { Fragment, Component } from "react";
import { Card, CardBody, Button, Collapse } from "reactstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./CV.css";

class PeopleCard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      collapse: props.default_open
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const toggle_arrow = this.state.collapse ? <FaAngleUp /> : <FaAngleDown />;
    return (
      <Fragment>
        <Button color="link" onClick={this.toggle}>
          <h4>
            {this.props.icon}
            {` `}
            {this.props.title}
            {toggle_arrow}
          </h4>
        </Button>
        <em>{this.props.description}</em>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>{this.props.internal}</CardBody>
          </Card>
        </Collapse>
      </Fragment>
    );
  }
}

export default PeopleCard;
