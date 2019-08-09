import React, { Component } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Area,
  ComposedChart,
  Bar,
  Label,
  XAxis,
  YAxis
} from "recharts";

class DemoChart extends Component {
  render() {
    const xticks = [5, 10, 15, 20, 25];
    const signal_color = "#0d5e08";
    const noise_color = "#960f0f";
    return (
      <ResponsiveContainer width="100%" height={this.props.height}>
        <ComposedChart data={this.props.data}>
          <XAxis dataKey="x" ticks={xticks}>
            <Label value="Firing Rate" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis
            yAxisId="left"
            label={{
              value: "Counts",
              angle: -90,
              position: "insideLeft"
            }}
          />
          <YAxis yAxisId="right" orientation="right" />
          <CartesianGrid stroke="#f5f5f5" />
          <Area
            dataKey="signal_gaussian_value"
            type="monotone"
            fill={signal_color}
            stroke={signal_color}
            yAxisId="right"
          />
          <Bar
            yAxisId="left"
            dataKey="signal_count"
            barSize={50}
            fill={signal_color}
            stroke={signal_color}
          />

          <Area
            dataKey="noise_gaussian_value"
            type="monotone"
            fill={noise_color}
            stroke={noise_color}
            yAxisId="right"
          />
          <Bar
            yAxisId="left"
            dataKey="noise_count"
            barSize={50}
            fill={noise_color}
            stroke={noise_color}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

export default DemoChart;
