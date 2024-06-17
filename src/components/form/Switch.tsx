import { Form } from "react-bootstrap";
import { JSXComponent } from "../Types";

export const Switch: JSXComponent = ({ ...props }) => (
  <Form.Check type="switch" {...props} />
);
