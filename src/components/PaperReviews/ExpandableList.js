import React, { Component } from "react";
import { Button, FormGroup, Input } from "reactstrap";

class ExpandableList extends Component {
  addNewHandler = () => {
    this.props.itemUpdateHandler("New Item", this.props.items.length);
  };

  render() {
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
