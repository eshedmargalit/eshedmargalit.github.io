import React, { Component } from "react";
import { Container } from "reactstrap";

import * as d3 from "d3";

class Chart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    d3.select("#chart")
      .selectAll("*")
      .remove();
    this.drawChart();
  }

  drawChart() {
    const width = 1000;
    const height = 500;
    const data = this.getData();
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height * (2 / 3), 6]);
    var line = d3
      .line()
      .x(function(d) {
        return x(d.q);
      })
      .y(function(d) {
        return y(d.p);
      });
    var area = d3
      .area()
      .x(function(d) {
        return x(d.q);
      })
      .y0(0)
      .y1(function(d) {
        return y(d.p);
      });

    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    x.domain(
      d3.extent(data, function(d) {
        return d.q;
      })
    );

    y.domain(
      d3.extent(data, function(d) {
        return d.p;
      })
    );

    svg
      .append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  }

  getData() {
    var data = [];
    for (var i = 0; i < 1000; i++) {
      var q = this.normal(); // calc random draw from normal dist
      var p = this.gaussian(q); // calc prob of rand draw
      var el = {
        q: q,
        p: p
      };
      data.push(el);
    }

    data.sort(function(x, y) {
      return x.q - y.q;
    });

    return data;
  }
  normal() {
    var x = 0;
    var y = 0;
    var rds, c;
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      rds = x * x + y * y;
    } while (rds == 0 || rds > 1);
    c = Math.sqrt((-2 * Math.log(rds)) / rds); // Box-Muller transform
    return Math.abs(x * c) > 3 ? this.normal() : x * c; // throw away extra sample y * c
  }

  gaussian(x) {
    var gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
    x = (x - this.props.mean) / this.props.sigma;
    return (gaussianConstant * Math.exp(-0.5 * x * x)) / this.props.sigma;
  }

  render() {
    return (
      <Container>
        <div id="chart"></div>
      </Container>
    );
  }
}

export default Chart;
