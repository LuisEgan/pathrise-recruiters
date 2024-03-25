import RocketshipIcon from "@svg/rocketship.svg";
import ComputerGuyIcon from "@svg/characters/character-computer.svg";
import PathrisePIcon from "@svg/pathrise-p.svg";
import Button from "@/components/Button";
import { BaseProps } from "@/components/types";

interface CompanyFooter extends BaseProps {
  company: string;
}

const PathriseDescription = (props: BaseProps) => (
  <p className={`!leading-7 text-xs mb-10 md:text-sm ${props.className}`}>
    <b>
      Pathrise is a career accelerator that helps people land their dream jobs.
    </b>{" "}
    We regularly place our fellows at top companies like Apple, Amazon, and
    Meta. Our mentors have experience at companies like Apple, giving fellows
    the inside scoop on interview and company culture in 1-on-1 sessions.
    <br />
    <br />
    We cant guarantee you a job at a specific company like Apple. But we do
    guarantee you a great job, if you dont accept an offer in 1 year, you pay
    nothing. Our income share agreement means you only pay with a percentage of
    your income at your new role.
    <br />
    <br />
    Mentors work with fellows at every stage in search, helping them build the
    skills necessary to be the best candidate possible. Fellows in Pathrise
    usually see a 2-4x increase in application response rates, 1.5-3x increase
    in interview scores, and 10-20% increase in salary through negotiation.
  </p>
);

const CompanyFooter = (props: CompanyFooter) => {
  const { company, className, ...baseProps } = props;

  return (
    <section
      {...baseProps}
      className={`${className} flex flex-col md:flex-row md:justify-between`}
    >
      <div
        className={`flex flex-col justify-between rounded-xl border border-gray-300 bg-gray-200 p-10 mb-10 md:w-[49%] md:p-0`}
      >
        <div>
          <div className="flex flex-col w-full md:flex-row md:p-16">
            <RocketshipIcon className="w-10 mb-5 md:mr-5" />
            <h1 className="font-bold mb-5 text-2xl">
              Can Pathrise land you a job at <span>{company}</span>?
            </h1>

            <PathriseDescription className="md:hidden" />
          </div>

          <div className="hidden w-7/12 m-auto mb-10 md:block">
            <p className="mb-3 text-orange-500 font-bold">
              Here&apos;s what we covered
            </p>
            <ol className="list-decimal">
              <li>What are company recruiters looking for </li>
              <li>How do you find Apple recruiter email addresses?</li>
              <li>
                What recruiters are looking for in terms of company culture?
              </li>
              <li>Personalize the email for your role</li>
              <li>Apple cold email template</li>
            </ol>
          </div>
        </div>

        <div className="flex md:justify-end">
          <ComputerGuyIcon className="w-full md:w-1/3" />
        </div>
      </div>

      <div className="hidden md:w-[49%] rounded-xl border border-gray-300 bg-gray-200 p-16 mb-10 md:block">
        <PathriseDescription />
      </div>

      <div className="p-7 bg-purple-500 rounded-lg text-white md:hidden">
        <h1 className="mb-12">
          For help landing your dream job at Reddit and other top companies,
          join Pathrise.
        </h1>
        <Button
          rounded="md"
          title="Apply today!"
          textColorClassName="text-black"
          category="light"
          className="w-full"
          iconRight={<PathrisePIcon className="w-4 svg-black" />}
        />
      </div>
    </section>
  );
};

export default CompanyFooter;
