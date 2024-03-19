export type Categories =
  | "main"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "dark"
  | "light"
  | "info";

export type Sizes = "none" | "sm" | "md" | "lg" | "full";

export interface BaseProps {
  id?: string;
  dataId?: string;
  className?: string;
  styles?: React.CSSProperties;
  children?: React.ReactNode;
  rounded?: Sizes;
  category?: Categories;
}

export type CategoryStyle = {
  [key in Categories]: string;
};
export type SizeStyle = {
  [key in Sizes]: string;
};
