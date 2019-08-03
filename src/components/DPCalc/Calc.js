import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";
import Slider from "react-rangeslider";

import "react-rangeslider/lib/index.css";
import Chart from "./Chart.js";
import ROCCurve from "./ROCCurve.js";
import "./Chart.css";

class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal_mean: 15,
      signal_sigma: 4,
      signal_color: "#0d5e08",
      noise_mean: 10,
      noise_sigma: 4,
      noise_color: "#960f0f",
      criterion: 12,
      sigma_lock: true
    };
  }

  handleOnChangeSignalMu = value => {
    this.setState({
      signal_mean: value
    });
  };

  handleOnChangeSignalSigma = value => {
    if (this.state.sigma_lock) {
      this.setState({
        signal_sigma: value,
        noise_sigma: value
      });
    } else {
      this.setState({
        signal_sigma: value
      });
    }
  };

  handleOnChangeNoiseMu = value => {
    this.setState({
      noise_mean: value
    });
  };

  handleOnChangeNoiseSigma = value => {
    if (this.state.sigma_lock) {
      this.setState({
        noise_sigma: value,
        signal_sigma: value
      });
    } else {
      this.setState({
        noise_sigma: value
      });
    }
  };

  handleOnChangeCriterion = value => {
    this.setState({
      criterion: value
    });
  };

  toggleCheckbox = e => {
    this.setState({
      sigma_lock: e.target.checked
    });
    if (e.target.checked) {
      this.setState({
        signal_sigma: this.state.noise_sigma
      });
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col lg="8" xs="8">
            <h4 style={{ float: "right" }}>Normal Distributions</h4>
            <br />
            <Chart
              height={300}
              signal_mean={this.state.signal_mean}
              signal_sigma={this.state.signal_sigma}
              signal_color={this.state.signal_color}
              noise_mean={this.state.noise_mean}
              noise_sigma={this.state.noise_sigma}
              noise_color={this.state.noise_color}
              criterion={this.state.criterion}
            />
          </Col>
          <Col lg="4" xs="4">
            <h4 style={{ float: "right" }}>ROC Curve</h4>
            <br />
            <ROCCurve
              size={300}
              signal_mean={this.state.signal_mean}
              signal_sigma={this.state.signal_sigma}
              noise_mean={this.state.noise_mean}
              noise_sigma={this.state.noise_sigma}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg="3" xs="3">
            <div>
              Signal Mean: <strong>{this.state.signal_mean}</strong>
            </div>
            <Slider
              min={1}
              max={25}
              value={this.state.signal_mean}
              orientation="horizontal"
              onChange={this.handleOnChangeSignalMu}
            />
          </Col>
          <Col lg="3" xs="3">
            <div>
              Noise Mean: <strong>{this.state.noise_mean}</strong>
            </div>
            <Slider
              min={1}
              max={25}
              value={this.state.noise_mean}
              orientation="horizontal"
              onChange={this.handleOnChangeNoiseMu}
            />
          </Col>
          <Col lg="3" xs="3">
            <div>
              Criterion: <strong>{this.state.criterion}</strong>
            </div>
            <Slider
              min={0}
              max={30}
              value={this.state.criterion}
              orientation="horizontal"
              onChange={this.handleOnChangeCriterion}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="3" xs="3">
            <div>
              Signal Std: <strong>{this.state.signal_sigma}</strong>
            </div>
            <Slider
              min={1}
              max={10}
              value={this.state.signal_sigma}
              orientation="horizontal"
              onChange={this.handleOnChangeSignalSigma}
            />
          </Col>
          <Col lg="3" xs="3">
            <div>
              Noise Std: <strong>{this.state.noise_sigma}</strong>
            </div>
            <Slider
              min={1}
              max={10}
              value={this.state.noise_sigma}
              orientation="horizontal"
              onChange={this.handleOnChangeNoiseSigma}
            />
          </Col>
          <Col lg="3" xs="3">
            <Form>
              <FormGroup check>
                <Label check>
                  <Input
                    defaultChecked={this.state.sigma_lock}
                    onClick={this.toggleCheckbox}
                    type="checkbox"
                  />{" "}
                  Assume equal sigmas?
                </Label>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Calc;
