import { BaseProps } from "@/components/types";
import { COMPANY_SECTIONS } from "../contants";

interface AnchorsList extends BaseProps {
  fullList?: boolean;
}

const AnchorsList = (props: AnchorsList) => {
  const { fullList, className: classNameProp = "" } = props;

  const className = `flex flex-col overflow-y-auto ${classNameProp}`;

  return (
    <div className={className}>
      {COMPANY_SECTIONS.map((section, index) => (
        <span
          key={index}
          className="mb-3 2xl:mb-7"
          id={`${index}`}
        >
          {index + 1}.{" "}
          {typeof section === "function" ? section("reddit") : section}
        </span>
      ))}

      {fullList ? (
        <>
          {COMPANY_SECTIONS.map((section, index) => (
            <span key={index} className="mb-3 2xl:mb-7">
              {index + 1}.{" "}
              {typeof section === "function" ? section("reddit") : section}
            </span>
          ))}
        </>
      ) : (
        <span className="text-xxs 2xl:text-xl">+ 5 more</span>
      )}
    </div>
  );
};

export default AnchorsList;
