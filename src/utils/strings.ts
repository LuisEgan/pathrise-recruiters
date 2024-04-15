import { BlockSection } from "@/app/[company]/ContentNavigators/types";
import { Recruiter } from "./types";
import { BLOCK_SECTIONS_ANCHORS } from "@/app/[company]/contants";

const LIST_CHARACTER = "•";
export const capitalizeOnlyFirstLetter = (str = "") =>
  str.charAt(0).toUpperCase() + str.toLocaleLowerCase().slice(1);

export const extractBgColorFromClass = (str: string): string | null => {
  const regex = /bg-(\w+)-(\d{1,3})?/; // Regular expression to match bg-color-number pattern
  const match = str.match(regex); // Match the pattern in the string

  if (match && match[1]) {
    if (match[2]) {
      // If a number is specified
      const number = parseInt(match[2]);
      if (number >= 1 && number <= 900) {
        return match[0]; // Return the matched background color class
      }
    } else {
      return match[0]; // Return the matched background color class
    }
  }
  return null; // Return null if no match is found
};

// * generate random id string
export const generateRandomId = () =>
  Math.random().toString(36).substring(2, 9);

export const parseLogoName = (name: string): string => {
  const lastDotIndex = name.lastIndexOf(".");
  let extension = "";

  if (lastDotIndex !== -1) {
    extension = name.slice(lastDotIndex + 1);
    name = name.slice(0, lastDotIndex).trim();
  }

  name = name
    .replace(/\s+$/, "") // Remove trailing spaces
    .replace(/[ _!@#$%^&*()=+[{};':",/<>?\]]+/g, "-") // Replace special characters with hyphens
    .replace(/[^a-zA-Z0-9]+$/, "") // Remove trailing non-alphanumeric characters
    .toLowerCase(); // Convert to lowercase

  if (extension) {
    return `${name}.${extension}`;
  }
  return name;
};

export const replaceCompanyPlaceholders = (
  recruiter: Recruiter,
  company: string
) => {
  const recruiterEntries = Object.entries(recruiter);
  const updatedRecruiter = {} as Recruiter;

  const COMPANY_PLACEHOLDER = "[COMPANY]";
  const COMPANY_VALUES_PLACEHOLDER = "[COMPANY_COMPANY_FILTERS_VALUES]";
  const COMPANY_TRACKS_PROCESSES_AMOUNT_PLACEHOLDER =
    "[COMPANY_TRACKS_PROCESSES_INTERVIEW_PROCESS_AMOUNT]";
  const COMPANY_VALUES_FIRST_PLACEHOLDER =
    "[COMPANY_COMPANY_FILTERS_VALUES_FIRST]";
  const COMPANY_INTERVIEW_PROCESS_PLACEHOLDER =
    "[COMPANY_TRACKS_PROCESSES_INTERVIEW_PROCESS]";

  const { interviewProcess = "", values = "" } = recruiter;
  const valuesList = values?.split(LIST_CHARACTER);
  const tracksProcessesList = interviewProcess?.split(LIST_CHARACTER);

  recruiterEntries.forEach(([key, value]) => {
    updatedRecruiter[key as keyof Recruiter] = value
      .replaceAll(COMPANY_PLACEHOLDER, company)
      .replaceAll(COMPANY_VALUES_PLACEHOLDER, addLineBreaks(values))
      .replaceAll(
        COMPANY_TRACKS_PROCESSES_AMOUNT_PLACEHOLDER,
        (tracksProcessesList?.length || 1) - 1
      )
      .replaceAll(
        COMPANY_VALUES_FIRST_PLACEHOLDER,
        valuesList[1]?.trim() || "teamwork"
      )
      .replaceAll(
        COMPANY_INTERVIEW_PROCESS_PLACEHOLDER,
        addLineBreaks(interviewProcess)
      )
      .replaceAll("\\n", "  \n");
  });

  return updatedRecruiter;
};

export const camelCaseToSentence = (str: string) => {
  const words = str.replace(/([a-z])([A-Z])/g, "$1 $2").split(/(?=[A-Z])/);

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getAnchorSections = (
  recruiter: Recruiter
): Array<BlockSection> => {
  // * This is needs to be done manually because the order is important

  const sections: Array<BlockSection> = [];

  if (recruiter.whatAreRecruitersLookingFor)
    sections.push({
      anchorId: BLOCK_SECTIONS_ANCHORS.whatAreRecruitersLookingFor!,
      title: "What are recruiters looking for?",
    });
  if (recruiter.isCompanyHiringIn2024)
    sections.push({
      anchorId: BLOCK_SECTIONS_ANCHORS.isCompanyHiringIn2024!,
      title: "Is the company hiring in 2024?",
    });
  if (recruiter.typesOfRecruiters)
    sections.push({
      anchorId: BLOCK_SECTIONS_ANCHORS.typesOfRecruiters!,
      title: "Types of recruiters",
    });
  if (recruiter.whichRecruitersShouldYouContact)
    sections.push({
      anchorId: BLOCK_SECTIONS_ANCHORS.whichRecruitersShouldYouContact!,
      title: "Which recruiters should you contact?",
    });
  if (recruiter.howToFindEmailAddress)
    sections.push({
      anchorId: BLOCK_SECTIONS_ANCHORS.howToFindEmailAddress!,
      title: "How to find email address",
    });
  if (recruiter.companyCulture)
    sections.push({
      anchorId: BLOCK_SECTIONS_ANCHORS.companyCulture!,
      title: "Company culture",
    });
  if (recruiter.howToColdEmail)
    sections.push({
      anchorId: BLOCK_SECTIONS_ANCHORS.howToColdEmail!,
      title: "How to cold email",
    });
  if (recruiter.emailTemplate)
    sections.push({
      anchorId: BLOCK_SECTIONS_ANCHORS.emailTemplate!,
      title: "Email template",
    });
  if (recruiter.aiColdEmail)
    sections.push({
      anchorId: BLOCK_SECTIONS_ANCHORS.aiColdEmail!,
      title: "AI cold email",
    });

  return sections;
};

export const addLineBreaks = (
  str: string,
  linebreakPlaceholder = LIST_CHARACTER
) => {
  return str.replaceAll(LIST_CHARACTER, `  \n${LIST_CHARACTER}`);
};
