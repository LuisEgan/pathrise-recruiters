import Button from "@/components/Button";
import SocialNetwork from "@/components/Button/SocialNetwork";
import { Recruiter } from "@/utils/types";
import PresentationIcon from "@svg/characters/character-presentation.svg";
import DrawnArrowIcon from "@svg/drawn-arrow.svg";
import LogoIcon from "@svg/pathrise-logo.svg";
import DesktopNavigator from "./ContentNavigators/DesktopNavigator";
import MobileNavigator from "./ContentNavigators/MobileNavigator";
import Link from "next/link";

interface CompanyHeader {
  companyName: string;
  recruiter: Recruiter;
}

const CompanyHeader = (props: CompanyHeader) => {
  const { companyName, recruiter } = props;

  return (
    <section className="flex flex-col justify-between overflow-hidden w-full h-[70vh] bg-gray-800 text-white rounded-lg mb-10 md:overflow-visible">
      <div className="h-full flex flex-col">
        <div className="flex justify-between mb-10 p-5 md:px-10 md:mb-3 xl:p-10">
          <div className="flex items-center text-xs xl:text-lg">
            <Link href="/">
              <LogoIcon className="w-16 mr-3 svg-white cursor-pointer xl:w-40" />
            </Link>
            <span className="hidden md:block">Company Resources</span>
          </div>

          <a
            target="__blank"
            href="https://www.pathrise.com/apply?utm_source=recruiter&utm_medium=content"
          >
            <Button title="Get your dream job" />
          </a>
        </div>

        <div className="grid grid-cols-12 px-10 md:flex-1 lg:px-16">
          {/* +MD ONLY */}
          <div className="hidden relative md:block col-span-5">
            <DesktopNavigator companyName={companyName} recruiter={recruiter} />
          </div>

          <div className="relative col-span-12 md:col-span-7 md:px-10">
            <h4 className="font-serif mb-3 text-xs xl:text-2xl">
              How to reach out to
            </h4>
            <h1 className="font-serif font-bold mb-10 text-2xl xl:text-4xl">
              Company Recruiters
            </h1>
            <h2 className="mb-10 text-sm md:mb-5 xl:text-xl">
              Learn the best way we&apos;ve found to get hired by {companyName}
            </h2>

            {/* +MD ONLY */}
            <div className="hidden md:block">
              <Button
                title={`${companyName} Guide`}
                className="mb-10"
                iconRight={<DrawnArrowIcon className="w-2 ml-10 xl:w-3" />}
              />
              <div className="flex">
                <SocialNetwork className="mr-3" network="share" />
                <SocialNetwork className="mr-3" network="instagram" />
                <SocialNetwork network="linkedin" />
              </div>
            </div>

            <PresentationIcon className="hidden md:block absolute right-0 bottom-0 md:w-1/3 lg:w-1/2 xl:w-1/2" />
          </div>
        </div>
      </div>

      {/* MOBILE ONY */}
      <MobileNavigator companyName={companyName} recruiter={recruiter} />
    </section>
  );
};

export default CompanyHeader;
