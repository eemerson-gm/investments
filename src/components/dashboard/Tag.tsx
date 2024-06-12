import { Component } from "./Types";

const Tag: Component = ({ children, ...props }) => (
  <div className="rounded p-2" {...props}>
    {children}
  </div>
);

export { Tag };
