import { BaseProps } from "@/components/types";
import { Company, Recruiter } from "@/utils/types";

export interface ContentNavigator extends BaseProps {
  company: Company;
  recruiter: Recruiter;
}

export interface BlockSection {
  anchorId: string;
  title: string;
}
