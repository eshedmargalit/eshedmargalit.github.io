import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";
import Slider from "react-rangeslider";
import Chart from "./Chart.js";
import ROCCurve from "./ROCCurve.js";

// utils
import {
  roundTruncate,
  getROCCurve,
  normalCDF,
  normalICDF,
} from "./mathUtils.js";

// stylesheets
import "react-rangeslider/lib/index.css";
import "./Calc.css";

class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal_mean: 15,
      signal_sigma: 4,
      noise_mean: 10,
      noise_sigma: 4,
      criterion: 12,
      sigma_lock: true,
      isEditingHits: false,
      isEditingFP: false,
      isEditingMisses: false,
      isEditingCR: false,
    };
    this.signal_color = "#1e88e5";
    this.noise_color = "#ffc107";
    this.updateMetrics = this.updateMetrics.bind(this);
  }

  componentDidMount() {
    this.updateMetrics();
  }

  updateMetrics() {
    this.setState((prevState, props) => {
      return {
        dprime:
          (prevState.signal_mean - prevState.noise_mean) /
          Math.sqrt(
            0.5 *
              (Math.pow(prevState.signal_sigma, 2) +
                Math.pow(prevState.noise_sigma, 2))
          ),
        hits: roundTruncate(
          1 -
            normalCDF(
              prevState.criterion,
              prevState.signal_mean,
              prevState.signal_sigma
            )
        ),
        misses: roundTruncate(
          normalCDF(
            prevState.criterion,
            prevState.signal_mean,
            prevState.signal_sigma
          )
        ),
        fp: roundTruncate(
          1 -
            normalCDF(
              prevState.criterion,
              prevState.noise_mean,
              prevState.noise_sigma
            )
        ),
        cr: roundTruncate(
          normalCDF(
            prevState.criterion,
            prevState.noise_mean,
            prevState.noise_sigma
          )
        ),
      };
    });
  }

  // slider update handlers
  handleOnChangeSignalMu = (value) => {
    this.setState({
      signal_mean: value,
    });
    this.updateMetrics();
  };

  handleOnChangeSignalSigma = (value) => {
    if (this.state.sigma_lock) {
      this.setState({
        signal_sigma: value,
        noise_sigma: value,
      });
    } else {
      this.setState({
        signal_sigma: value,
      });
    }
    this.updateMetrics();
  };

  handleOnChangeNoiseMu = (value) => {
    this.setState({
      noise_mean: value,
    });
    this.updateMetrics();
  };

  handleOnChangeNoiseSigma = (value) => {
    if (this.state.sigma_lock) {
      this.setState({
        noise_sigma: value,
        signal_sigma: value,
      });
    } else {
      this.setState({
        noise_sigma: value,
      });
    }
    this.updateMetrics();
  };

  handleOnChangeCriterion = (value) => {
    this.setState({
      criterion: value,
    });
    this.updateMetrics();
  };

  // checkbox toggle handler
  toggleCheckbox = (e) => {
    this.setState({
      sigma_lock: e.target.checked,
    });
    if (e.target.checked) {
      this.setState({
        signal_sigma: this.state.noise_sigma,
      });
    }
    this.updateMetrics();
  };

  renderSliders() {
    return (
      <Container>
        <Row>
          <Col lg="4" xs="4">
            <div>
              Signal Present Mean:
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
          <Col lg="4" xs="4">
            <div>
              Signal Absent Mean:
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
          <Col lg="4" xs="4">
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
          <Col lg="4" xs="4">
            <div>
              Signal Present Std:
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
          <Col lg="4" xs="4">
            <div>
              Signal Absent Std:
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
          <Col lg="4" xs="4">
            <Form>
              <FormGroup check>
                <Label check>
                  <Input
                    defaultChecked={this.state.sigma_lock}
                    onClick={this.toggleCheckbox}
                    type="checkbox"
                  />{" "}
                  Assume equal standard deviations?
                </Label>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  // field edit toggles
  toggleEditingHits() {
    this.setState({ isEditingHits: !this.state.isEditingHits });
  }

  toggleEditingMisses() {
    this.setState({ isEditingMisses: !this.state.isEditingMisses });
  }

  toggleEditingFPs() {
    this.setState({ isEditingFP: !this.state.isEditingFP });
  }

  toggleEditingCRs() {
    this.setState({ isEditingCR: !this.state.isEditingCR });
  }

  updateHitsInput = (e) => {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    var new_signal_mean =
      this.state.criterion + normalICDF(value, this.state.signal_sigma);

    new_signal_mean = Math.round(new_signal_mean * 100) / 100;

    this.setState({
      hits: value,
      signal_mean: new_signal_mean,
      dprime:
        (new_signal_mean - this.state.noise_mean) /
        Math.sqrt(
          0.5 *
            (Math.pow(this.state.signal_sigma, 2) +
              Math.pow(this.state.noise_sigma, 2))
        ),
      misses: 1 - value,
    });
  };

  updateMissesInput = (e) => {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    const hits = 1 - value;
    var new_signal_mean =
      this.state.criterion + normalICDF(hits, this.state.signal_sigma);

    new_signal_mean = Math.round(new_signal_mean * 100) / 100;

    this.setState({
      misses: value,
      signal_mean: new_signal_mean,
      dprime:
        (new_signal_mean - this.state.noise_mean) /
        Math.sqrt(
          0.5 *
            (Math.pow(this.state.signal_sigma, 2) +
              Math.pow(this.state.noise_sigma, 2))
        ),
      hits: hits,
    });
  };

  updateFPsInput = (e) => {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    var new_noise_mean =
      this.state.criterion + normalICDF(value, this.state.noise_sigma);

    new_noise_mean = Math.round(new_noise_mean * 100) / 100;

    this.setState({
      fp: value,
      noise_mean: new_noise_mean,
      dprime:
        (this.state.signal_mean - new_noise_mean) /
        Math.sqrt(
          0.5 *
            (Math.pow(this.state.signal_sigma, 2) +
              Math.pow(this.state.noise_sigma, 2))
        ),
      cr: 1 - value,
    });
  };

  updateCRsInput = (e) => {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    const FP = 1 - value;
    var new_noise_mean =
      this.state.criterion + normalICDF(FP, this.state.noise_sigma);

    new_noise_mean = Math.round(new_noise_mean * 100) / 100;

    this.setState({
      fp: FP,
      noise_mean: new_noise_mean,
      dprime:
        (this.state.signal_mean - new_noise_mean) /
        Math.sqrt(
          0.5 *
            (Math.pow(this.state.signal_sigma, 2) +
              Math.pow(this.state.noise_sigma, 2))
        ),
      cr: value,
    });
  };

  renderFields() {
    var rounded_dprime = (Math.round(this.state.dprime * 100) / 100).toFixed(2);
    var rounded_hits = (Math.round(this.state.hits * 100) / 100).toFixed(2);
    var rounded_misses = (Math.round(this.state.misses * 100) / 100).toFixed(2);
    var rounded_fp = (Math.round(this.state.fp * 100) / 100).toFixed(2);
    var rounded_cr = (Math.round(this.state.cr * 100) / 100).toFixed(2);

    let hitsBox;
    if (this.state.isEditingHits) {
      hitsBox = (
        <Input
          type="number"
          name="hits"
          id="hitsInput"
          value={this.state.hits}
          onChange={this.updateHitsInput}
          onBlur={this.toggleEditingHits.bind(this)}
          min={0}
          max={1}
          step={0.1}
        />
      );
    } else {
      hitsBox = (
        <Input
          type="text"
          name="hits"
          id="hitsInput"
          value={rounded_hits}
          onFocus={this.toggleEditingHits.bind(this)}
          readOnly
        />
      );
    }

    let missesBox;
    if (this.state.isEditingMisses) {
      missesBox = (
        <Input
          type="number"
          name="misses"
          id="missesInput"
          value={this.state.misses}
          onChange={this.updateMissesInput}
          onBlur={this.toggleEditingMisses.bind(this)}
          min={0}
          max={1}
          step={0.1}
        />
      );
    } else {
      missesBox = (
        <Input
          type="text"
          name="misses"
          id="missesInput"
          value={rounded_misses}
          onFocus={this.toggleEditingMisses.bind(this)}
          readOnly
        />
      );
    }

    let FPBox;
    if (this.state.isEditingFP) {
      FPBox = (
        <Input
          type="number"
          name="FPs"
          id="FPsInput"
          value={this.state.fp}
          onChange={this.updateFPsInput}
          onBlur={this.toggleEditingFPs.bind(this)}
          min={0}
          max={1}
          step={0.1}
        />
      );
    } else {
      FPBox = (
        <Input
          type="text"
          name="FPs"
          id="FPsInput"
          value={rounded_fp}
          onFocus={this.toggleEditingFPs.bind(this)}
          readOnly
        />
      );
    }

    let CRBox;
    if (this.state.isEditingCR) {
      CRBox = (
        <Input
          type="number"
          name="CRs"
          id="CRsInput"
          value={this.state.cr}
          onChange={this.updateCRsInput}
          onBlur={this.toggleEditingCRs.bind(this)}
          min={0}
          max={1}
          step={0.1}
        />
      );
    } else {
      CRBox = (
        <Input
          type="text"
          name="CRs"
          id="CRsInput"
          value={rounded_cr}
          onFocus={this.toggleEditingCRs.bind(this)}
          readOnly
        />
      );
    }

    return (
      <Container>
        <Row>
          <Col>
            <h5>
              d&#39;:{` `}
              <strong>{rounded_dprime}</strong>
            </h5>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h5>Values at Given Criterion</h5>
          </Col>
        </Row>
        <Row>
          <Col lg="6" xs="6">
            <FormGroup>
              <Label for="hitsInput">Hits:</Label>
              {hitsBox}
            </FormGroup>
          </Col>
          <Col lg="6" xs="6">
            <FormGroup>
              <Label for="missesInput">Misses:</Label>
              {missesBox}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="6" xs="6">
            <FormGroup>
              <Label for="FPsInput">False Alarms:</Label>
              {FPBox}
            </FormGroup>
          </Col>
          <Col lg="6" xs="6">
            <FormGroup>
              <Label for="CRsInput">Correct Rejections:</Label>
              {CRBox}
            </FormGroup>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    const CALC_HEIGHT = 250;
    return (
      <Container>
        <Row>
          <Col lg="8" xs="12">
            <h4 className="center">Normal Distributions</h4>
            <br />
            <Chart
              height={CALC_HEIGHT}
              signal_mean={this.state.signal_mean}
              signal_sigma={this.state.signal_sigma}
              signal_color={this.signal_color}
              noise_mean={this.state.noise_mean}
              noise_sigma={this.state.noise_sigma}
              noise_color={this.noise_color}
              criterion={this.state.criterion}
            />
          </Col>
          <Col lg="4" xs="12">
            <h4 className="center">ROC Curve</h4>
            <br />
            <ROCCurve
              size={CALC_HEIGHT}
              roc_data={getROCCurve(
                this.state.signal_mean,
                this.state.signal_sigma,
                this.state.noise_mean,
                this.state.noise_sigma
              )}
              hit_rate={this.state.hits}
              fp_rate={this.state.fp}
              signal_color={this.state.signal_color}
              noise_color={this.state.noise_color}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg="8" md="12" xs="12">
            {this.renderSliders()}
          </Col>
          <Col lg="4" md="12" xs="12">
            {this.renderFields()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Calc;
