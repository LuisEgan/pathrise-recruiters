import { BaseProps } from "@/components/types";
import { Recruiter } from "@/utils/types";

export interface ContentNavigator extends BaseProps {
  companyName: string;
  recruiter: Recruiter;
}

export interface BlockSection {
  anchorId: string;
  title: string;
}
