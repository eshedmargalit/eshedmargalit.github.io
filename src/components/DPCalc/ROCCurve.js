import React, { Component } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { erf } from "mathjs";

class ROCCurve extends Component {
  cdfNormal(x, mean, standardDeviation) {
    return (1 - erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2;
  }

  getData() {
    var data = [];
    for (var criterion = 0; criterion < 30; criterion++) {
      var hits =
        1 -
        this.cdfNormal(
          criterion,
          this.props.signal_mean,
          this.props.signal_sigma
        );
      var false_positives =
        1 -
        this.cdfNormal(
          criterion,
          this.props.noise_mean,
          this.props.noise_sigma
        );
      var el = {
        false_positives: false_positives,
        hits: hits
      };
      data.push(el);
    }

    data.sort((a, b) => {
      return a.false_positives - b.false_positives;
    });

    return data;
  }

  render() {
    return (
      <LineChart
        width={this.props.size}
        height={this.props.size}
        data={this.getData()}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis domain={[0, 1]} type="number" dataKey="false_positives" />
        <YAxis />
        <Line
          type="monotone"
          dataKey="hits"
          dot={false}
          stroke="#8884d8"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="false_positives"
          dot={false}
          stroke="#888"
          strokeWidth={3}
        />
      </LineChart>
    );
  }
}

export default ROCCurve;
