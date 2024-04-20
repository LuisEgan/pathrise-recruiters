import { replaceCompanyPlaceholders } from "@/utils/strings";
import { Recruiter } from "@/utils/types";

interface GetRecruiter {
  company: string;
}
interface ApiGetRecruiterResponse {
  data: Recruiter;
}
export async function getRecruiter(params: GetRecruiter): Promise<Recruiter> {
  const DUMMY_RECRUITER = {
    company: "GOOGLE",
    whatAreRecruitersLookingFor: "What are recruiters looking for",
    quote: "Quote",
    isCompanyHiringIn2024: "Is company hiring in 2024",
    typesOfRecruiters: "Types of recruiters",
    tipOne: "Tip one",
    whichRecruitersShouldYouContact: "Which recruiters should you contact",
    tipTwo: "Tip two",
    howToFindEmailAddress: "How to find email address",
    tipThree: "Tip three",
    companyCulture: "Company culture",
    tipFour: "Tip four",
    howToColdEmail: "How to cold email",
    emailTemplate: "Email template",
    aiColdEmail: "AI cold email",
  } as Recruiter;
  return DUMMY_RECRUITER;

  const { company } = params;

  try {
    const res = (await (
      await fetch(
        `https://us-west1-pathrise-fellows.cloudfunctions.net/get-recruiters`,
        // `https://us-west1-pathrise-fellows.cloudfunctions.net/get-recruiters?time=${Date.now()}`,
        // "http://localhost:8080/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ company }),
        }
      )
    ).json()) as ApiGetRecruiterResponse;
    return replaceCompanyPlaceholders(res.data, res.data.company);
  } catch (error) {
    console.error("[getRecruiter] - error: ", error);
    return {} as Recruiter;
  }
}

export async function getDummy() {
  const res = await fetch("https://dummyjson.com/products/1");
  return res.json();
}
