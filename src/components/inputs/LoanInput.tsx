import { Input } from "../form/Input";
import { JSXComponentProps } from "../Types";
import { InvestmentProps } from "./InvestmentInput";

export const LoanInput: JSXComponentProps<InvestmentProps> = ({ index }) => (
  <>
    <Input
      type="number"
      label="Amount"
      placeholder="Start Amount..."
      name={`investments.${index}.amount`}
    />
    <Input
      type="number"
      label="Payoff (Monthly)"
      placeholder="Payoff Monthly..."
      name={`investments.${index}.add`}
    />
    <Input
      type="number"
      label="Percent (Monthly)"
      placeholder="Percent..."
      name={`investments.${index}.percent`}
    />
  </>
);
