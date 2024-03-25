import Image from "next/image";
import { BaseProps } from "../types";

interface CompanyCard extends BaseProps {
  company: {
    image: string;
    name: string;
  };
  onClick?: () => void;
}

const CompanyCard = (props: CompanyCard) => {
  const { company, onClick } = props;
  if (!company) return <div>No company :(</div>;

  const { image, name } = company;

  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-sm w-full hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-center items-center flex-1 p-3">
        <div className="relative w-32 h-16 lg:h-28">
          <Image
            className="absolute h-full w-full object-cover"
            src={image}
            alt={name}
            fill
          />
        </div>
      </div>
      <div className="p-3 text-center">
        <h3 className="inter text-xs font-bold mb-2 lg:text-sm">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default CompanyCard;
