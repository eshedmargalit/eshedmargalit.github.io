import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import _ from "lodash";

import DemoChart from "./DemoChart.js";

class CalcDemo extends Component {
  constructor(props) {
    super(props);
    this.chartHeight = 400;
    this.value_options = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30
    ];
    var value_dict = this.value_options.map(val => {
      return { x: val, signal_count: 0, noise_count: 0 };
    });

    var gaussian = require("gaussian");
    this.signal_distribution_mean = 15;
    this.signal_distribution_variance = 16;
    this.signal_distribution = gaussian(
      this.signal_distribution_mean,
      this.signal_distribution_variance
    );

    this.noise_distribution_mean = 12;
    this.noise_distribution_variance = 16;
    this.noise_distribution = gaussian(
      this.noise_distribution_mean,
      this.noise_distribution_variance
    );

    this.state = {
      ylabel: "Count",
      value_dict: value_dict,
      show_signal_gaussian: false,
      show_signal_counts: true,
      show_noise_counts: true
    };
  }

  incrementSignalCounts(n) {
    var value_dict_copy = this.state.value_dict;
    for (let i = 0; i < n; i++) {
      var sample = Math.floor(this.signal_distribution.ppf(Math.random()));

      if (sample < 1) {
        sample = 1;
      } else if (sample > 30) {
        sample = 30;
      }
      value_dict_copy[sample - 1].signal_count++;
    }

    return value_dict_copy;
  }

  incrementNoiseCounts(n) {
    var value_dict_copy = this.state.value_dict;
    for (let i = 0; i < n; i++) {
      var sample = Math.floor(this.noise_distribution.ppf(Math.random()));

      if (sample < 1) {
        sample = 1;
      } else if (sample > 30) {
        sample = 30;
      }
      value_dict_copy[sample - 1].noise_count++;
    }

    return value_dict_copy;
  }

  signalIncOneHandler = e => {
    const update_dict = this.incrementSignalCounts(1);
    this.setState({
      value_dict: update_dict
    });
  };
  signalIncTenHandler = e => {
    const update_dict = this.incrementSignalCounts(10);
    this.setState({
      value_dict: update_dict
    });
  };
  signalIncHundredHandler = e => {
    const update_dict = this.incrementSignalCounts(100);
    this.setState({
      value_dict: update_dict
    });
  };

  noiseIncOneHandler = e => {
    const update_dict = this.incrementNoiseCounts(1);
    this.setState({
      value_dict: update_dict
    });
  };
  noiseIncTenHandler = e => {
    const update_dict = this.incrementNoiseCounts(10);
    this.setState({
      value_dict: update_dict
    });
  };
  noiseIncHundredHandler = e => {
    const update_dict = this.incrementNoiseCounts(100);
    this.setState({
      value_dict: update_dict
    });
  };

  toggleSignalGaussianHandler = e => {
    this.setState({
      show_signal_gaussian: !this.state.show_signal_gaussian
    });
  };

  toggleNoiseGaussianHandler = e => {
    this.setState({
      show_noise_gaussian: !this.state.show_noise_gaussian
    });
  };

  toggleSignalCountHandler = e => {
    this.setState({
      show_signal_counts: !this.state.show_signal_counts
    });
  };

  toggleNoiseCountHandler = e => {
    console.log(this.state);
    this.setState({
      show_noise_counts: !this.state.show_noise_counts
    });
  };

  renderInstructions() {
    return (
      <Container>
        <Row>
          <Col>
            <br />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.signalIncOneHandler}>SignalInc</Button>
            <br />
            <br />

            <Button onClick={this.signalIncTenHandler}>SignalInc10</Button>
            <br />
            <br />

            <Button onClick={this.signalIncHundredHandler}>SignalInc100</Button>
            <br />
            <br />
          </Col>
          <Col>
            <Button onClick={this.noiseIncOneHandler}>NoiseInc</Button>
            <br />
            <br />

            <Button onClick={this.noiseIncTenHandler}>NoiseInc10</Button>
            <br />
            <br />

            <Button onClick={this.noiseIncHundredHandler}>NoiseInc100</Button>
            <br />
            <br />
          </Col>
          <Col>
            <Button onClick={this.toggleSignalGaussianHandler}>
              ToggleSignalGaussian
            </Button>
            <br />
            <br />

            <Button onClick={this.toggleNoiseGaussianHandler}>
              ToggleNoiseGaussian
            </Button>
            <br />
            <br />

            <Button onClick={this.toggleSignalCountHandler}>
              ToggleSignalBars
            </Button>
            <br />
            <br />

            <Button onClick={this.toggleNoiseCountHandler}>
              ToggleNoiseBars
            </Button>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    );
  }

  constructData() {
    const valdict = this.state.value_dict;

    const signalMaxCount = _.maxBy(valdict, function(o) {
      return o.signal_count;
    }).signal_count;
    var signal_mult_factor =
      (1 / this.signal_distribution.pdf(this.signal_distribution_mean)) *
      signalMaxCount;

    const noiseMaxCount = _.maxBy(valdict, function(o) {
      return o.noise_count;
    }).noise_count;
    var noise_mult_factor =
      (1 / this.noise_distribution.pdf(this.noise_distribution_mean)) *
      noiseMaxCount;

    var data = valdict.map(item => {
      return {
        x: item.x
      };
    });

    if (this.state.show_signal_gaussian) {
      for (let i = 0; i < data.length; i++) {
        data[i].signal_gaussian_value =
          this.signal_distribution.pdf(valdict[i].x) * signal_mult_factor;
      }
    }

    if (this.state.show_noise_gaussian) {
      for (let i = 0; i < data.length; i++) {
        data[i].noise_gaussian_value =
          this.noise_distribution.pdf(valdict[i].x) * noise_mult_factor;
      }
    }

    if (this.state.show_signal_counts) {
      for (let i = 0; i < data.length; i++) {
        data[i].signal_count = valdict[i].signal_count;
      }
    }

    if (this.state.show_noise_counts) {
      for (let i = 0; i < data.length; i++) {
        data[i].noise_count = valdict[i].noise_count;
      }
    }

    data.sort((a, b) => {
      return a.x - b.x;
    });

    return data;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="6" lg="6">
            <br />
            <br />
            <br />
            <DemoChart
              ylabel={this.state.ylabel}
              data={this.constructData()}
              height={this.chartHeight}
            />
            <br />
            <br />
            <br />
          </Col>

          {/* TODO indpendent scrolling */}
          <Col xs="6" lg="6">
            {this.renderInstructions()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CalcDemo;
