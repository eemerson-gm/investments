import { ChartData } from "chart.js";
import { Field, FieldArray, Form, Formik } from "formik";
import moment from "moment";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { InvestmentInput } from "./components/InvestmentInput";
import { caulcuateInvestment } from "./functions/Earnings";
import { SalaryInput } from "./components/SalaryInput";
import { PaymentInput } from "./components/PaymentInput";

interface SaveData {
  months: number;
  investments: any[];
}

const investmentOptions = [
  {
    type: "Investment",
    component: InvestmentInput,
  },
  {
    type: "Salary",
    component: SalaryInput,
  },
  {
    type: "Payment",
    component: PaymentInput,
  },
];
const investmentColors = ["red", "orange", "yellow", "green", "blue", "purple"];

const App = () => {
  const saveData = JSON.parse(
    localStorage.getItem("saveData") || "{}"
  ) as SaveData;

  const [formData, setFormData] = useState<SaveData>(
    Object.keys(saveData).length > 0
      ? saveData
      : {
          months: 12,
          investments: [
            {
              type: "investment",
              amount: 100,
              percent: 5,
            },
          ],
        }
  );

  const calculatedEarnings = formData.investments.map((investment, index) => ({
    label: `${index}`,
    data: Array.from({ length: Number(formData.months + 1) }, (_, index) =>
      caulcuateInvestment(index, investment)
    ),
    borderColor: investmentColors[index],
  }));

  const data = {
    labels: Array.from({ length: Number(formData.months + 1) }, (_, index) =>
      moment().add(index, "M").format("MM-YYYY")
    ),
    datasets: [
      ...calculatedEarnings,
      {
        label: "Total",
        data: Array.from({ length: Number(formData.months + 1) }, (_, index) =>
          calculatedEarnings.reduce((acc, value) => acc + value.data[index], 0)
        ),
      },
    ],
  } as ChartData<"line">;

  console.log(data);

  const handleSubmit = (data: any) => {
    localStorage.setItem("saveData", JSON.stringify(data));
    setFormData(data);
  };

  return (
    <div className="App">
      <div className="flex flex-col justify-center items-center">
        <div className="w-[800px]">
          <div className="m-2 border border-solid">
            <Line data={data} />
          </div>
          <div className="flex">
            <Formik initialValues={formData} onSubmit={handleSubmit}>
              {({ values }) => (
                <Form className="m-2 w-full">
                  <div className="flex flex-col gap-2">
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
                            const InvestmentComponent = investmentOptions.find(
                              (option) =>
                                option.type.toLowerCase() === investment.type
                            )?.component;
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
                                  {investmentOptions.map((option) => (
                                    <option
                                      key={option.type}
                                      value={option.type.toLowerCase()}
                                    >
                                      {option.type}
                                    </option>
                                  ))}
                                </Field>
                                <InvestmentComponent index={index} />
                                <button
                                  type="button"
                                  className="border border-solid"
                                  onClick={() => remove(index)}
                                >
                                  X
                                </button>
                              </div>
                            );
                          })}
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                type: "investment",
                                amount: 100,
                                percent: 5,
                              })
                            }
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </FieldArray>
                    <button type="submit">Submit</button>
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
