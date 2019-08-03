import React, { Component } from "react";
import { Container } from "reactstrap";
import { AreaChart, Area, Legend, Tooltip, XAxis, YAxis } from "recharts";

class Chart extends Component {
  getData() {
    var data = [];
    for (var i = 0; i < 100; i++) {
      var signal = this.signal_gaussian(i);
      var noise = this.noise_gaussian(i);
      var el = {
        x: i,
        noise: noise,
        signal: signal
      };
      data.push(el);
    }

    data.sort(function(x, y) {
      return x.i - y.i;
    });

    return data;
  }

  signal_gaussian(x) {
    var gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
    x = (x - this.props.signal_mean) / this.props.signal_sigma;
    return (
      (gaussianConstant * Math.exp(-0.5 * x * x)) / this.props.signal_sigma
    );
  }

  noise_gaussian(x) {
    var gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
    x = (x - this.props.noise_mean) / this.props.noise_sigma;
    return (gaussianConstant * Math.exp(-0.5 * x * x)) / this.props.noise_sigma;
  }

  render() {
    return (
      <Container>
        <div>
          <AreaChart
            width={600}
            height={300}
            data={this.getData()}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <XAxis dataKey="x" />
            <YAxis />
            <Area
              name="signal"
              type="monotone"
              dataKey="signal"
              stroke={this.props.signal_color}
              fill={this.props.signal_color}
            />
            <Area
              name="noise"
              type="monotone"
              dataKey="noise"
              stroke={this.props.noise_color}
              fill={this.props.noise_color}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
          </AreaChart>
        </div>
      </Container>
    );
  }
}

export default Chart;
