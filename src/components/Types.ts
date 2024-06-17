export type JSXComponent<T = HTMLDivElement> = React.FC<
  React.PropsWithChildren & React.HTMLAttributes<T>
>;

export type JSXComponentProps<P, T = HTMLDivElement> = React.FC<
  React.PropsWithChildren & React.HTMLAttributes<T> & P
>;
