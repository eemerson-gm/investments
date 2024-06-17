import { JSXComponent } from "../Types";

export const Button: JSXComponent<HTMLButtonElement> = ({
  children,
  ...props
}) => (
  <button
    type="button"
    className="rounded p-2 bg-gray-500 hover:bg-gray-400"
    {...props}
  >
    {children}
  </button>
);
