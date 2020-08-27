import React, { Component } from "react";
import {
  ReferenceLine,
  Line,
  Label,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

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
          <Label value="False Alarms" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: "Hits", angle: -90, position: "insideLeft" }} />
        <ReferenceLine
          y={this.props.hit_rate}
          stroke={this.props.signal_color}
          strokeWidth={2}
          strokeOpacity={0.4}
        />
        <ReferenceLine
          x={this.props.fp_rate}
          stroke={this.props.noise_color}
          strokeWidth={2}
          strokeOpacity={0.4}
        />
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
          stroke="#bbb"
          strokeWidth={3}
        />
      </LineChart>
    );
  }
}

export default ROCCurve;
