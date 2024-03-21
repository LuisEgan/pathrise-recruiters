import RocketshipIcon from "@svg/rocketship.svg";
import ComputerGuyIcon from "@svg/characters/character-computer.svg";
import PathrisePIcon from "@svg/pathrise-p.svg";
import Button from "@/components/Button";
import { BaseProps } from "@/components/types";

interface CompanyFooter extends BaseProps {
  company: string;
}

const CompanyFooter = (props: CompanyFooter) => {
  const { company, ...baseProps } = props;

  return (
    <section {...baseProps}>
      <div className={`mb-5rounded-lg border border-gray-300 p-10 mb-10`}>
        <RocketshipIcon className="w-10 mb-5" />
        <h1 className="font-bold mb-5 text-2xl">
          Can Pathrise land you a job at <span>{company}</span>?
        </h1>
        <p className="text-xs mb-10">
          <b>
            Pathrise is a career accelerator that helps people land their dream
            jobs.
          </b>{" "}
          We regularly place our fellows at top companies like Apple, Amazon,
          and Meta. Our mentors have experience at companies like Apple, giving
          fellows the inside scoop on interview and company culture in 1-on-1
          sessions.
          <br />
          <br />
          We cant guarantee you a job at a specific company like Apple. But we
          do guarantee you a great job, if you dont accept an offer in 1 year,
          you pay nothing. Our income share agreement means you only pay with a
          percentage of your income at your new role.
          <br />
          <br />
          Mentors work with fellows at every stage in search, helping them build
          the skills necessary to be the best candidate possible. Fellows in
          Pathrise usually see a 2-4x increase in application response rates,
          1.5-3x increase in interview scores, and 10-20% increase in salary
          through negotiation.
        </p>

        <ComputerGuyIcon className="w-full" />
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
