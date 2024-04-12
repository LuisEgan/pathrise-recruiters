import { getRecruiter } from "@/api/recruiters";
import Testimonial, {
  Testimonial as TestimonialProps,
} from "@/components/Testimonial";
import MdContainer from "../../components/Markdown/MdContainer";
import ProTip from "../../components/ProTip";
import CompanyFooter from "./CompanyFooter";
import CompanyHeader from "./CompanyHeader";
import { BLOCK_SECTIONS_ANCHORS } from "./contants";

const TESTIMONIAL_PROPS: TestimonialProps = {
  roundedPic: true,
  author: "Felix M.",
  company: "Delloite",
  position: "Data Analyst",
  picUrl: "/png/image.png",
  quote:
    "These guides helped me prep for a final round interview with Delloite, so thankful for these!",
};

interface CompanyPage {
  params: {
    company: string;
  };
}

const CompanyPage = async (props: CompanyPage) => {
  const {
    params: { company },
  } = props;

  const recruiter = await getRecruiter({ company });
  const {
    whatAreRecruitersLookingFor,
    quote,
    isCompanyHiringIn2024,
    typesOfRecruiters,
    tipOne,
    whichRecruitersShouldYouContact,
    tipTwo,
    howToFindEmailAddress,
    tipThree,
    companyCulture,
    tipFour,
    howToColdEmail,
    emailTemplate,
    aiColdEmail,
  } = recruiter;

  return (
    <main className="w-full py-5 px-3 bg-gray-100 md:p-7">
      <CompanyHeader company={{ name: company }} recruiter={recruiter} />

      <section className="grid grid-cols-12">
        <div className="hidden md:block md:col-span-5"></div>

        <div className="flex flex-col col-span-12 md:col-span-7 md:pl-10">
          <MdContainer
            data-section={BLOCK_SECTIONS_ANCHORS.whatAreRecruitersLookingFor}
            content={whatAreRecruitersLookingFor}
          />
          <Testimonial
            {...TESTIMONIAL_PROPS}
            quote={quote}
            className="p-7 bg-purple-500 rounded-lg text-white mb-5"
          />
          <MdContainer
            data-section={BLOCK_SECTIONS_ANCHORS.isCompanyHiringIn2024}
            content={isCompanyHiringIn2024}
          />
          <MdContainer
            data-section={BLOCK_SECTIONS_ANCHORS.typesOfRecruiters}
            content={typesOfRecruiters}
          />
          <ProTip number={1} content={tipOne} />
          <MdContainer
            data-section={
              BLOCK_SECTIONS_ANCHORS.whichRecruitersShouldYouContact
            }
            content={whichRecruitersShouldYouContact}
          />
          <ProTip number={2} content={tipTwo} />
          <MdContainer
            data-section={BLOCK_SECTIONS_ANCHORS.howToFindEmailAddress}
            content={howToFindEmailAddress}
          />
          <ProTip number={3} content={tipThree} />
          <MdContainer
            data-section={BLOCK_SECTIONS_ANCHORS.companyCulture}
            content={companyCulture}
          />
          <ProTip number={4} content={tipFour} />
          <MdContainer
            data-section={BLOCK_SECTIONS_ANCHORS.howToColdEmail}
            content={howToColdEmail}
          />
          <MdContainer
            data-section={BLOCK_SECTIONS_ANCHORS.emailTemplate}
            content={emailTemplate}
          />
          <MdContainer
            data-section={BLOCK_SECTIONS_ANCHORS.aiColdEmail}
            content={aiColdEmail}
          />
        </div>
      </section>

      <CompanyFooter id="company-footer" company={company} />
    </main>
  );
};

export default CompanyPage;
