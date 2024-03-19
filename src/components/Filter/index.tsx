"use client";

import FilterIcon from "@svg/filter.svg";
import SearchIcon from "@svg/search.svg";
import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import ToggablePanel from "../Panels/ToggablePanel";
import FiltersList, { FilterList } from "./FiltersList";
import { SelectedFilters } from "./types";
import CompanyCard from "../Cards/CompanyCard";
import { BaseProps } from "../types";
import { useRouter } from "next/navigation";

interface Filter extends BaseProps {}
const Filter = (props: Filter) => {
  const { className, ...baseProps } = props;

  // router to navvigate to company page
  const { push } = useRouter();

  const [filters, setFilters] = useState<SelectedFilters>(
    {} as SelectedFilters
  );

  const onFilterListChange: FilterList["onChange"] = (selectedOptions) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...selectedOptions }));
  };

  return (
    <div className={`flex flex-col h-[90vh] ${className}`} {...baseProps}>
      <div className="flex justify-between mb-5">
        <div className="flex w-full md:w-6/12 lg:w-7/12">
          <ToggablePanel
            label="Filter"
            className="bg-white"
            panelClassName="bg-white rounded-tr-lg w-[80vw] md:w-[250%]"
            openPanelOffset={{ y: 10 }}
            isBusy={!!Object.keys(filters).length}
            leftIcon={<FilterIcon className="w-4 mr-2" />}
            showRightIcon={false}
          >
            <FiltersList onChange={onFilterListChange} />
          </ToggablePanel>

          <div className="w-10"></div>

          <Input
            placeholder="Search for a company"
            iconLeft={<SearchIcon className="w-4 stroke-gray-500" />}
          />
        </div>

        <Button
          className="hidden md:block md:ml-1"
          title="Get your dream job"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 flex-1 overflow-y-auto 2xl:gap-4 2xl:grid-cols-4">
        {
          // Replace the following with a list of company cards
          // make a dummy array of 100
          Array.from({ length: 100 }).map((_, i) => (
            <CompanyCard
              key={i}
              onClick={() => push("/reddit")}
              company={{
                name: `Company ${i + 1}`,
                image:
                  "https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png",
              }}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Filter;
