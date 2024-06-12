export type Component = React.FC<
  React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>
>;

export type ComponentWithProps<T> = React.FC<
  React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement> & T
>;
