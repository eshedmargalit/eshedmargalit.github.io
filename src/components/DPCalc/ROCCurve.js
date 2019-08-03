import React, { Component } from "react";
import { Line, Label, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

class ROCCurve extends Component {
  render() {
    return (
      <LineChart
        width={this.props.size}
        height={this.props.size}
        data={this.props.roc_data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis domain={[0, 1]} type="number" dataKey="false_positives">
          <Label value="False Positives" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: "Hits", angle: -90, position: "insideLeft" }} />
        <Line
          type="monotone"
          dataKey="hits"
          dot={false}
          stroke="#d47006"
          strokeWidth={4}
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
