import React, { Component } from "react";
import { Row, Col, Button, FormGroup, Input } from "reactstrap";
import { FaTimes } from "react-icons/fa";

class ExpandableList extends Component {
  addNewHandler = () => {
    this.props.itemUpdateHandler("", this.props.items.length);
  };

  render() {
    let items_list = this.props.items.map((item, i) => {
      return (
        <Row>
          <Col lg="11">
            <Input
              type="text"
              key={"input_num" + i}
              value={item}
              onChange={e => this.props.itemUpdateHandler(e.target.value, i)}
            />
            <br />
          </Col>
          <Col lg="1">
            <Button
              color="danger"
              onClick={() => this.props.itemUpdateHandler("_DELETE", i)}
            >
              <FaTimes />
            </Button>
          </Col>
        </Row>
      );
    });

    let list_render = <FormGroup>{items_list}</FormGroup>;

    // new button
    let new_button = (
      <Button outline size="sm" color="primary" onClick={this.addNewHandler}>
        Add {this.props.item_name}
      </Button>
    );

    return (
      <div>
        {list_render}
        {new_button}
        <br />
      </div>
    );
  }
}
export default ExpandableList;
