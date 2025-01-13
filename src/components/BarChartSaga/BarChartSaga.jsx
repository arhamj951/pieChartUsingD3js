import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "../../App.css";

const dataFromDB = {
  ticketBargraphData: {
    stages: ["not_started", "in_progress", "done", "others"],
    ticketCount: [5, 2, 1, 2],
    __typename: "BarGraphData",
  },
};

const formatString = (str) => {
  return str.replace(/_/g, " ").toLowerCase();
};

function formatData(dataFromDB) {
  const { stages, ticketCount } = dataFromDB.ticketBargraphData;

  const formattedData = stages.map((stage, index) => ({
    name: formatString(stage),
    value: ticketCount[index],
  }));

  return formattedData;
}

const BarChart = ({ setCdData, setIfClicked, setColor, setSum }) => {
  const chartRef = useRef();
  const formattedData = formatData(dataFromDB);
  const [data, setData] = useState(formattedData);

  const onClickHandler = (event, d) => {
    const color = window.getComputedStyle(event.target).fill;
    console.log(color);
    setColor(color);
    setCdData([
      {
        name: "progression",
        value: d.value,
      },
      { name: "remainingSum", value: d3.sum(data, (d) => d.value) - d.value },
    ]);
    setIfClicked(true);
  };

  useEffect(() => {
    const margin = { top: 70, right: 40, bottom: 60, left: 175 };
    const width = 860 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    data.sort((a, b) => d3.ascending(a.value, b.value));

    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, d3.max(data, (d) => d.value)]);

    const y = d3
      .scaleBand()
      .range([height, 0])
      .padding(0.1)
      .domain(data.map((d) => d.name));

    const xAxis = d3.axisBottom(x).ticks(0).tickSize(0);
    const yAxis = d3.axisLeft(y).tickSize(0).tickPadding(10);

    // console.log(d3.sum(data, (d) => d.value));
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", (d) => y(d.name))
      .attr("height", y.bandwidth() - 50)
      .attr("x", 0)
      .attr("width", (d) => x(d.value))
      .attr("fill", (_, i) => color[i])
      .on("click", (event, d) => {
        onClickHandler(event, d);
      });

    svg
      .append("g")
      .attr("class", "x axis")
      .style("font-size", "10px")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("class", "y axis")
      .style("font-size", "12px")
      .attr("transform", `translate(0,${y.bandwidth() / 2 - 75})`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove());

    svg.selectAll(".y.axis .tick text").text((d) => d.toUpperCase());

    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.value) - 20)
      .attr("y", (d) => y(d.name) + y.bandwidth() / 2 - 25)
      .attr("dy", ".35em")
      .style("font-family", "sans-serif")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .style("fill", "#F3F6F4")
      .text((d) => d.value);

    svg
      .append("text")
      .attr(
        "transform",
        `translate(${width / 2},${height + margin.bottom / 2})`
      )
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "black")
      .style("font-family", "sans-serif")
      .attr("dy", "1em")
      .text("Task Progression");

    svg
      .append("text")
      .attr("x", margin.left - 335)
      .attr("y", margin.top - 110)
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("font-family", "sans-serif")
      .text("Bar Chart");

    setSum(d3.sum(data, (d) => d.value));
  }, []);

  return (
    <div>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default BarChart;
