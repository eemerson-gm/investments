import { JSXComponent } from "../Types";

const Tag: JSXComponent = ({ children, ...props }) => (
  <div className="rounded p-2" {...props}>
    {children}
  </div>
);

export { Tag };
