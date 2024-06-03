import { Field } from "formik";

interface InvestmentProps {
  index: number;
}

const InvestmentInput: React.FC<InvestmentProps> = ({ index }) => (
  <div className="flex flex-row gap-2">
    <Field
      type="number"
      className="border border-solid"
      placeholder="Start Amount..."
      name={`investments.${index}.amount`}
    />
    <div className="border border-solid">
      <Field
        type="number"
        placeholder="Percent..."
        name={`investments.${index}.percent`}
      />
      %
    </div>
  </div>
);

export { InvestmentInput };
