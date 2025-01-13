import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function calculateSum(arr) {
  return arr.reduce(
    (sum, item) => (item.name === "all" ? sum : sum + item.value),
    0
  );
}

const calculatePercentage = (total, value) => {
  if (total === 0) return 0;
  return (value / total) * 100;
};
const ProgressionCircle = ({ cdData, setIfClicked, color, sum }) => {
  const thisElementRef = useRef(null);
  const radius = 150;

  const data = cdData;

  const onClickHandler = () => {
    setIfClicked(false);
  };

  useEffect(() => {
    const svg = d3.select(thisElementRef.current);

    const pie = d3
      .pie()
      // .startAngle(Math.PI / 4)
      // .endAngle(Math.PI * 2 + Math.PI / 2)
      .value((d) => d.value);

    const processedData = pie(data);

    console.log("Processed Data with Angles:", processedData);

    const arcs = d3
      .arc()
      .innerRadius(radius - 40)
      .outerRadius(radius)
      .padAngle(0.02);

    svg
      .selectAll(".mySlices")
      .data(processedData)
      .enter()
      .append("path")
      .attr("class", "mySlices")
      .attr("d", arcs)
      .attr("fill", (d) => (d.data.name === "remainingSum" ? "#BCBCBC" : color))
      .attr("opacity", 1)
      .attr("cursor", "pointer")
      .attr("transform", `translate(${radius},${radius})`);

    svg
      .append("text")
      .attr("x", radius)
      .attr("y", radius)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "20px")
      .style("fill", "black")
      .text(`progression: ${calculatePercentage(sum, data[0].value)}% `);

    console.log(data);
  }, [data]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button style={{ marginRight: "30px" }} onClick={onClickHandler}>
        &lt;
      </button>
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "40%", height: "auto" }}
        ref={thisElementRef}
      />
    </div>
  );
};

export default ProgressionCircle;
