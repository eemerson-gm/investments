import { Field } from "formik";

interface InvestmentProps {
  index: number;
}

const InvestmentInput: React.FC<InvestmentProps> = ({ index }) => (
  <>
    <Field
      type="number"
      className="border border-solid"
      placeholder="Start Amount..."
      name={`investments.${index}.amount`}
    />
    <Field
      type="number"
      className="border border-solid"
      placeholder="Percent..."
      name={`investments.${index}.percent`}
    />
  </>
);

export { InvestmentInput };
