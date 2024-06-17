import { JSXComponent } from "../Types";

export const Card: JSXComponent = ({ children, className, ...props }) => (
  <div className="m-4 rounded text-white bg-gray-600">
    <div className={`flex p-4 ${className}`} {...props}>
      {children}
    </div>
  </div>
);
