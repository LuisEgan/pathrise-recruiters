import { Company } from "@/utils/types";
import { SelectOption } from "../Select";

const GRADES_VALUES = [
  { value: "A+" },
  { value: "A" },
  { value: "A-" },
  { value: "B+" },
  { value: "B" },
  { value: "B-" },
  { value: "C+" },
  { value: "C" },
  { value: "C-" },
  { value: "D+" },
  { value: "D" },
  { value: "D-" },
];

const AVERAGES_VALUES = [
  { value: "Above Average" },
  { value: "Average" },
  { value: "Below Average" },
];

interface Filter {
  id: keyof Company;
  placeholder?: string;
  options: Array<SelectOption>;
  multiple?: boolean;
}
export const FILTER_OPTIONS: Array<Filter> = [
  {
    id: "workLifeBalance",
    placeholder: "Work Life Balance",
    options: GRADES_VALUES,
  },
  {
    id: "salaryAverages",
    placeholder: "Salary Averages",
    options: AVERAGES_VALUES,
  },
  {
    id: "benefits",
    placeholder: "Benefits",
    options: [
      { value: "Unlimited PTO" },
      { value: "Wellness Stipend" },
      { value: "Company Retreats" },
      { value: "Parental leave" },
      { value: "Healthcare" },
      { value: "401(k)" },
      { value: "Flexible work culture" },
      { value: "Equity" },
      { value: "PTO" },
      { value: "Dental Insurance" },
      { value: "Vision Insurance" },
      { value: "Disability insurance" },
      { value: "Life Insurance" },
      { value: "Mental Health care" },
      { value: "Work from home" },
      { value: "Performance Bonus" },
      { value: "Stock options" },
      { value: "Tuition Reimbursement" },
    ],
  },
  {
    id: "companySize",
    placeholder: "Size",
    options: [
      { value: "1-50" },
      { value: "50-100" },
      { value: "100-500" },
      { value: "500-1000" },
      { value: "1000-5000" },
      { value: "5000-10000" },
      { value: "10000+" },
    ],
  },
  {
    id: "officeStructure",
    placeholder: "Office Structure",
    options: [{ value: "In office" }, { value: "Remote" }, { value: "Hybrid" }],
  },
  {
    id: "rolesAvailable",
    placeholder: "Roles Available",
    options: [
      { value: "Marketing and sales" },
      { label: "Technical Engineering", value: "Techical Engineering" },
      { label: "Product and Strategy", value: "product and strategy" },
      { value: "Design" },
      { value: "IT" },
      { value: "Finance" },
    ],
  },
];
