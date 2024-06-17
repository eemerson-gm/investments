import { Chart, ChartData, Point } from "chart.js";
import { Line } from "react-chartjs-2";
import { JSXComponentProps } from "../Types";

interface GridProps {
  data: ChartData<"line", (number | Point | null)[], unknown>;
  labelSize: number;
  scaleSize: number;
  gridColor: string;
  gridSize: number;
}

Chart.defaults.color = "white";

const Grid: JSXComponentProps<GridProps> = ({
  data,
  labelSize,
  scaleSize,
  gridColor,
  gridSize,
}) => (
  <Line
    data={data}
    options={{
      font: {
        family: "Roboto",
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: labelSize,
              family: "Roboto",
            },
            usePointStyle: true,
          },
        },
        tooltip: {
          callbacks: {
            label: (item) => {
              console.log(item.formattedValue);
              return `$${Number(
                item.formattedValue.replaceAll(",", "")
              ).toFixed(2)}`;
            },
          },
          usePointStyle: true,
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: scaleSize,
            },
          },
          grid: {
            color: gridColor,
            lineWidth: gridSize,
          },
        },
        y: {
          ticks: {
            callback: (item) => `$${item}`,
            font: {
              size: scaleSize,
            },
          },
          grid: {
            color: gridColor,
            lineWidth: gridSize,
          },
        },
      },
    }}
  />
);

export { Grid };
