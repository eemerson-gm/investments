import { ChartData } from "chart.js";
import { Field, FieldArray, Form, Formik } from "formik";
import moment from "moment";
import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { InvestmentInput } from "./components/InvestmentInput";
import { caulcuateInvestment } from "./functions/Investments";
import { SalaryInput } from "./components/SalaryInput";
import { PaymentInput } from "./components/PaymentInput";

const formComponents = {
  investment: InvestmentInput,
  salary: SalaryInput,
  payment: PaymentInput,
};

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

  const totalGraphData = useMemo(
    () => ({
      label: "Total",
      data: Array.from({ length: monthsLength }, (_, index) =>
        formGraphData.reduce(
          (acc, value) => acc + value.data[index],
          formData.base
        )
      ),
    }),
    [formData.base, formGraphData, monthsLength]
  );

  const investmentGraphData = useMemo(
    () => ({
      label: "Investments",
      data: Array.from({ length: monthsLength }, (_, index) =>
        formGraphData
          .filter(
            (_, index) =>
              !["salary", "payment"].includes(formData.investments[index].type)
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
          moment().add(index, "M").format("MM-YYYY")
        ),
        datasets: [...formGraphData, totalGraphData, investmentGraphData].map(
          (dataset, index) => ({
            ...dataset,
            borderColor: investmentColors[index % investmentColors.length],
            backgroundColor: investmentColors[index % investmentColors.length],
          })
        ),
      } as ChartData<"line">),
    [formGraphData, investmentGraphData, monthsLength, totalGraphData]
  );

  const handleSubmit = (data: any) => {
    localStorage.setItem("saveData", JSON.stringify(data));
    setFormData(data);
  };

  return (
    <div className="App">
      <div className="flex flex-col justify-center items-center">
        <div className="w-[800px]">
          <div className="m-2 border border-solid">
            <Line data={lineData} />
          </div>
          <div className="flex">
            <Formik initialValues={formData} onSubmit={handleSubmit}>
              {({ values }) => (
                <Form className="m-2 w-full">
                  <div className="flex flex-col gap-2">
                    <div>
                      Starting Amount: ${totalGraphData.data[0].toFixed(0)}
                    </div>
                    <div>
                      Total Earnings: $
                      {(
                        totalGraphData.data[monthsLength - 1] -
                        totalGraphData.data[0]
                      ).toFixed(0)}
                    </div>
                    <div>
                      Investment Earnings: $
                      {(
                        investmentGraphData.data[monthsLength - 1] -
                        investmentGraphData.data[0]
                      ).toFixed(0)}
                    </div>
                    <Field
                      type="number"
                      className="border border-solid"
                      placeholder="Base Amount..."
                      name="base"
                    />
                    <Field
                      type="number"
                      className="border border-solid"
                      placeholder="Months..."
                      name="months"
                    />
                    <FieldArray name="investments">
                      {({ remove, push }) => (
                        <div className="flex flex-col gap-2">
                          {values.investments.map((investment, index) => {
                            const InvestmentComponent =
                              formComponents[
                                investment.type as keyof typeof formComponents
                              ];
                            if (!InvestmentComponent) return null;
                            return (
                              <div
                                key={`${index}`}
                                className="flex flex-row gap-2"
                              >
                                <Field
                                  component="select"
                                  name={`investments.${index}.type`}
                                  className="border border-solid"
                                >
                                  {Object.keys(formComponents).map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Field>
                                <Field
                                  placeholder="Name..."
                                  className="border border-solid"
                                  name={`investments.${index}.name`}
                                />
                                <InvestmentComponent index={index} />
                                <button
                                  type="button"
                                  className="px-2 border border-solid"
                                  onClick={() => remove(index)}
                                >
                                  X
                                </button>
                              </div>
                            );
                          })}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
