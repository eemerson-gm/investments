import { Field } from "formik";
import { InvestmentInput } from "../inputs/InvestmentInput";
import { PaymentInput } from "../inputs/PaymentInput";
import { Input } from "./Input";
import { ComponentWithProps } from "./Types";

export const formComponents = {
  investment: InvestmentInput,
  payment: PaymentInput,
};

interface FieldOptionProps {
  investment: any;
  index: number;
}

export const FieldOption: ComponentWithProps<FieldOptionProps> = ({
  investment,
  index,
}) => {
  const InvestmentComponent =
    formComponents[investment.type as keyof typeof formComponents];
  if (!InvestmentComponent) return null;
  return (
    <>
      <Field
        component="select"
        name={`investments.${index}.type`}
        className="text-black"
      >
        {Object.keys(formComponents).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Field>
      <Input placeholder="Name..." name={`investments.${index}.name`} />
      <InvestmentComponent index={index} />
    </>
  );
};
