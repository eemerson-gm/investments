import { Input } from "../form/Input";
import { JSXComponentProps } from "../Types";
import { InvestmentProps } from "./InvestmentInput";

export const PaymentInput: JSXComponentProps<InvestmentProps> = ({ index }) => (
  <Input
    type="number"
    label="Amount"
    placeholder="Monthly Payment..."
    name={`investments.${index}.amount`}
  />
);
