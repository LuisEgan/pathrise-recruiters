import Image from "next/image";
import { BaseProps } from "../types";
import { Company } from "@/utils/types";
import { parseLogoName } from "@/utils/strings";

interface CompanyCard extends BaseProps {
  company: Company;
  onClick?: () => void;
  isLoading?: boolean;
}

const CompanyCard = (props: CompanyCard) => {
  const { company, onClick, isLoading } = props;
  if (!company) return <div>No company :(</div>;

  const { name } = company;

  return (
    <div
      className={`flex flex-col max-h-44 bg-white rounded-2xl shadow-sm w-full hover:cursor-pointer ${
        isLoading ? "fade-in" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-center items-center flex-1 p-3">
        <div
          className={`relative w-36 h-16 lg:h-28 rounded-lg ${
            isLoading ? "loading-skeleton" : ""
          }`}
        >
          {!isLoading && (
            <Image
              className="absolute h-full w-full object-contain"
              src={`/logos/companies/${parseLogoName(name)}.webp`}
              alt={name}
              fill
            />
          )}
        </div>
      </div>
      <div className="pb-5 text-center overflow-hidden overflow-ellipsis text-nowrap w-9/12 m-auto">
        <span
          className={`font-inter text-xs font-bold mb-2 lg:text-sm ${
            isLoading ? "text-white" : ""
          }`}
        >
          {isLoading ? "loading" : name}
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;
