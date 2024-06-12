import { Component } from "./Types";

export const FlexCard: Component = ({ children, className, ...props }) => (
  <div className="m-4 rounded text-white bg-gray-600">
    <div className={`flex p-4 ${className}`} {...props}>
      {children}
    </div>
  </div>
);
