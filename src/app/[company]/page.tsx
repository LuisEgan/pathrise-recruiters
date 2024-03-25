import Testimonial, {
  Testimonial as TestimonialProps,
} from "@/components/Testimonial";
import MdContainer from "../../components/Markdown/MdContainer";
import ProTip from "../../components/ProTip";
import CompanyFooter from "./CompanyFooter";
import CompanyHeader from "./CompanyHeader";
import { PRO_TIPS } from "./contants";

const TESTIMONIAL_PROPS: TestimonialProps = {
  roundedPic: true,
  author: "Felix M.",
  company: "Delloite",
  position: "Data Analyst",
  picUrl: "/png/image.png",
  quote:
    "These guides helped me prep for a final round interview with Delloite, so thankful for these!",
};

const DUMMY_CONTENT = `## How to write cold emails to [COMPANY] recruiters and what to say
- If you're reaching out to find a Sales Development Representative (SDR) at [COMPANY], make sure you focus on how you approach your funnels differently and why you are the right fit for this specific team.`;

interface CompanyPage {
  params: {
    company: string;
  };
}

const CompanyPage = (props: CompanyPage) => {
  const {
    params: { company },
  } = props;

  return (
    <main className="w-full py-5 px-3 bg-gray-100 md:p-7">
      <CompanyHeader company={{ name: "amazon" }} />

      <section className="grid grid-cols-12">
        <div className="hidden md:block md:col-span-5"></div>

        <div className="flex flex-col col-span-12 md:col-span-7 md:pl-10">
          <MdContainer data-section="0" content={DUMMY_CONTENT} />
          <Testimonial
            {...TESTIMONIAL_PROPS}
            className="p-7 bg-purple-500 rounded-lg text-white mb-5"
          />
          <MdContainer data-section="1" content={`1 - ${DUMMY_CONTENT}`} />
          <MdContainer data-section="2" content={`2 - ${DUMMY_CONTENT}`} />
          <ProTip number={1} content={PRO_TIPS[0](company)} />
          <MdContainer data-section="3" content={`3 - ${DUMMY_CONTENT}`} />
          <ProTip number={2} content={PRO_TIPS[0](company)} />
          <MdContainer data-section="4" content={`4 - ${DUMMY_CONTENT}`} />
          <ProTip number={3} content={PRO_TIPS[1](company)} />
          <MdContainer data-section="5" content={`5 - ${DUMMY_CONTENT}`} />
          <ProTip number={4} content={PRO_TIPS[2](company)} />
          <MdContainer data-section="6" content={`6 - ${DUMMY_CONTENT}`} />
          <MdContainer data-section="7" content={`7 - ${DUMMY_CONTENT}`} />
          <MdContainer data-section="8" content={`8 - ${DUMMY_CONTENT}`} />
        </div>
      </section>

      <CompanyFooter id="company-footer" company={company} />
    </main>
  );
};

export default CompanyPage;
