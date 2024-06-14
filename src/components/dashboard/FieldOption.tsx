import { Field, FieldProps } from "formik";
import { InvestmentInput } from "../inputs/InvestmentInput";
import { PaymentInput } from "../inputs/PaymentInput";
import { Input } from "./Input";
import { ComponentWithProps } from "./Types";
import { Dropdown, Form } from "react-bootstrap";

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
      <Field name={`investments.${index}.type`}>
        {({ field, form, meta }: FieldProps) => (
          <Form.Select {...field}>
            {Object.keys(formComponents).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        )}
      </Field>
      <Input placeholder="Name..." name={`investments.${index}.name`} />
      <InvestmentComponent index={index} />
    </>
  );
};
