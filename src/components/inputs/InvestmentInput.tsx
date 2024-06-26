import { Input } from "../form/Input";
import { JSXComponentProps } from "../Types";

export interface InvestmentProps {
  index: number;
}

export const InvestmentInput: JSXComponentProps<InvestmentProps> = ({
  index,
}) => (
  <>
    <Input
      type="number"
      label="Amount"
      placeholder="Start Amount..."
      name={`investments.${index}.amount`}
    />
    <Input
      type="number"
      label="Add (Monthly)"
      placeholder="Add Monthly..."
      name={`investments.${index}.add`}
    />
    <Input
      type="number"
      label="Percent (Yearly)"
      placeholder="Percent..."
      name={`investments.${index}.percent`}
    />
  </>
);
