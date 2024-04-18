import { BaseProps } from "@/components/types";
import Markdown from "react-markdown";

interface MdContainer extends BaseProps {
  content: string;
}
const MdContainer = (props: MdContainer) => {
  const { content, className = "", dataId, ...baseProps } = props;

  if (!content) return null;
  return (
    <div
      className={`${className} w-full mb-5 rounded-lg border break-words border-gray-400 bg-gray-200 p-10 md:p-16`}
      data-id={dataId}
      {...baseProps}
    >
      <Markdown className="prose lg:prose-xl">{content}</Markdown>
    </div>
  );
};

export default MdContainer;
