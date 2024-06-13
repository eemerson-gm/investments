import { Field, FieldArray, Form, Formik } from "formik";
import { useMemo, useState } from "react";
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
import { caulcuateInvestment } from "./functions/Calculator";
import { getGraphData, getLineData } from "./functions/GraphData";

interface Investment {
  type: keyof typeof formComponents;
  name?: string;
  amount?: number;
  percent?: number;
}

interface SaveData {
  salary: number;
  months: number;
  investments: Investment[];
  settings: boolean[];
}

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
          salary: 0,
          months: 12,
          investments: [defaultFormData],
          settings: [false],
        }
  );

  const monthsLength = Number(formData.months + 1);

  const formGraphData = useMemo(
    () =>
      formData.investments.map((investment, index) =>
        getGraphData(investment.name!, monthsLength, (index) => {
          if (formData.settings[0]) {
            return (
              caulcuateInvestment(index, investment) + (investment.amount || 0)
            );
          }
          return caulcuateInvestment(index, investment);
        })
      ),
    [formData.investments, formData.settings, monthsLength]
  );

  const salaryGraphData = useMemo(
    () =>
      getGraphData("Salary", monthsLength, (index) => formData.salary * index),
    [formData.salary, monthsLength]
  );

  const totalGraphData = useMemo(
    () =>
      getGraphData(
        "Total",
        monthsLength,
        (index) =>
          formGraphData
            .filter(
              (_, index) => formData.investments[index].type === "investment"
            )
            .reduce((acc, value) => acc + value.data[index], 0) +
          salaryGraphData.data[index]
      ),
    [formData.investments, formGraphData, monthsLength, salaryGraphData.data]
  );

  const lineData = getLineData(monthsLength, [
    ...formGraphData,
    salaryGraphData,
    totalGraphData,
  ]);

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
            <span className="text-lg">Interest Earned</span>
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
                    <div className="flex flex-row gap-2">
                      <Field type="checkbox" name="settings.0" />
                      Show totals
                    </div>
                    <Input
                      type="number"
                      placeholder="Salary..."
                      name="salary"
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
