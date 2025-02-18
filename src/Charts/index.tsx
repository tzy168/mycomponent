import MyPieChart from "./PieChart";
import MyRadarChart from "./RadarChart";

interface Props {
  type: string;
}

const MyChart = ({ type }: Props) => {
  switch (type) {
    case "pie":
      return <MyPieChart />;
    case "radar":
      return <MyRadarChart />;
    default:
      return null;
  }
};
export default MyChart;
