import { Input } from "../dashboard/Input";

interface InvestmentProps {
  index: number;
}

const PaymentInput: React.FC<InvestmentProps> = ({ index }) => (
  <Input
    type="number"
    placeholder="Monthly Payment..."
    name={`investments.${index}.amount`}
  />
);

export { PaymentInput };
