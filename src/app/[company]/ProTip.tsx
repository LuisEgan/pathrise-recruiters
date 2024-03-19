import { BaseProps } from "@/components/types";
import { ReactNode } from "react";
import LightbulbShinningIcon from "@svg/lightbulb-shinning.svg";

interface ProTip extends BaseProps {
  number: number;
  content: string | ReactNode;
}

const ProTip = (props: ProTip) => {
  const { className, content, number } = props;

  const textClassNames = "leading-loose mt-5 text-xs lg:text-base 2xl:text-4xl";

  return (
    <div
      className={`${className} p-7 rounded-lg flex flex-col bg-purple-500 text-white mb-5 2xl:p-12`}
    >
      <div className="flex items-center 2xl:mb-10">
        <LightbulbShinningIcon className="w-7 mr-3 2xl:w-16 2xl:mr-10" />
        <h1 className="font-bold 2xl:text-5xl">Pathrise Pro Tip #{number}</h1>
      </div>

      {typeof content === "string" ? (
        <p className={textClassNames}>{content}</p>
      ) : (
        <div className={textClassNames}>{content}</div>
      )}
    </div>
  );
};

export default ProTip;
