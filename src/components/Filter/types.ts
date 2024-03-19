import { SelectOption } from "../Select";

export type Filters =
  | "Work-life balance"
  | "Salary averages"
  | "Employees"
  | "Benefits"
  | "Office"
  | "Job openings"
  | "Size"
  | "Office structure";

export type SelectedFilters = {
  [key in Filters]: Array<SelectOption>;
};
