import React, { Component } from "react";
import { Container, Row, Col, FormGroup, Input } from "reactstrap";

class ExpandableList extends Component {
  render() {
    let list_render = null;
    if (this.props.items) {
      let items_list = this.props.items.map((item, i) => {
        return (
          <Input
            type="text"
            key={"input_num" + i}
            value={item}
            onChange={e => this.props.itemUpdateHandler(e.target.value, i)}
          />
        );
      });

      list_render = <FormGroup>{items_list}</FormGroup>;
    } else {
      list_render = <FormGroup>Oh</FormGroup>;
    }

    return (
      <Container>
        <Row>
          <Col>{list_render}</Col>
        </Row>
      </Container>
    );
  }
}
export default ExpandableList;
