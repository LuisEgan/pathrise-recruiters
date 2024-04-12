import { Recruiter } from "@/utils/types";

export const BLOCK_SECTIONS_ANCHORS: {
  [key in keyof Partial<Recruiter>]: string;
} = {
  whatAreRecruitersLookingFor: "0",
  isCompanyHiringIn2024: "1",
  typesOfRecruiters: "2",
  whichRecruitersShouldYouContact: "3",
  howToFindEmailAddress: "4",
  companyCulture: "5",
  howToColdEmail: "6",
  emailTemplate: "7",
  aiColdEmail: "8",
};
