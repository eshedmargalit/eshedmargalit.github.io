import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import gaussian from "gaussian";

import DemoChart from "./DemoChart.js";

class CalcDemo extends Component {
  constructor(props) {
    super(props);
    this.value_options = [];

    for (let i = 1; i <= 30; i++) {
      this.value_options.push(i);
    }
    var blank_value_dict = this.value_options.map(val => {
      return { x: val, signal_count: 0, noise_count: 0 };
    });

    this.chartHeight = 400;

    this.state = {
      value_dict: blank_value_dict,
      show_signal_gaussian: false,
      show_noise_gaussian: false,
      show_signal_counts: true,
      show_noise_counts: true,
      show_dprime: false,
      signal_mean: 20,
      noise_mean: 11,
      signal_variance: 16,
      noise_variance: 16,
      part: 0
    };
  }

  componentDidMount() {
    var blank_value_dict = this.getBlankValueDict();
    this.setState({
      value_dict: blank_value_dict
    });
  }

  getBlankValueDict() {
    var value_dict = this.value_options.map(val => {
      return { x: val, signal_count: 0, noise_count: 0 };
    });
    return value_dict;
  }

  incrementSignalCounts(n) {
    var value_dict_copy = this.state.value_dict;
    var signal_distribution = gaussian(
      this.state.signal_mean,
      this.state.signal_variance
    );
    var min = Math.min(...this.value_options);
    var max = Math.max(...this.value_options);

    for (let i = 0; i < n; i++) {
      var sample = Math.floor(signal_distribution.ppf(Math.random()));

      if (sample < min) {
        sample = min;
      } else if (sample > max) {
        sample = max;
      }
      value_dict_copy[sample - 1].signal_count++;
    }

    return value_dict_copy;
  }

  incrementNoiseCounts(n) {
    var value_dict_copy = this.state.value_dict;
    var noise_distribution = gaussian(
      this.state.noise_mean,
      this.state.noise_variance
    );
    var min = Math.min(...this.value_options);
    var max = Math.max(...this.value_options);

    for (let i = 0; i < n; i++) {
      var sample = Math.floor(noise_distribution.ppf(Math.random()));

      if (sample < min) {
        sample = min;
      } else if (sample > max) {
        sample = max;
      }
      value_dict_copy[sample - 1].noise_count++;
    }

    return value_dict_copy;
  }

