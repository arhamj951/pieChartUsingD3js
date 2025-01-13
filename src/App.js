import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import PieChart from "./components/PieChart";
import ProgressionCircle from "./components/BarChartSaga/ProgressionCircle";
import BarChart from "./components/BarChartSaga/BarChartSaga";

// function App() {
//   return (
//     <div className="App">
//       <PieChart />
//       {/* Add your data fetching and manipulation logic here */}
//       {/* Example: const [data, setData] = useState([]) */}
//       {/* useEffect(() => {
//       fetchData().then((data) => setData(data));
//     }, []); */}
//       {/* Example: const pieChartRef = useRef(null); */}
//       {/* useEffect(() => {
//       const pieChart = pieChartRef.current;
//       if (pieChart) {
//         // Render the pie chart using D3
//       }
//     }, [data]); */}
//       {/* Example: const handleClick = (event) => {
//       const pieChart = pieChartRef.current;
//       if (pieChart) {
//         // Handle the click event on the pie chart
//       }
//     }; */}
//       {/* Example: <div ref={pieChartRef} className="pie-chart" onClick={handleClick} /> */}
//     </div>
//   );
// }

// export default App;

function App() {
  const [ifClicked, setIfClicked] = useState(false);
  const [cdData, setCdData] = useState([]);
  const [color, setColor] = useState("");
  const [sum, setSum] = useState(0);

  console.log(cdData);
  return (
    <div className="App">
      {!ifClicked && (
        <BarChart
          setIfClicked={setIfClicked}
          setCdData={setCdData}
          setColor={setColor}
          setSum={setSum}
        />
      )}
      {ifClicked && (
        <ProgressionCircle
          cdData={cdData}
          setIfClicked={setIfClicked}
          color={color}
          sum={sum}
        />
      )}
    </div>
  );
}

export default App;
