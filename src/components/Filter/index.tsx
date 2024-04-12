"use client";

import { getCompanies } from "@/api/companies";
import { Company } from "@/utils/types";
import FilterIcon from "@svg/filter.svg";
import SearchIcon from "@svg/search.svg";
import { useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useQuery } from "react-query";
import Button from "../Button";
import CompanyCard from "../Cards/CompanyCard";
import Input from "../Input";
import ToggablePanel from "../Panels/ToggablePanel";
import { BaseProps } from "../types";
import FiltersList, { FilterList } from "./FiltersList";
import { SelectedFilters } from "./types";
import BorderLoading from "../Loading/BorderLoading";
import { generateRandomId } from "@/utils/strings";

const LOADING_ARRAY = Array.from({ length: 20 });
let filtersDebounce: ReturnType<typeof setTimeout>;

interface Filter extends BaseProps {}
const Filter = (props: Filter) => {
  const { className, ...baseProps } = props;

  const { push } = useRouter();

  const [filters, setFilters] = useState<SelectedFilters>(
    {} as SelectedFilters
  );
  const [searchedCompany, setSearchedCompany] = useState<string>("");
  const [filterId, setFilterId] = useState<string>(generateRandomId());
  const [companies, setCompanies] = useState<Array<Company>>([]);

  const { isLoading, isFetching } = useQuery(
    ["companies", filterId],
    () => getCompanies({ filters, searchedCompany }),
    {
      retry: false,
      onSuccess,
      keepPreviousData: true,
    }
  );

  function onSuccess(res: Array<Company>) {
    setCompanies(res);
  }
  function debounce(fn: Function) {
    filtersDebounce && clearTimeout(filtersDebounce);
    filtersDebounce = setTimeout(() => {
      fn();
    }, 500);
  }

  const onFilterListChange: FilterList["onChange"] = (selectedOptions) => {
    debounce(() => {
      setFilterId(generateRandomId());
      setFilters((prevFilters) => ({ ...prevFilters, ...selectedOptions }));
    });
  };

  const onSingleCompanySearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const company = e.target.value;
      setSearchedCompany(company);
      setFilterId(generateRandomId());
    });
  };

  return (
    <div className={`flex flex-col h-[90vh] ${className}`} {...baseProps}>
      <div className="flex justify-between items-center mb-5">
        <div className="flex w-full flex-1 mr-2">
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
            onChange={onSingleCompanySearch}
          />
        </div>

        <a
          target="__blank"
          href="https://www.pathrise.com/apply?utm_source=recruiter&utm_medium=content"
        >
          <Button
            className="hidden md:block md:ml-1"
            title="Get your dream job"
          />
        </a>
      </div>

      <BorderLoading isLoading={isFetching} className="flex-1 rounded-lg">
        <div className="grid grid-cols-3 gap-2 h-full overflow-y-auto rounded-lg p-3">
          {isLoading
            ? LOADING_ARRAY.map((_, i) => (
                <CompanyCard key={i} company={{} as Company} isLoading />
              ))
            : companies.map((c, i) => (
                <CompanyCard
                  key={`${c.name}_${i}`}
                  onClick={() => push(`/${c.name.toLocaleLowerCase()}`)}
                  company={c}
                />
              ))}
        </div>
      </BorderLoading>
    </div>
  );
};

export default Filter;
