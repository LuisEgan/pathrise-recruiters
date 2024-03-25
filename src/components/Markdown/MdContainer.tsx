import { BaseProps } from "@/components/types";
import Markdown from "react-markdown";

interface MdContainer extends BaseProps {
  content: string;
}
const MdContainer = (props: MdContainer) => {
  const { content, className = "", dataId, ...baseProps } = props;
  return (
    <div
      className={`${className} w-full mb-5 bg-transparent rounded-lg border border-gray-300 p-10`}
      data-id={dataId}
      {...baseProps}
    >
      <Markdown className="prose lg:prose-xl">{content}</Markdown>
    </div>
  );
};

export default MdContainer;
