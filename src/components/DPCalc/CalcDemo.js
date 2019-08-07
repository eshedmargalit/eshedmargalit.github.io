import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import _ from "lodash";

import DemoChart from "./DemoChart.js";

class CalcDemo extends Component {
  constructor(props) {
    super(props);
    this.chartHeight = 400;
    this.value_options = [];

    for (let i = 1; i <= 30; i++) {
      this.value_options.push(i);
    }
    var value_dict = this.value_options.map(val => {
      return { x: val, signal_count: 0, noise_count: 0 };
    });

    var gaussian = require("gaussian");
    this.signal_distribution_mean = 20;
    this.signal_distribution_variance = 9;
    this.signal_distribution = gaussian(
      this.signal_distribution_mean,
      this.signal_distribution_variance
    );

    this.noise_distribution_mean = 10;
    this.noise_distribution_variance = 9;
    this.noise_distribution = gaussian(
      this.noise_distribution_mean,
      this.noise_distribution_variance
    );

    this.state = {
      value_dict: value_dict,
      show_signal_gaussian: false,
      show_noise_gaussian: false,
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
            Let's collect some data! First, we'll build up our understanding of
            how this neuron responds when we play the beep. If we run a single
            trial of this experiment, we might observe some firing rate from the
            neuron, like 18 spikes per second.
            <hr />
            <Button
              onClick={e => {
                var value_dict_copy = this.state.value_dict;
                value_dict_copy[18 - 1].signal_count = 1;
                this.setState({ value_dict: value_dict_copy });
              }}
            >
              Collect Trial #1
            </Button>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            Great! It's tempting to conclude that "the neuron's response to a
            beep is to fire at a rate of 18 spikes per second, but biology is
            messy. Let's repeat our experiment and see what happens.
            <hr />
            <Button
              onClick={e => {
                var value_dict_copy = this.state.value_dict;
                value_dict_copy[20 - 1].signal_count = 1;
                this.setState({ value_dict: value_dict_copy });
              }}
            >
              Collect Trial #2.
            </Button>
            <hr />
            Oh dear... It looks like our neuron isn't as reliable as we thought.
            In practice, we refer to this variability as 'noise', and you'll
            hear neuroscientistis say that a neuron is "noisy" if its response
            to the same stimulus (our beep) is unpredictable. Let's run 250 more
            trials of our experiment to see how noisy this neuron is.
            <hr />
            <Button
              onClick={e => {
                var value_dict_copy = this.incrementSignalCounts(250);
                this.setState({ value_dict: value_dict_copy });
              }}
            >
              {" "}
              Collect Trials #3 - #253.
            </Button>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            Now that we've invested the time and effort into collecting 253
            trials of "play a beep and measure neuron firing rate", we have a
            pretty good idea of how noisy this neuron is. In practice, we can
            summarize this <em>distribution</em> of firing rates by fitting a
            Gaussian curve to the histogram. Gaussian distributions are nice
            because we only need two numbers to describe them: a mean (the
            center of mass) and the variance (a measure of spread, or how far
            values are on average from the center of mass). Notice that higher
            variance means that the neuron's response to a beep is{" "}
            <em>noisier</em>, or less reliable.
            <hr />
            <Button
              onClick={e => {
                this.setState({ show_signal_gaussian: true });
              }}
            >
              {" "}
              Fit that curve!
            </Button>
            <hr />
          </Col>
        </Row>
      </Container>
    );
  }

  constructData() {
    const valdict = this.state.value_dict;

    // set up base values
    var data = valdict.map(item => {
      return {
        x: item.x
      };
    });

    // add pieces as needed
    if (this.state.show_signal_gaussian) {
      for (let i = 0; i < data.length; i++) {
        data[i].signal_gaussian_value = this.signal_distribution.pdf(
          valdict[i].x
        );
      }
    }

    if (this.state.show_noise_gaussian) {
      for (let i = 0; i < data.length; i++) {
        data[i].noise_gaussian_value = this.noise_distribution.pdf(
          valdict[i].x
        );
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

    // sort the data
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
            <DemoChart data={this.constructData()} height={this.chartHeight} />
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
