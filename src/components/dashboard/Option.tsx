import { Field, FieldProps } from "formik";
import { InvestmentInput } from "../inputs/InvestmentInput";
import { PaymentInput } from "../inputs/PaymentInput";
import { Input } from "../form/Input";
import { JSXComponentProps } from "../Types";
import { Form } from "react-bootstrap";
import { DebtInput } from "../inputs/DebtInput";

export const formComponents = {
  investment: InvestmentInput,
  payment: PaymentInput,
  debt: DebtInput,
};

interface OptionProps {
  investment: any;
  index: number;
}

export const Option: JSXComponentProps<OptionProps> = ({
  investment,
  index,
}) => {
  const InvestmentComponent =
    formComponents[investment.type as keyof typeof formComponents];
  if (!InvestmentComponent) return null;
  return (
    <>
      <Field name={`investments.${index}.type`}>
        {({ field }: FieldProps) => (
          <div className="flex flex-col w-full">
            <span>Type</span>
            <Form.Select className="h-full" {...field}>
              {Object.keys(formComponents).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </div>
        )}
      </Field>
      <Input
        label="Name"
        placeholder="Name..."
        name={`investments.${index}.name`}
      />
      <InvestmentComponent index={index} />
    </>
  );
};
