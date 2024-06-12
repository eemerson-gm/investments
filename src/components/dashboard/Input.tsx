import { Field, FieldAttributes } from "formik";
import { ComponentWithProps } from "./Types";

interface InputProps {
  name: string;
  placeholder?: string;
}

const Input: ComponentWithProps<InputProps & FieldAttributes<any>> = ({
  name,
  placeholder,
  ...props
}) => (
  <Field
    className="border border-solid rounded w-full text-black p-2"
    placeholder={placeholder}
    name={name}
    {...props}
  />
);

export { Input };
