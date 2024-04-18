import Image from "next/image";
import { BaseProps } from "../types";

export interface Testimonial extends BaseProps {
  author: string;
  picUrl: string;
  position: string;
  company: string;
  quote: string;
  roundedPic?: boolean;
}
const Testimonial = (props: Testimonial) => {
  const {
    className = "",
    roundedPic,
    author,
    company,
    picUrl,
    position,
    quote,
  } = props;
  return (
    <div className={`flex h-full items-center overflow-hidden ${className}`}>
      <div>
        <div
          className={`relative w-12 h-12 mr-10 ${
            roundedPic ? "rounded-full" : "rounded-xl"
          } lg:w-24 lg:h-24`}
        >
          <Image
            className={`object-cover grayscale ${roundedPic ? "rounded-full" : ""}`}
            src={picUrl}
            alt={"quote author"}
            fill
            sizes="100% 100%"
          />
        </div>
      </div>

      <div className="flex flex-col text-xxs md:text-base lg:text-xl">
        <p className="mb-3">❝{quote}❞</p>

        <div className="flex items-center justify-between w-full">
          <span className="font-bold">{author}</span>
          <span className="text-xxs lg:text-xs">
            {position} @ {company}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
