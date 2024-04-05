import { CSSProperties } from "react";
import Select, { SelectOption } from "../Select";
import { FILTER_OPTIONS } from "./constants";

export interface FilterList {
  onChange?: (selectedOptions: {
    [label: string]: Array<SelectOption>;
  }) => void;
}
const FiltersList = (props: FilterList) => {
  const { onChange } = props;

  const handleSelectChange =
    (id: string) => (selectedOptions: Array<SelectOption>) => {
      if (onChange) {
        onChange({ [id]: selectedOptions });
      }
    };

  const selectsStyles: CSSProperties = {
    width: "48%",
    marginBottom: ".5rem",
  };
  return (
    <div className="flex flex-wrap p-5 justify-between">
      {FILTER_OPTIONS.map(({ options, placeholder, id }) => (
        <Select
          multiple
          key={id}
          styles={selectsStyles}
          onChange={handleSelectChange(id)}
          placeholder={placeholder || id}
          {...{ id, options }}
        />
      ))}
    </div>
  );
};

export default FiltersList;
