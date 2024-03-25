import { BaseProps } from "@/components/types";
import { ReactNode } from "react";
import LightbulbShinningIcon from "@svg/lightbulb-shinning.svg";

interface ProTip extends BaseProps {
  number: number;
  content: string | ReactNode;
}

const ProTip = (props: ProTip) => {
  const { className, content, number } = props;

  const textClassNames = "leading-loose mt-5 text-xs lg:text-base";

  return (
    <div
      className={`${className} px-16 py-10 rounded-lg flex flex-col bg-purple-500 text-white mb-5`}
    >
      <div className="flex items-center">
        <LightbulbShinningIcon className="w-7 mr-3" />
        <h1 className="font-bold">Pathrise Pro Tip #{number}</h1>
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
