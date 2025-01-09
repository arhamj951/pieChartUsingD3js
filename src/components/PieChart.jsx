import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === "all") sum += 0;
    else sum += arr[i].value;
  }
  return sum;
}

const PieChart = () => {
  const thisElementRef = useRef(null);
  const radius = 300;
  const widthAndHeight = radius * 2;

  const [data, setData] = useState([
    { name: "ios", value: 35 },
    { name: "windows", value: 55 },
    { name: "linux", value: 5 },
    { name: "all", value: 100 },
  ]);

  useEffect(() => {
    const svg = d3.select(thisElementRef.current);

    const color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    const pie = d3.pie().value((d) => {
      if (d.name === "all") return d.value - calculateSum(data);
      else return d.value;
    });
    const processedData = pie(data);

    const arcs = d3.arc().innerRadius(0).outerRadius(radius).padAngle(0);

    svg
      .selectAll(".mySlices")
      .data(processedData)
      .enter()
      .append("path")
      .attr("class", ".mySlices")
      .attr("d", arcs)
      .attr("fill", (_, i) => color[i])
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("opacity", 0.5)
      .attr("transform", `translate(${radius},${radius}) `);

    svg
      .selectAll(".mySlices")
      .data(processedData)
      .enter()
      .append("text")
      .text((d) => d.data.name)
      .attr("text-anchor", "middle")
      .attr("font-size", 17)
      .attr(
        "transform",
        (d) => `translate(${arcs.centroid(d)}) translate(${radius},${radius}) `
      );

    // console.log(arcs);
  }, [data]);

  console.log(calculateSum(data));
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Pie Chart "market share of operating systems" </h2>
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto" }}
        ref={thisElementRef}
        // height={widthAndHeight}
        // width={widthAndHeight}
      />
    </div>
  );
};

export default PieChart;
