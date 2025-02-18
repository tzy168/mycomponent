import "./index.css";
import { lazy } from "react";
const MyPieChart = lazy(() => import("../../Charts/PieChart"));
const MyRadarChart = lazy(() => import("../../Charts/RadarChart"));

interface SideBarProps {
  // 修正属性名拼写错误
  onchange: (info: {
    width: number;
    height: number;
    background: string;
  }) => void;
  // 修正属性名拼写错误
  onChartTypeChange: (chartType: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onchange, onChartTypeChange }) => {
  // 模拟触发 onchange 事件
  const handleChange = (color: string) => {
    const newInfo = {
      width: 100,
      height: 100,
      background: color,
    };
    onchange(newInfo);
  };

  const color = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "black",
  ];

  const chartType = [{ type: "pie" }, { type: "radar" }];
  const handleChartTypeChange = (chartType: string) => {
    onChartTypeChange(chartType);
  };
  return (
    <div className="side-bar">
      <h2>SideBar</h2>
      {color.map((item, index) => (
        <button key={index} onClick={() => handleChange(item)}>
          {item}
        </button>
      ))}
      {chartType.map((item, index) => (
        <button key={index} onClick={() => handleChartTypeChange(item?.type)}>
          {item.type}
        </button>
      ))}
    </div>
  );
};

export default SideBar;
