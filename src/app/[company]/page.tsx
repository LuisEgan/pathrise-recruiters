import { getRecruiter } from "@/api/recruiters";
import Testimonial, {
  Testimonial as TestimonialProps,
} from "@/components/Testimonial";
import MdContainer from "../../components/Markdown/MdContainer";
import ProTip from "../../components/ProTip";
import CompanyFooter from "./CompanyFooter";
import CompanyHeader from "./CompanyHeader";
import { BLOCK_SECTIONS_ANCHORS } from "./contants";
import { BASE_PATH } from "@/utils/constants";

const TESTIMONIAL_PROPS: TestimonialProps = {
  roundedPic: true,
  author: "Niema Majidimehr",
  company: "Pathrise",
  position: "Pathrise Recruiting Specialist ",
  picUrl: `${BASE_PATH}/jpg/Neima.jpeg`,
  quote: "Treat recruiters like human beings if you wish to be noticed",
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

  return <div></div>;
};

export default CompanyPage;