  renderInstructions() {
    const reset_button = (
      <Button
        color="danger"
        onClick={e => {
          const blank_value_dict = this.getBlankValueDict();
          this.setState({
            value_dict: blank_value_dict,
            show_signal_gaussian: false,
            show_noise_gaussian: false,
            show_signal_counts: true,
            show_noise_counts: true,
            show_dprime: false,
            signal_mean: 20,
            noise_mean: 11,
            part: 1
          });
        }}
      >
        {" "}
        Reset the Story{" "}
      </Button>
    );

    let part_to_render;
    if (this.state.part === 0) {
      part_to_render = (
        <Row>
          <Col>
            Imagine you have the good fortune to be a neuroscientist studying
            the auditory system. Your goal for the day is to{" "}
            <strong>test a hypothesis</strong>: that neurons in a given brain
            area can detect a beep being played over a loudspeaker. You prepare
            for the experiment by positioning a recording electrode next to a
            single neuron, so that you can measure how fast the neuron is firing
            (in units of spikes per second) at any given moment. How can we now
            test our hypothesis?
            <hr />
            <Button
              onClick={e => {
                this.setState({ part: 1 });
              }}
            >
              Let's get started!
            </Button>
            <hr />
          </Col>
        </Row>
      );
    } else if (this.state.part === 1) {
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
                this.setState({
                  show_noise_gaussian: true,
                  show_dprime: true,
                  part: 8
                });
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
            neuron fires 18 spikes per second, we can't be too sure if there was
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
            Right now, these distributions correspond to a d' of 2.25. Let's see
            what happens if the means drift farther apart:
            <hr />
            <Button
              onClick={e => {
                var new_value_dict = this.getBlankValueDict();

                var signal_distribution = gaussian(24, 16);
                var noise_distribution = gaussian(6, 16);
                var min = Math.min(...this.value_options);
                var max = Math.max(...this.value_options);

                for (let i = 0; i < 250; i++) {
                  var signal_sample = Math.floor(
                    signal_distribution.ppf(Math.random())
                  );
                  var noise_sample = Math.floor(
                    noise_distribution.ppf(Math.random())
                  );

                  if (signal_sample < min) {
                    signal_sample = min;
                  } else if (signal_sample > max) {
                    signal_sample = max;
                  }

                  if (noise_sample < min) {
                    noise_sample = min;
                  } else if (noise_sample > max) {
                    noise_sample = max;
                  }

                  new_value_dict[signal_sample - 1].signal_count++;
                  new_value_dict[noise_sample - 1].noise_count++;
                }
                this.setState({
                  value_dict: new_value_dict,
                  signal_mean: 24,
                  noise_mean: 6,
                  part: 9
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
    } else if (this.state.part === 9) {
      part_to_render = (
        <Row>
          <Col>
            We see that if the means are more widely separated, d' goes up!
            Notice that now if the neuron fires 18 spikes per second, we can be
            much more confident a Beep was actually played.
            <br />
            <br />
            d' is also sensitive to the <em>variance</em> of the distribution,
            or how reliable the neuron is. If our neuron becomes less reliable
            from trial-to-trial, then the distribution of firing rates when the
            beep is played or is not played will come closer together, reducing
            d'. Let's see what that looks like:
            <hr />
            <Button
              onClick={e => {
                var new_value_dict = this.getBlankValueDict();

                var signal_distribution = gaussian(20, 49);
                var noise_distribution = gaussian(11, 49);
                var min = Math.min(...this.value_options);
                var max = Math.max(...this.value_options);

                for (let i = 0; i < 250; i++) {
                  var signal_sample = Math.floor(
                    signal_distribution.ppf(Math.random())
                  );
                  var noise_sample = Math.floor(
                    noise_distribution.ppf(Math.random())
                  );

                  if (signal_sample < min) {
                    signal_sample = min;
                  } else if (signal_sample > max) {
                    signal_sample = max;
                  }

                  if (noise_sample < min) {
                    noise_sample = min;
                  } else if (noise_sample > max) {
                    noise_sample = max;
                  }

                  new_value_dict[signal_sample - 1].signal_count++;
                  new_value_dict[noise_sample - 1].noise_count++;
                }
                this.setState({
                  value_dict: new_value_dict,
                  signal_variance: 49,
                  noise_variance: 49,
                  part: 10
                });
              }}
            >
              {" "}
              Decrease Neuron Reliability
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
      var signal_distribution = gaussian(
        this.state.signal_mean,
        this.state.signal_variance
      );
      for (let i = 0; i < data.length; i++) {
        data[i].signal_gaussian_value = signal_distribution.pdf(valdict[i].x);
      }
    }

    if (this.state.show_noise_gaussian) {
      var noise_distribution = gaussian(
        this.state.noise_mean,
        this.state.noise_variance
      );
      for (let i = 0; i < data.length; i++) {
        data[i].noise_gaussian_value = noise_distribution.pdf(valdict[i].x);
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
    let dp_render = null;
    if (this.state.show_dprime) {
      var dp =
        (this.state.signal_mean - this.state.noise_mean) /
        Math.sqrt(
          0.5 * (this.state.signal_variance + this.state.noise_variance)
        );
      dp_render = <h4>d': {dp}</h4>;
    }
    return (
      <Container>
        <Row>
          <Col xs="6" lg="6">
            <br />
            <br />
            <br />
            <DemoChart data={this.constructData()} height={this.chartHeight} />
            <br />
            {dp_render}
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
