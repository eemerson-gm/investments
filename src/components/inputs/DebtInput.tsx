import { Input } from "../form/Input";
import { JSXComponentProps } from "../Types";
import { InvestmentProps } from "./InvestmentInput";

export const DebtInput: JSXComponentProps<InvestmentProps> = ({ index }) => (
  <>
    <Input
      type="number"
      label="Amount"
      placeholder="Start Amount..."
      name={`investments.${index}.amount`}
      min="0"
    />
    <Input
      type="number"
      label="Payoff (Monthly)"
      placeholder="Payoff Monthly..."
      name={`investments.${index}.add`}
      min="0"
    />
    <Input
      type="number"
      label="Percent (Yearly)"
      placeholder="Percent..."
      name={`investments.${index}.percent`}
      min="0"
    />
  </>
);
