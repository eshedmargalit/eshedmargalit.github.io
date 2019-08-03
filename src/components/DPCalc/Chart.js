import React, { Component } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine,
  Label,
  Legend,
  XAxis,
  YAxis
} from "recharts";

class Chart extends Component {
  getData() {
    var data = [];
    for (var i = 0; i < 30; i++) {
      var signal = this.signal_gaussian(i);
      var noise = this.noise_gaussian(i);
      var el = {
        x: i,
        noise: noise,
        signal: signal
      };
      data.push(el);
    }

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
    const xticks = [0, 5, 10, 15, 20, 25, 30];
    return (
      <ResponsiveContainer width="100%" height={this.props.height}>
        <AreaChart data={this.getData()}>
          <XAxis dataKey="x" ticks={xticks}>
            <Label value="x" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[0, 0.2]}
            label={{ value: "P(x)", angle: -90, position: "insideLeft" }}
          />
          <Area
            name="Signal Distribution"
            type="monotone"
            dataKey="signal"
            stroke={this.props.signal_color}
            fill={this.props.signal_color}
          />
          <ReferenceLine
            x={this.props.signal_mean}
            stroke={this.props.signal_color}
            strokeOpacity={0.2}
          />
          <Area
            name="Noise Distribution"
            type="monotone"
            dataKey="noise"
            stroke={this.props.noise_color}
            fill={this.props.noise_color}
          />
          <ReferenceLine
            x={this.props.noise_mean}
            stroke={this.props.noise_color}
            strokeOpacity={0.2}
          />
          <ReferenceLine
            x={this.props.criterion}
            stroke="black"
            strokeOpacity={1}
          />
          <Legend verticalAlign="top" height={36} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default Chart;
