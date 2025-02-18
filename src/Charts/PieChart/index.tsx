import { useRef, useEffect } from "react";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  LegendComponent,
  AriaComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { EChartsOption } from "echarts";
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  AriaComponent,
]);

const MyPieChart = (props: any) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChart = () => {
      if (chartRef.current) {
        const myChart = echarts.init(chartRef.current);
        const option: EChartsOption = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "0%",
            left: "center",
          },
          grid: {
            containLabel: true,
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["0%", "60%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 20,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 10, name: "Search Engine" },
                { value: 20, name: "Direct" },
                { value: 10, name: "Email" },
                { value: 20, name: "Union Ads" },
                { value: 40, name: "Video Ads" },
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

export default MyPieChart;
