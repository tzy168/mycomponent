import React, { useState } from "react";
import "./App.css";
import SideBar from "./test_component/sideBar";
import ReSizeBox from "./test_component/ReSizeBox";
import MyChart from "./Charts/index";
import ResizeableContainer from "./test_component/ReSizeDiv";
// import { Resizable } from "re-resizable";

const App: React.FC = () => {
  const [chartType, setCharttype] = useState<string>("pie");
  const [boxInfo, setBoxInfo] = useState({
    width: 100,
    height: 100,
    background: "red",
  });

  const changeBoxInfo = (info: {
    width: number;
    height: number;
    background: string;
  }) => {
    setBoxInfo({
      ...info,
    });
  };

  // 定义一个函数，用于根据传入的参数动态设置图表类型
  const setChartType = (type: string) => {
    setCharttype(type);
  };
  return (
    <div className="main-container">
      {/* 传递正确类型的 onchange 函数 */}
      <SideBar onchange={changeBoxInfo} onChartTypeChange={setChartType} />

      <div className="App">
        <button onClick={() => setChartType("pie")}>PieChart</button>
        <button onClick={() => setChartType("radar")}>RadarChart</button>
        <h2>Draggable List with React DnD</h2>
        {/* 拖拽组件 */}
        {/* <Container /> */}
        {/* 修改单个组件 */}
        <ReSizeBox info={boxInfo} />
        {/* 图表 */}
        {/* <div className="charts"></div> */}
        {/* ResizeDiv */}{" "}
        <div style={{ display: "flex" }}>
          <ResizeableContainer>
            <MyChart type={chartType} />
          </ResizeableContainer>{" "}
          <ResizeableContainer>
            <MyChart type={chartType} />
          </ResizeableContainer>
        </div>
      </div>
    </div>
  );
};

export default App;
