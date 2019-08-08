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
      show_noise_counts: true,
      part: 1
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
    const reset_button = (
      <Button
        color="danger"
        onClick={e => {
          const blank_value_dict = this.value_options.map(val => {
            return { x: val, signal_count: 0, noise_count: 0 };
          });
          this.setState({
            value_dict: blank_value_dict,
            show_signal_gaussian: false,
            show_noise_gaussian: false,
            show_signal_counts: true,
            show_noise_counts: true,
            part: 1
          });
        }}
      >
        {" "}
        Reset the Story{" "}
      </Button>
    );

    let part_to_render;
    if (this.state.part === 1) {
      part_to_render = (
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
                this.setState({ value_dict: value_dict_copy, part: 2 });
              }}
            >
              Collect Trial #1
            </Button>
            <hr />
          </Col>
        </Row>
      );
    } else if (this.state.part === 2) {
      part_to_render = (
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
                this.setState({ value_dict: value_dict_copy, part: 3 });
              }}
            >
              Collect Trial #2.
            </Button>
            <hr />
          </Col>
        </Row>
      );
    } else if (this.state.part === 3) {
      part_to_render = (
        <Row>
          <Col>
            Oh dear... It looks like our neuron isn't as reliable as we thought.
            In practice, we refer to this variability as 'noise', and you'll
            hear neuroscientistis say that a neuron is "noisy" if its response
            to the same stimulus (our beep) is unpredictable. Let's run 250 more
            trials of our experiment to see how noisy this neuron is.
            <hr />
            <Button
              onClick={e => {
                var value_dict_copy = this.incrementSignalCounts(250);
                this.setState({ value_dict: value_dict_copy, part: 4 });
              }}
            >
              {" "}
              Collect Trials #3 - #253.
            </Button>
            <hr />
          </Col>
        </Row>
      );
    } else if (this.state.part === 4) {
      part_to_render = (
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
            <br />
            <br />
            <em> Fun side note:</em> in reality, firing rates don't often follow
            a Gaussian distribution. Instead, they follow what's called a
            Poisson distribution. Under a Poisson distribution, the mean and
            variance are equal, so neurons that fire more rapidly are also less
            reliable in how rapidly they fire!
            <hr />
            <Button
              onClick={e => {
                this.setState({ show_signal_gaussian: true, part: 5 });
              }}
            >
              {" "}
              Fit that curve!
            </Button>
            <hr />
          </Col>
        </Row>
      );
    } else if (this.state.part === 5) {
      part_to_render = (
        <Row>
          <Col>
            Congratulations! You've just run a challenging electrophysiology
            experiment! We can now say that this neuron fires about 20 spikes
            per second, on average, when a beep is played. So, what do you
            think? Is this neuron good at detecting beeps?
            <br />
            <br />
            You might find this question difficult to answer. After all, what
            makes a signal detector <em>good</em>? Intuitively, we want the
            neuron to respond differently when there is a beep to detect and
            when there isn't a beep to detect. If it also fires 20 spikes per
            second when there's no beep to detect, then it's a pretty lousy
            detector. As an analogy, imagine a radiologist that gives the same
            diagnosis regardless of whether there is or is not a tumor in an
            medical image.
            <br />
            <br />
            The way out of this uncertainty is to measure how the neuron
            responds when no beep is played. Let's run a trial of our experiment
            to figure out the firing rate when we don't play a beep. Imagine
            pressing a button that looks the same as your Beep Button, but isn't
            wired up to the speakers.
            <hr />
            <Button
              onClick={e => {
                var value_dict_copy = this.state.value_dict;
                value_dict_copy[6 - 1].noise_count = 1;
                this.setState({ value_dict: value_dict_copy, part: 6 });
              }}
            >
              Collect NoBeep Trial #1
            </Button>
            <hr />
          </Col>
        </Row>
      );
    } else if (this.state.part === 6) {
      part_to_render = (
        <Row>
          <Col>
            6 spikes per second, cool! Like earlier, you might notice that this
            single datapoint doesn't tell us much. Does this neuron always fire
            6 spikes per second in the NoBeep condition? Let's collect a{" "}
            <strong> lot </strong> more data in this condition to get a better
            idea of how this neuron behaves.
            <hr />
            <Button
              onClick={e => {
                var value_dict_copy = this.incrementNoiseCounts(251);
                this.setState({ value_dict: value_dict_copy, part: 7 });
              }}
            >
              {" "}
              Collect NoBeep Trials #2 - #253.
            </Button>
            <hr />
          </Col>
        </Row>
      );
    } else if (this.state.part === 7) {
      part_to_render = (
        <Row>
          <Col>
            As before, let's fit a Gaussian distribution to these data.
            <hr />
            <Button
              onClick={e => {
                this.setState({ show_noise_gaussian: true, part: 8 });
              }}
            >
              {" "}
              Fit that Curve!
            </Button>
            <hr />
          </Col>
        </Row>
      );
    } else if (this.state.part === 8) {
      part_to_render = (
        <Row>
          <Col>
            Now we have the information we need to ask "is this neuron a good
            signal detector"? It certainly looks that way: we can see that the
            neuron fires more on average when the Beep <em>is</em> played than
            when it <em>is not</em> played. But notice it isn't perfect. If the
            neuron fires 15 spikes per second, we can't be sure if there was
            actually a Beep played or not. Engineers have, unsurpringly,
            abandoned these subjective evaluations of "good" and "bad" signal
            detectors with hard numbers. The{" "}
            <strong> sensitivity index </strong>, or d&#39;, is a measure of how
            sensitive a sensor is. If the sensor (our neuron) responds more
            strongly to the signal (our Beep) than when there is no signal, it
            has a high d&#39;. Another important way to think about d&#39; is
            that it measures how well-separated the Signal Present (green) and
            Signal Absent (red) distributions are. One consequence of this
            definition is that if the means of the distributions get farther
            apart, d&#39; will increase.
            <br />
            <br />
            Right now, these distributions correspond to a d' of 3.33. Let's see
            what happens if the means drift farther apart:
            <hr />
            <Button
              onClick={e => {
                var new_value_dict = this.value_options.map(val => {
                  return { x: val, signal_count: 0, noise_count: 0 };
                });

                var gaussian = require("gaussian");
                var signal_distribution = gaussian(24, 9);
                var noise_distribution = gaussian(6, 9);

                for (let i = 0; i < 250; i++) {
                  var signal_sample = Math.floor(
                    signal_distribution.ppf(Math.random())
                  );
                  var noise_sample = Math.floor(
                    noise_distribution.ppf(Math.random())
                  );

                  if (signal_sample < 1) {
                    signal_sample = 1;
                  } else if (signal_sample > 30) {
                    signal_sample = 30;
                  }

                  if (noise_sample < 1) {
                    noise_sample = 1;
                  } else if (noise_sample > 30) {
                    noise_sample = 30;
                  }

                  new_value_dict[signal_sample - 1].signal_count++;
                  new_value_dict[noise_sample - 1].noise_count++;
                }
                this.setState({
                  value_dict: new_value_dict,
                  show_signal_gaussian: false,
                  show_noise_gaussian: false
                });
              }}
            >
              {" "}
              Move those Means!
            </Button>
            <hr />
          </Col>
        </Row>
      );
    }
    return (
      <Container>
        <Row>
          <Col>
            <br />
          </Col>
        </Row>
        {part_to_render}
        <Row>
          <Col>{reset_button}</Col>
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
