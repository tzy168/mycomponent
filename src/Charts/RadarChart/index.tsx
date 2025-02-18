import { useRef, useEffect } from "react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { RadarChart, RadarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | LegendComponentOption | RadarSeriesOption
>;
const MyRadarChart = (props: any) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initChart = () => {
      if (chartRef.current) {
        const myChart = echarts.init(chartRef.current);
        const option: EChartsOption = {
          legend: {
            data: ["Allocated Budget", "Actual Spending"],
          },
          alignTicks: false,
          grid: {
            containLabel: true,
            top: "10%",
            left: "10%",
            right: "10%",
            bottom: "10%",
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: "Sales", max: 1000 },
              { name: "Administration", max: 1000 },
              { name: "Information Technology", max: 1000 },
              { name: "Customer Support", max: 1000 },
              { name: "Development", max: 1000 },
              { name: "Marketing", max: 1000 },
            ],
            alignTicks: false,
            axisLabel: {
              formatter: (value: any) => {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 以逗号分隔数值
              },
            },
          },
          series: [
            {
              name: "Budget vs spending",
              type: "radar",
              data: [
                {
                  value: [420, 300, 200, 350, 500, 800],
                  name: "Allocated Budget",
                },
                {
                  value: [500, 140, 280, 260, 420, 210],
                  name: "Actual Spending",
                },
              ],
            },
          ],
        };
        option && myChart.setOption(option);

        // 使用 ResizeObserver 监听容器大小变化
        const resizeObserver = new ResizeObserver(() => {
          myChart.resize(); // 当容器大小变化时，调整图表大小
        });

        resizeObserver.observe(chartRef.current); // 开始观察 chartRef 当前容器的尺寸

        // 清理 ResizeObserver
        return () => {
          resizeObserver.disconnect();
          myChart.dispose();
        };
      }
    };

    if (document.readyState === "complete") {
      initChart();
    } else {
      window.addEventListener("load", initChart);
      return () => {
        window.removeEventListener("load", initChart);
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default MyRadarChart;
