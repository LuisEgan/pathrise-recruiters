export const PRO_TIPS = [
  (company: string) =>
    `You may be tempted to search for ${company} recruiters and hiring managers directly on LinkedIn–but your odds of landing a job at [COMPANY] are best if you reach out to a recruiter who is searching for candidates like you. Recruiters are often seeking very specific talent for very specific roles.`,

  (company: string) => (
    <>
      The most common email format for {company} employees is [first name].[last
      name]@[COMPANY].com. For example, Jane Doe would have the email
      janedoe@[COMPANY].com. Other common email formats include
      f.last@[COMPANY].com and first_last@[COMPANY].com. <br />
      <br /> If you can't find a recruiter's email from an extension like
      Apollo, you can try manually entering their names into these 3 email
      formats, then bcc the email to all the potential addresses. An extension
      like NeverBounce can confirm which email is valid.
    </>
  ),

  (company: string) => (
    <>
      Once you're familiar with {company}'s values, you can include a sentence
      or two about how you and your experiences might align with their values.
      Don't force it, you'll have time to demonstrate your culture fit in the
      interview. <br />
      <br />
      But if your experiences align with their values, you can show your
      recruiter that you did your research and could be a good fit for the
      culture. Our template includes a generic sentence on accessibility, but
      you can add another value that may fit you better.
    </>
  ),
];

export const COMPANY_SECTIONS = [
  (company: string) => `What are ${company} recruiters looking for?`,
  (company: string) => `Is ${company} hiring in 2023?`,
  "When do you meet with recruiters in the interview process?",
  (company: string) => `Which ${company} recruiters should you contact?`,
];
