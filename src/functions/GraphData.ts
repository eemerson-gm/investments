import { ChartData } from "chart.js";
import moment from "moment";

const investmentColors = [
  "red",
  "orange",
  "olive",
  "slateblue",
  "skyblue",
  "slategrey",
  "teal",
  "maroon",
  "royalblue",
];

interface GraphData {
  label: string;
  data: number[];
}

const getLineData = (length: number, graphData: GraphData[]) =>
  ({
    labels: Array.from({ length }, (_, index) =>
      moment().add(index, "M").format("MMM YYYY")
    ),
    datasets: [...graphData].flat().map((dataset, index) => ({
      ...dataset,
      borderColor: investmentColors[index % investmentColors.length],
      backgroundColor: investmentColors[index % investmentColors.length],
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  } as ChartData<"line">);

const getGraphData = (
  label: string,
  length: number,
  filter: (index: number) => number
): GraphData => ({
  label: label,
  data: Array.from({ length }, (_, index) => filter(index)),
});

export { getGraphData, getLineData };
