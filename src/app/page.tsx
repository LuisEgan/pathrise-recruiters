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
  picUrl: "/png/Felix.png",
  quote:
    "These guides helped me prep for a final round interview with Delloite, so thankful for these!",
};

export default function Home() {
  const SECTION_CLASSNAMES = "m-auto mb-16";
  return (
    <main className="w-full bg-gray-100 py-5 px-3 md:p-7">
      <section
        className={`${SECTION_CLASSNAMES} flex flex-col md:flex-row md:justify-between`}
      >
        <div className="h-[90vh] mb-10 md:flex md:flex-col md:w-5/12">
          <div className="relative w-full h-full flex flex-col p-10 rounded-lg bg-purple-500 text-white pb-36 mb-10 md:h-[80%] md:mb-0 md:pb-10 md:rounded-bl-none md:rounded-br-none lg:py-16 lg:px-20">
            <div className="flex items-center text-xs mb-10">
              <LogoIcon className="w-16 svg-white" />
              <span className="ml-3">Company Resources</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-purple-100 mb-3 lg:text-sm">
                Pathrise Guides
              </span>
              <p className="font-serif font-bold text-2xl md:text-xl mb-7 xl:text-4xl">
                How to get hired according to real recruiters
              </p>
              <p className="text-sm mb-4 lg:text-lg">
                Learn the best ways we’ve found to get hired by 60+ companies
                and counting.
              </p>
              <a
                target="__blank"
                href="https://www.pathrise.com/apply?utm_source=recruiter&utm_medium=content"
              >
                <Button
                  title="Get your dream job"
                  className="mt-5 bg-white w-10/12 md:mt-0 xl:w-8/12 lg:mt-[10%]"
                  textColorClassName="text-black"
                />
              </a>
            </div>

            <PaperPlaneManIcon className="absolute right-3 bottom-0 w-1/2" />
          </div>

          <div className="hidden h-[25%] px-10 py-5 rounded-bl-lg rounded-br-lg bg-white md:flex">
            <Testimonial {...TESTIMONIAL_PROPS} />
          </div>
        </div>

        <Filter className="md:w-7/12 md:ml-5" />
      </section>

      <section
        className={`${SECTION_CLASSNAMES} flex flex-col w-full md:w-10/12 md:flex-row`}
      >
        <VideoPlayer
          showSkipControls
          url={PATHRISE_VIDEO_URL}
          header={<VideoHeader />}
          className="my-16 w-full md:my-0"
          playerContainerClassName="h-[70vh]"
        />

        <div className="flex flex-col md:justify-between md:w-5/12 md:ml-16">
          <div>
            <div className="flex justify-center items-center mb-10 md:mt-32 lg:mt-40">
              <div className="relative w-16 h-16 mr-5 rounded-xl md:rounded-full md:w-10 md:h-10 lg:w-16 lg:h-16">
                <Image
                  className="object-cover md:rounded-full"
                  src={"/png/image.png"}
                  alt={"recruiter"}
                  fill
                  sizes="100% 100%"
                />
              </div>

              <span className="font-serif text-xl text-purple-500 font-bold md:text-base lg:text-2xl">
                Erica Holloway
              </span>
            </div>

            <p className="text-center md:text-xs md:text-left lg:text-lg 2xl:text-2xl">
              Erica Holloway is a recruiter with close to a decade of talent
              acquisition experience in the ed-tech and startup space. <br />
              <br />
              She currently leads Pathrise&apos;s recruiting efforts, touching
              on roles in career coaching, operations, engineering, sales,
              marketing and more. She resides in the San Francisco Bay Area.
            </p>
          </div>

          <div className="hidden md:flex">
            <ArrowsIcon className="hidden mr-3 md:block" />
            <span className="text-xs lg:text-xl">Jump to a section!</span>
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

      <section className={`${SECTION_CLASSNAMES} w-full !mb-0`}>
        <div className="flex flex-col relative px-5 md:px-0 md:mt-52 md:flex-row md:justify-between md:h-[45vh]">
          <div className="text-left md:text-center md:w-full z-10">
            <div className="font-serif mb-7">
              <p className="text-xl font-bold md:text-2xl">
                Meet with our{" "}
                <span className="text-purple-500">recruiting experts</span>
              </p>
            </div>

            <p className="mb-10 w-full md:w-5/12 md:m-auto md:text-center md:mb-5">
              Pathrise Recruiting Specialists are current and former recruiters
              at top companies like Amazon. Now they’re here to help you land
              your dream job.
            </p>

            <div className="hidden md:flex justify-center">
              <Button
                category="dark"
                title="Get the guides"
                className="mr-3 bg-black"
              />
              <Button title="Get your dream job" />
            </div>
          </div>

          <div className="relative hidden rounded-xl left-0 top-0 w-full h-full bg-gray-100 md:absolute md:block">
            <Image
              className="origin-bottom object-cover"
              src={"/webp/fellows-transparent.webp"}
              alt={"experts"}
              fill
            />
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
