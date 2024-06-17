import { JSXComponent } from "../Types";

export const Submit: JSXComponent<HTMLButtonElement> = ({
  children,
  ...props
}) => (
  <button
    type="submit"
    className="rounded p-2 bg-blue-500 hover:bg-blue-400"
    {...props}
  >
    {children}
  </button>
);
