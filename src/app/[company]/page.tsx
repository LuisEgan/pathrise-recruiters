import Testimonial, {
  Testimonial as TestimonialProps,
} from "@/components/Testimonial";
import CompanyFooter from "./CompanyFooter";
import CompanyHeader from "./CompanyHeader";
import MdContainer from "./MdContainer";
import ProTip from "./ProTip";
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
    <main className="w-full bg-gray-100 py-5 px-3 md:p-7">
      <CompanyHeader company={{ name: "amazon" }} />

      <section className="grid grid-cols-12">
        <div className="hidden md:block md:col-span-5"></div>

        <div className="flex flex-col col-span-12 md:col-span-7 md:pl-10">
          <MdContainer content={DUMMY_CONTENT} />
          <Testimonial
            {...TESTIMONIAL_PROPS}
            className="p-7 bg-purple-500 rounded-lg text-white mb-5"
          />
          <MdContainer content={DUMMY_CONTENT} />
          <MdContainer content={DUMMY_CONTENT} />
          <ProTip number={1} content={PRO_TIPS[0](company)} />
          <MdContainer content={DUMMY_CONTENT} />
          <ProTip number={2} content={PRO_TIPS[0](company)} />
          <MdContainer content={DUMMY_CONTENT} />
          <ProTip number={3} content={PRO_TIPS[1](company)} />
          <MdContainer content={DUMMY_CONTENT} />
          <ProTip number={4} content={PRO_TIPS[2](company)} />
          <MdContainer content={DUMMY_CONTENT} />
          <MdContainer content={DUMMY_CONTENT} />
          <MdContainer content={DUMMY_CONTENT} />
        </div>
      </section>

      <CompanyFooter id="company-footer" company={company} />
    </main>
  );
};

export default CompanyPage;
