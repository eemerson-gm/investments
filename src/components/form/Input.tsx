import { Field, FieldAttributes } from "formik";
import { JSXComponentProps } from "../Types";

interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
}

const Input: JSXComponentProps<FieldAttributes<InputProps>> = ({
  name,
  label,
  placeholder,
  ...props
}) => (
  <div className="flex flex-col w-full">
    <span>{label}</span>
    <Field
      className="border border-solid rounded w-full text-black p-2"
      placeholder={placeholder}
      name={name}
      {...props}
    />
  </div>
);

export { Input };
