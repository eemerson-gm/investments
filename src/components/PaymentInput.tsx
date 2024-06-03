import { Field } from "formik";

interface InvestmentProps {
  index: number;
}

const PaymentInput: React.FC<InvestmentProps> = ({ index }) => (
  <div className="flex flex-row gap-2">
    <Field
      type="number"
      className="border border-solid"
      placeholder="Monthly Payment..."
      name={`investments.${index}.amount`}
    />
  </div>
);

export { PaymentInput };
