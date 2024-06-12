import { ChartData } from "chart.js";
import { FieldArray, Form, Formik } from "formik";
import moment from "moment";
import { useMemo, useState } from "react";
import { caulcuateInvestment } from "./functions/Investments";
import {
  FieldOption,
  formComponents,
} from "./components/dashboard/FieldOption";
import { FlexCard } from "./components/dashboard/FlexCard";
import colors from "tailwindcss/colors";
import { Grid } from "./components/dashboard/Grid";
import { Input } from "./components/dashboard/Input";
import { Tag } from "./components/dashboard/Tag";
import { last } from "lodash";

interface Investment {
  type: keyof typeof formComponents;
  name?: string;
  amount?: number;
  percent?: number;
}

interface SaveData {
  base: number;
  months: number;
  investments: Investment[];
}

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

const defaultFormData = {
  type: "investment",
  name: "",
  amount: 100,
  add: 0,
  percent: 5,
} as Investment;

const App = () => {
  const saveData = JSON.parse(
    localStorage.getItem("saveData") || "{}"
  ) as SaveData;

  const [formData, setFormData] = useState<SaveData>(
    Object.keys(saveData).length > 0
      ? saveData
      : {
          base: 0,
          months: 12,
          investments: [defaultFormData],
        }
  );

  const monthsLength = Number(formData.months + 1);

  const formGraphData = useMemo(
    () =>
      formData.investments.map((investment, index) => ({
        label: `${investment.name || index}`,
        data: Array.from({ length: monthsLength }, (_, index) =>
          caulcuateInvestment(index, investment)
        ),
      })),
    [formData.investments, monthsLength]
  );

  const investmentGraphData = useMemo(
    () => ({
      label: "Total",
      data: Array.from({ length: monthsLength }, (_, index) =>
        formGraphData
          .filter(
            (_, index) => formData.investments[index].type === "investment"
          )
          .reduce((acc, value) => acc + value.data[index], 0)
      ),
    }),
    [formData.investments, formGraphData, monthsLength]
  );

  const lineData = useMemo(
    () =>
      ({
        labels: Array.from({ length: monthsLength }, (_, index) =>
          moment().add(index, "M").format("MMM YYYY")
        ),
        datasets: [...formGraphData, investmentGraphData].map(
          (dataset, index) => ({
            ...dataset,
            borderColor: investmentColors[index % investmentColors.length],
            backgroundColor: investmentColors[index % investmentColors.length],
            pointRadius: 4,
            pointHoverRadius: 6,
          })
        ),
      } as ChartData<"line">),
    [formGraphData, investmentGraphData, monthsLength]
  );

  const handleSubmit = (data: any) => {
    console.log(data);
    localStorage.setItem("saveData", JSON.stringify(data));
    setFormData(data);
  };

  return (
    <div className="App">
      <div className="flex flex-col justify-center items-center">
        <div className="w-[1000px]">
          <FlexCard className="flex-col justify-center items-center">
            <span className="text-lg">Total Earnings</span>
            <Grid
              data={lineData}
              labelSize={14}
              scaleSize={14}
              gridColor={colors.gray["500"]}
              gridSize={2}
            />
          </FlexCard>
          <FlexCard className="gap-2">
            {lineData.datasets.map((data) => (
              <Tag style={{ backgroundColor: data.backgroundColor as string }}>
                ${Number(last(data.data)).toFixed(2)}
              </Tag>
            ))}
          </FlexCard>
          <FlexCard>
            <Formik initialValues={formData} onSubmit={handleSubmit}>
              {({ values }) => (
                <Form className="m-2 w-full">
                  <div className="flex flex-col gap-2">
                    <Input
                      type="number"
                      placeholder="Base Amount..."
                      name="base"
                    />
                    <Input
                      type="number"
                      placeholder="Months..."
                      name="months"
                    />
                    <FieldArray name="investments">
                      {({ remove, push }) => (
                        <div className="flex flex-col gap-2">
                          {values.investments.map((investment, index) => (
                            <div
                              key={`${index}`}
                              className="flex flex-row gap-2 flex-shrink"
                            >
                              <FieldOption
                                investment={investment}
                                index={index}
                              />
                              <button
                                type="button"
                                className="px-2 border border-solid"
                                onClick={() => remove(index)}
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="border border-solid"
                            onClick={() => push(defaultFormData)}
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </FieldArray>
                    <button type="submit" className="border border-solid">
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </FlexCard>
        </div>
      </div>
    </div>
  );
};

export default App;
