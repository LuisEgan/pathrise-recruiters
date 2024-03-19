import Button from "@/components/Button";
import Filter from "@/components/Filter";
import Testimonial, {
  Testimonial as TestimonialProps,
} from "@/components/Testimonial";
import VideoPlayer from "@/components/Video";
import { PATHRISE_VIDEO_URL } from "@/components/constants";
import ArrowsIcon from "@svg/arrows.svg";
import PaperPlaneManIcon from "@svg/characters/character-paper-plane.svg";
import LogoIcon from "@svg/pathrise-logo.svg";
import Image from "next/image";
import VideoHeader from "./VideoHeader";

const TESTIMONIAL_PROPS: TestimonialProps = {
  roundedPic: true,
  author: "Felix M.",
  company: "Delloite",
  position: "Data Analyst",
  picUrl: "/png/image.png",
  quote:
    "These guides helped me prep for a final round interview with Delloite, so thankful for these!",
};

export default function Home() {
  const SECTION_CLASSNAMES = "w-full m-auto mb-16";
  return (
    <main className="w-full bg-gray-100 py-5 px-3 md:p-7">
      <section
        className={`${SECTION_CLASSNAMES} flex flex-col md:flex-row md:justify-between`}
      >
        <div className="h-[90vh] mb-10 md:flex md:flex-col md:w-5/12">
          <div className="relative w-full h-full flex flex-col p-7 rounded-lg bg-purple-500 text-white pb-36 mb-10 md:h-[80%] md:mb-0 md:pb-10 md:rounded-bl-none md:rounded-br-none 2xl:p-14">
            <div className="flex items-center text-xs mb-10 2xl:text-lg 2xl:mb-20">
              <LogoIcon className="w-16 svg-white 2xl:w-40" />
              <span className="ml-3">Company Resources</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-purple-100 mb-3 lg:text-sm 2xl:text-lg 2xl:mb-10">
                Pathrise Guides
              </span>
              <p className="font-bold text-2xl md:text-xl mb-7 xl:text-5xl 2xl:text-6xl 2xl:mb-14">
                How to get hired according to real recruiters
              </p>
              <p className="text-sm mb-4 lg:text-lg 2xl:text-4xl">
                Learn the best ways we’ve found to get hired by 60+ companies
                and counting.
              </p>

              <Button
                title="Get your dream job"
                className="mt-5 bg-white w-10/12 md:mt-0 md:w-8/12 lg:mt-[10%] 2xl:mt-[30%]"
                textColorClassName="text-black"
              />
            </div>

            <PaperPlaneManIcon className="absolute right-3 bottom-0 w-1/2" />
          </div>

          <div className="hidden h-[20%] p-7 rounded-bl-lg rounded-br-lg bg-white md:flex 2xl:p-14">
            <Testimonial {...TESTIMONIAL_PROPS} />
          </div>
        </div>

        <Filter className="md:w-7/12 md:ml-5" />
      </section>

      <section className={`${SECTION_CLASSNAMES} flex flex-col md:flex-row`}>
        <VideoPlayer
          showSkipControls
          url={PATHRISE_VIDEO_URL}
          header={<VideoHeader />}
          className="my-16 w-full md:my-0"
          playerContainerClassName="h-[70vh]"
        />

        <div className="flex flex-col md:justify-between md:w-5/12 md:ml-16">
          <div className="xl:px-12 2xl:px-24">
            <div className="flex justify-center items-center mb-10 md:mt-24 2xl:mt-40 2xl:mb-20">
              <div className="relative w-16 h-16 mr-5 rounded-xl md:rounded-full md:w-10 md:h-10 lg:w-16 lg:h-16 2xl:w-24 2xl:h-24">
                <Image
                  className="object-cover md:rounded-full"
                  src={"/png/image.png"}
                  alt={"recruiter"}
                  fill
                  sizes="100% 100%"
                />
              </div>

              <span className="text-xl text-purple-500 font-bold md:text-base lg:text-xl 2xl:text-5xl">
                Erica Holloway
              </span>
            </div>

            <p className="text-center md:text-xs md:text-left lg:text-base 2xl:text-3xl">
              Erica Holloway is a recruiter with close to a decade of talent
              acquisition experience in the ed-tech and startup space. <br />
              <br />
              She currently leads Pathrise's recruiting efforts, touching on
              roles in career coaching, operations, engineering, sales,
              marketing and more. She resides in the San Francisco Bay Area.
            </p>
          </div>

          <div className="hidden md:flex">
            <ArrowsIcon className="hidden mr-3 md:block" />
            <span className="text-xs lg:text-base 2xl:text-xl">
              Jump to a section!
            </span>
          </div>
        </div>
      </section>

      <section className={`md:hidden ${SECTION_CLASSNAMES}`}>
        <div className="flex flex-col p-7 rounded-lg bg-purple-500 text-white">
          <p className="text-xl font-bold text-center mb-10">
            Kind words for our <br /> company guides
          </p>

          <Testimonial {...TESTIMONIAL_PROPS} />
        </div>
      </section>

      <section className={SECTION_CLASSNAMES}>
        <div className="flex flex-col md:flex-row">
          <div>
            <div className="mb-10">
              <p className="text-xl font-bold 2xl:text-5xl">
                Meet with our{" "}
                <span className="text-purple-500">recruiting experts</span>
              </p>
            </div>

            <p className="mb-10 2xl:text-4xl">
              Pathrise Recruiting Specialists are current and former recruiters
              at top companies like Amazon. Now they’re here to help you land
              your dream job.
            </p>

            <div className="hidden md:flex">
              <Button
                category="dark"
                title="Get the guides"
                className="mr-5 bg-black"
              />
              <Button title="Get your dream job" />
            </div>
          </div>

          <div className="relative flex flex-col justify-center items-center w-full h-72 overflow-hidden md:hidden">
            <Image
              className="origin-bottom blur-[2px] object-cover"
              src={"/png/fellows-desktop-v3.png"}
              alt={"experts"}
              fill
            />

            <Button
              title="Get the guides"
              textColorClassName="text-purple-500"
              className="mb-5 z-10 w-7/12 bg-white border border-purple-500"
            />
            <Button title="Get your dream job" className="mb-5 z-10 w-7/12" />
          </div>
        </div>
      </section>
    </main>
  );
}
