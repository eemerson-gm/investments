import { Input } from "../dashboard/Input";

interface InvestmentProps {
  index: number;
}

const InvestmentInput: React.FC<InvestmentProps> = ({ index }) => (
  <>
    <Input
      type="number"
      placeholder="Start Amount..."
      name={`investments.${index}.amount`}
    />
    <Input
      type="number"
      placeholder="Add Monthly..."
      name={`investments.${index}.add`}
    />
    <Input
      type="number"
      placeholder="Percent..."
      name={`investments.${index}.percent`}
    />
  </>
);

export { InvestmentInput };
