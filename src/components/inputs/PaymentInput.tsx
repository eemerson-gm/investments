import { Field } from "formik";

interface InvestmentProps {
  index: number;
}

const PaymentInput: React.FC<InvestmentProps> = ({ index }) => (
  <Field
    type="number"
    className="border border-solid w-full"
    placeholder="Monthly Payment..."
    name={`investments.${index}.amount`}
  />
);

export { PaymentInput };
