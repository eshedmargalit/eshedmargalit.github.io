import React, { Component } from "react";
import { exp, dotPow, sqrt, pi, subtract, dotDivide } from "mathjs";
import { Container } from "reactstrap";
import Slider from "react-rangeslider";

import "react-rangeslider/lib/index.css";
import Chart from "./Chart.js";

class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 1,
      mean: 2,
      sigma: 3
    };

    this.data = [1, 2, 3];
  }

  gaussian(x, mean, sigma) {
    // x is a vector, mean and sigma are scalars
    const a = subtract(0, dotPow(subtract(x, mean), 2.0));
    const b = 2.0 * dotPow(sigma, 2.0);
    const scaling = sqrt(2.0 * pi) * sigma;
    return dotDivide(exp(dotDivide(a, b)), scaling);
  }

  handleOnChangeX = value => {
    console.log(value);
    this.setState({
      x: value
    });

    this.data = [value, this.data[1], this.data[2]];
  };

  handleOnChangeMu = value => {
    this.setState({
      mean: value
    });
  };

  handleOnChangeSigma = value => {
    this.setState({
      sigma: value
    });
  };

  render() {
    let { x, mean, sigma } = this.state;
    return (
      <Container>
        <Chart mean={this.state.mean} sigma={this.state.sigma} />
        <Slider
          value={x}
          orientation="horizontal"
          onChange={this.handleOnChangeX}
        />
        <Slider
          value={mean}
          orientation="horizontal"
          onChange={this.handleOnChangeMu}
        />
        <Slider
          value={sigma}
          orientation="horizontal"
          onChange={this.handleOnChangeSigma}
        />
      </Container>
    );
  }
}

export default Calc;
