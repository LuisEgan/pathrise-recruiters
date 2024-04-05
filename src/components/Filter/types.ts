import { Company } from "@/utils/types";
import { SelectOption } from "../Select";

export type SelectedFilters = {
  [key in keyof Company]: Array<SelectOption>;
};
