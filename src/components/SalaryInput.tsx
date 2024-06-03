import { Field } from "formik";

interface InvestmentProps {
  index: number;
}

const SalaryInput: React.FC<InvestmentProps> = ({ index }) => (
  <div className="flex flex-row gap-2">
    <Field
      type="number"
      className="border border-solid"
      placeholder="Monthly Salary..."
      name={`investments.${index}.amount`}
    />
  </div>
);

export { SalaryInput };
