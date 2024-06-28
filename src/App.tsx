import { Field, FieldArray, FieldProps, Form, Formik } from "formik";
import { useMemo, useState } from "react";
import { Option, formComponents } from "./components/dashboard/Option";
import { Card } from "./components/form/Card";
import colors from "tailwindcss/colors";
import { Grid } from "./components/dashboard/Grid";
import { Input } from "./components/form/Input";
import { Tag } from "./components/form/Tag";
import { last } from "lodash";
import { caulcuateInvestment } from "./functions/Calculator";
import { getGraphData, getLineData } from "./functions/GraphData";
import { Button } from "./components/form/Button";
import { Submit } from "./components/form/Submit";
import { Switch } from "./components/form/Switch";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface Investment {
  type: keyof typeof formComponents;
  name?: string;
  amount?: number;
  add?: number;
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

  const formOption = useMemo(() => {
    if (formData.settings[0]) {
      return "total";
    }
    return "earned";
  }, [formData.settings]);

  const formGraphData = useMemo(
    () =>
      formData.investments.map((investment) =>
        getGraphData(investment.name!, monthsLength, (index) =>
          caulcuateInvestment(index, investment, formOption)
        )
      ),
    [formData.investments, formOption, monthsLength]
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
          <Card className="flex-col justify-center items-center">
            <span className="text-lg">Interest Earned</span>
            <Grid
              data={lineData}
              labelSize={14}
              scaleSize={14}
              gridColor={colors.gray["500"]}
              gridSize={2}
            />
          </Card>
          <Card className="gap-2">
            {lineData.datasets.map((data) => (
              <OverlayTrigger
                placement="top"
                overlay={(props) => <Tooltip {...props}>hello</Tooltip>}
              >
                <Tag
                  style={{ backgroundColor: data.backgroundColor as string }}
                >
                  ${Number(last(data.data)).toFixed(2)}
                </Tag>
              </OverlayTrigger>
            ))}
          </Card>
          <Card>
            <Formik initialValues={formData} onSubmit={handleSubmit}>
              {({ values }) => (
                <Form className="m-2 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                      <Field type="checkbox" name="settings.0">
                        {({ field }: FieldProps) => <Switch {...field} />}
                      </Field>
                      Show totals
                    </div>
                    <Input
                      type="number"
                      label="Salary (Monthly)"
                      placeholder="Salary..."
                      name="salary"
                    />
                    <Input
                      type="number"
                      label="Months"
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
                              <Option investment={investment} index={index} />
                              <Button onClick={() => remove(index)}>X</Button>
                            </div>
                          ))}
                          <Button onClick={() => push(defaultFormData)}>
                            Add
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                    <Submit>Save and update</Submit>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;
