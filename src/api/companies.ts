import { SelectedFilters } from "@/components/Filter/types";
import { Company } from "@/utils/types";

interface GetCompanies {
  filters: SelectedFilters;
}
interface ApiGetCompaniesResponse {
  companies: number;
  data: Array<Company>;
}

type SearchFilters = {
  [key in keyof Company]: Array<string>;
};
export const getCompanies = async (
  params: GetCompanies
): Promise<Array<Company>> => {
  const { filters: selectedFilters } = params;

  const filters = {} as SearchFilters;
  Object.keys(selectedFilters).forEach((key) => {
    const k = key as keyof Company;
    filters[k] = selectedFilters[k]!.map(({ value }) => `${value}`);
  });

  try {
    const response = (await (
      await fetch(
        "https://us-west1-pathrise-fellows.cloudfunctions.net/get-companies",
        // "http://localhost:8080/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filters }),
        }
      )
    ).json()) as ApiGetCompaniesResponse;

    return response.data;
  } catch (error) {
    console.error("[getCompanies] - error: ", error);
    return [];
  }
};
