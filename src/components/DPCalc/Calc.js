import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";
import Slider from "react-rangeslider";

import "react-rangeslider/lib/index.css";
import Chart from "./Chart.js";
import ROCCurve from "./ROCCurve.js";
import "./Chart.css";
import { erf } from "mathjs";

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
    this.updateMetrics = this.updateMetrics.bind(this);
  }

  componentDidMount() {
    this.updateMetrics();
  }

  cdfNormal(x, mean, standardDeviation) {
    return (1 - erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2;
  }

  updateMetrics() {
    this.setState({
      dprime:
        (this.state.signal_mean - this.state.noise_mean) /
        Math.sqrt(
          0.5 *
            (Math.pow(this.state.signal_sigma, 2) +
              Math.pow(this.state.noise_sigma, 2))
        ),
      hits:
        1 -
        this.cdfNormal(
          this.state.criterion,
          this.state.signal_mean,
          this.state.signal_sigma
        ),
      misses: this.cdfNormal(
        this.state.criterion,
        this.state.signal_mean,
        this.state.signal_sigma
      ),
      fp:
        1 -
        this.cdfNormal(
          this.state.criterion,
          this.state.noise_mean,
          this.state.noise_sigma
        ),
      cr: this.cdfNormal(
        this.state.criterion,
        this.state.noise_mean,
        this.state.noise_sigma
      )
    });
  }

  getROCCurve() {
    var data = [];
    for (var criterion = 0; criterion < 30; criterion += 0.1) {
      var hits =
        1 -
        this.cdfNormal(
          criterion,
          this.state.signal_mean,
          this.state.signal_sigma
        );
      var false_positives =
        1 -
        this.cdfNormal(
          criterion,
          this.state.noise_mean,
          this.state.noise_sigma
        );
      var el = {
        false_positives: false_positives,
        hits: hits
      };
      data.push(el);
    }

    // make sure extremes are represented
    data.push({
      false_positives: 0,
      hits: 0
    });
    data.push({
      false_positives: 1,
      hits: 1
    });

    data.sort((a, b) => {
      return a.false_positives - b.false_positives;
    });

    return data;
  }

  handleOnChangeSignalMu = value => {
    this.setState({
      signal_mean: value
    });
    this.updateMetrics();
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
    this.updateMetrics();
  };

  handleOnChangeNoiseMu = value => {
    this.setState({
      noise_mean: value
    });
    this.updateMetrics();
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
    this.updateMetrics();
  };

  handleOnChangeCriterion = value => {
    this.setState({
      criterion: value
    });
    this.updateMetrics();
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

  renderSliders() {
    return (
      <Container>
        <Row>
          <Col lg="3" xs="3">
            <div>
              Signal Mean:
              <br /> <strong>{this.state.signal_mean}</strong>
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
              Noise Mean:
              <br /> <strong>{this.state.noise_mean}</strong>
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
              Criterion:
              <br /> <strong>{this.state.criterion}</strong>
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
              Signal Std:
              <br /> <strong>{this.state.signal_sigma}</strong>
            </div>
            <Slider
              min={1}
              max={15}
              value={this.state.signal_sigma}
              orientation="horizontal"
              onChange={this.handleOnChangeSignalSigma}
            />
          </Col>
          <Col lg="3" xs="3">
            <div>
              Noise Std:
              <br /> <strong>{this.state.noise_sigma}</strong>
            </div>
            <Slider
              min={1}
              max={15}
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

  renderFields() {
    var rounded_dprime = (Math.round(this.state.dprime * 100) / 100).toFixed(2);
    var rounded_hits = (Math.round(this.state.hits * 100) / 100).toFixed(2);
    var rounded_misses = (Math.round(this.state.misses * 100) / 100).toFixed(2);
    var rounded_fp = (Math.round(this.state.fp * 100) / 100).toFixed(2);
    var rounded_cr = (Math.round(this.state.cr * 100) / 100).toFixed(2);

    return (
      <Container>
        <Row>
          <Col>
            d-prime:{` `}
            <strong>{rounded_dprime}</strong>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col lg="6" xs="6">
            Hits:{` `}
            <strong>{rounded_hits}</strong>
          </Col>
          <Col lg="6" xs="6">
            Misses:{` `}
            <strong>{rounded_misses}</strong>
          </Col>
        </Row>

        <Row>
          <Col lg="6" xs="6">
            False Positives:{` `}
            <strong>{rounded_fp}</strong>
          </Col>
          <Col lg="6" xs="6">
            Correct Rejections:{` `}
            <strong>{rounded_cr}</strong>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg="8" xs="12">
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
          <Col lg="4" xs="12">
            <h4 style={{ float: "right" }}>ROC Curve</h4>
            <br />
            <ROCCurve size={300} roc_data={this.getROCCurve()} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg="9" xs="9">
            {this.renderSliders()}
          </Col>
          <Col lg="3" xs="3">
            {this.renderFields()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Calc;
