import { replaceCompanyPlaceholders } from "@/utils/strings";
import { Recruiter } from "@/utils/types";

interface GetRecruiter {
  company: string;
}
interface ApiGetRecruiterResponse {
  data: Recruiter;
}
export async function getRecruiter(params: GetRecruiter): Promise<Recruiter> {
  if (!document) return {} as Recruiter;

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
