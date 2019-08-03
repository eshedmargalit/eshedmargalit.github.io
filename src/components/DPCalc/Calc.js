import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-rangeslider";
import { TwitterPicker } from "react-color";

import "react-rangeslider/lib/index.css";
import Chart from "./Chart.js";

class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal_mean: 5,
      signal_sigma: 2,
      signal_color: "#0d5e08",
      noise_mean: 2,
      noise_sigma: 3,
      noise_color: "#960f0f"
    };
  }

  handleOnChangeSignalMu = value => {
    this.setState({
      signal_mean: value
    });
  };

  handleOnChangeSignalSigma = value => {
    this.setState({
      signal_sigma: value
    });
  };

  handleColorChangeSignal = (color, event) => {
    this.setState({
      signal_color: color.hex
    });
  };

  handleOnChangeNoiseMu = value => {
    this.setState({
      noise_mean: value
    });
  };

  handleOnChangeNoiseSigma = value => {
    this.setState({
      noise_sigma: value
    });
  };

  handleColorChangeNoise = (color, event) => {
    this.setState({
      noise_color: color.hex
    });
  };

  render() {
    return (
      <Container>
        <Chart
          signal_mean={this.state.signal_mean}
          signal_sigma={this.state.signal_sigma}
          signal_color={this.state.signal_color}
          noise_mean={this.state.noise_mean}
          noise_sigma={this.state.noise_sigma}
          noise_color={this.state.noise_color}
        />
        <Row>
          <Col lg="4" xs="4">
            <Slider
              min={0}
              max={100}
              value={this.state.signal_mean}
              orientation="horizontal"
              onChange={this.handleOnChangeSignalMu}
            />
          </Col>
          <Col lg="4" xs="4">
            <Slider
              value={this.state.signal_sigma}
              orientation="horizontal"
              onChange={this.handleOnChangeSignalSigma}
            />
          </Col>
          <Col lg="4" xs="4">
            <TwitterPicker
              color={this.state.signal_color}
              onChangeComplete={this.handleColorChangeSignal}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="4" xs="4">
            <Slider
              value={this.state.noise_mean}
              orientation="horizontal"
              onChange={this.handleOnChangeNoiseMu}
            />
          </Col>
          <Col lg="4" xs="4">
            <Slider
              value={this.state.noise_sigma}
              orientation="horizontal"
              onChange={this.handleOnChangeNoiseSigma}
            />
          </Col>
          <Col lg="4" xs="4">
            <TwitterPicker
              color={this.state.noise_color}
              onChangeComplete={this.handleColorChangeNoise}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Calc;
