export type Benefits =
  | "Unlimited PTO"
  | "Wellness Stipend"
  | "Company Retreats"
  | "Parental leave"
  | "Healthcare"
  | "401(k)"
  | "Flexible work culture"
  | "Equity"
  | "PTO"
  | "Dental Insurance"
  | "Vision Insurance"
  | "Disability insurance"
  | "Life Insurance"
  | "Mental Health care"
  | "Work from home"
  | "Performance Bonus"
  | "Stock options"
  | "Tuition Reimbursement";

export type CompanySizes =
  | "1-50"
  | "50-100"
  | "100-500"
  | "500-1000"
  | "1000-5000"
  | "5000-10000"
  | "10000+";

export type OfficeStructures = "In office" | "Remote" | "Hybrid";

export type RolesAvailable =
  | "Marketing and sales"
  | "Techical Engineering"
  | "product and strategy"
  | "Design"
  | "IT"
  | "Finance";

export interface Company {
  name: string;
  insideScoop?: string;
  about?: string;
  behavioralQuestions?: string;
  values?: string;
  workLifeBalance?: string;
  culture?: string;
  employees?: string;
  office?: Number;
  companySize?: CompanySizes;
  rolesAvailable?: RolesAvailable;
  cultureCategory?: string;
  officeStructure?: OfficeStructures;
  salaryAverages?: string;
  benefits?: Benefits;
  interviewSteps?: string;
  hiring?: Boolean;
  location?: string;
  jobOpeningsLink?: string;
  deleted?: Boolean;
  customUrl?: string;
}

export type SocialNetworks =
  | "linkedin"
  | "facebook"
  | "instagram"
  | "youtube"
  | "share";

export interface CompanyRecruiter {
  company: string;
  whatAreRecruitersLookingFor: string;
  isCompanyHiringIn2024: string;
  typesOfRecruiters: string;
  whichRecruitersShouldYouContact: string;
  howToFindEmailAddress: string;
  companyCulture: string;
  emailTemplate: string;
  interviewProcess: string;
}

export interface Recruiter extends CompanyRecruiter {
  howToReachOutToRecruiters: string;
  quote: string;
  tipOne: string;
  tipTwo: string;
  tipThree: string;
  tipFour: string;
  howToColdEmail: string;
  aiColdEmail: string;
}
