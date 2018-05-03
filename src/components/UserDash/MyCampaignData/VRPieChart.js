import React, { Component } from "react";
import PropTypes from "prop-types";
import { withFauxDOM } from "react-faux-dom";
import { pie, arc } from "d3-shape";
import "./piestyle.css";
import { scaleOrdinal } from "d3-scale";
var d3 = require("d3");

class FauxChart extends Component {
  constructor(props) {
    super(props);
    this.state = { dataIndex: 0 };
    this.renderChart = this.renderChart.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }
  componentDidMount() {
    this.renderChart(0);
  }
  componentDidUpdate(prevProps, prevState) {
    // do not compare props.chart as it gets updated in updateD3()
    if (this.props.dataIndex !== prevProps.dataIndex) {
      //   this.setState({ dataIndex: this.props.dataIndex });
      this.updateChart(this.props.dataIndex);
    }
  }
  renderChart(dataIndex) {
    const faux = this.props.connectFauxDOM("div", "chart");
    let { data } = this.props;

    const sortedObj = data.reduce((acc, cur) => {
      if (acc[cur.event_id]) {
        acc[cur.event_id].push(cur);
        return acc;
      }
      acc[cur.event_id] = [cur];
      return acc;
    }, {});

    console.log(`sortedObj`, data);

    const sortedList = Object.keys(sortedObj).map(key => {
      return sortedObj[key];
    });

    console.log(`sortedList`, sortedList);

    let events = [];
    for (let i = 0; i < data.length; i++) {
      let event = data[i].event_id;
      if (events.indexOf(event) === -1) {
        events.push(event);
      }
    }
    console.log(`events`, events);

    let eventData = sortedList[this.props.dataIndex];
    // console.log(`eventData`, eventData);

    const width = 250;
    const height = 250;
    // const padding = 25;

    const colorScale = d3
      .scaleOrdinal()
      .domain(events)
      .range(d3.schemeCategory10);

    const tooltip = d3
      .select("body")
      .append("div")
      .classed("tooltip", true);

    let svgDoc = d3
      .select(faux)
      .append("svg")
      .classed("container", true)
      .attr("height", height)
      .attr("width", width);

    svgDoc
      .append("text")
      .classed("title", true)
      .attr("x", 200)
      .attr("y", 30)
      .text(this.props.title);

    svgDoc
      .append("g")
      .attr("transform", "translate(" + 200 + "," + height / 1.5 + ")")
      .classed("chart", true);

    let arcs = d3
      .pie()
      .value(d => d.vr)
      .sort(function(a, b) {
        if (a.vr < b.vr) return -1;
        else if (a.vr > b.vr) return 1;
        else return a.vr - b.vr;
      })(eventData);

    console.log(`arcs`, arcs);

    let arc = d3
      .arc()
      .outerRadius(width / 2 - 10)
      .innerRadius(width / 8)
      .padAngle(0.01)
      .cornerRadius(7);

    svgDoc
      .select(".chart")
      .selectAll(".arc")
      .data(arcs)
      .enter()
      .append("path")
      .classed("arc", true)
      .attr("fill", d => colorScale(d.data.user_id))
      .on("mousemove", function(d) {
        tooltip
          .style("opacity", 1)
          .style("left", d3.event.x + "px")
          .style("top", d3.event.y + "px")
          .text(`${d.data.first_name} ${d.data.last_name} VR: ${d.data.vr}`);
      })
      .on("mouseout", function() {
        tooltip.style("opacity", 0);
      })
      //   .attr("stroke", "black")
      .attr("d", arc);

    this.props.animateFauxDOM(800);
  }
  updateChart() {
    const faux = this.props.connectFauxDOM("div", "chart");
    let { data } = this.props;

    const sortedObj = data.reduce((acc, cur) => {
      if (acc[cur.event_id]) {
        acc[cur.event_id].push(cur);
        return acc;
      }
      acc[cur.event_id] = [cur];
      return acc;
    }, {});

    console.log(`sortedObj`, data);

    const sortedList = Object.keys(sortedObj).map(key => {
      return sortedObj[key];
    });

    console.log(`sortedList`, sortedList);

    let events = [];
    for (let i = 0; i < data.length; i++) {
      let event = data[i].event_id;
      if (events.indexOf(event) === -1) {
        events.push(event);
      }
    }
    console.log(`events`, events);

    let eventData = sortedList[this.props.dataIndex];
    // console.log(`eventData`, eventData);

    const width = 250;
    const height = 250;

    const tooltip = d3
      .select("body")
      .append("div")
      .classed("tooltip", true);

    const colorScale = d3
      .scaleOrdinal()
      .domain(events)
      .range(d3.schemeCategory10);

    let svgDoc = d3.select(".container");

    let arcs = d3
      .pie()
      .value(d => d.vr)
      .sort(function(a, b) {
        if (a.vr < b.vr) return -1;
        else if (a.vr > b.vr) return 1;
        else return a.vr - b.vr;
      })(eventData);

    console.log(`arcs`, arcs);

    let arc = d3
      .arc()
      .outerRadius(width / 2 - 10)
      .innerRadius(width / 8)
      .padAngle(0.01)
      .cornerRadius(7);

    let update = d3
      .select(".chart")
      .selectAll(".arc")
      .data(arcs);

    update.exit().remove();

    update
      .enter()
      .append("path")
      .classed("arc", true)
      .merge(update)
      .attr("fill", d => colorScale(d.data.user_id))
      .attr("d", arc)
      .on("mousemove", function(d) {
        tooltip
          .style("opacity", 1)
          .style("left", d3.event.x + "px")
          .style("top", d3.event.y + "px")
          .text(`${d.data.first_name} ${d.data.last_name} VR: ${d.data.vr}`);
      })
      .on("mouseout", function() {
        tooltip.style("opacity", 0);
      });
    this.props.animateFauxDOM(800);
  }

  render() {
    console.log(this.props);
    console.log(`chart`, this.props.chart);
    return <div>{this.props.chart}</div>;
  }
}

FauxChart.defaultProps = {
  chart: "loading..."
};

FauxChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  dataIndex: PropTypes.number.isRequired
};

const PieChart = withFauxDOM(FauxChart);

export default PieChart;
