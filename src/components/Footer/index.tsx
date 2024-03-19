import Image from "next/image";
import LinksCol from "./LinksCol";
import { LINKS, SOCIAL_NETWORKS_ICONS } from "./constants";

const Footer = () => {
  return (
    <section>
      <div className="flex flex-col bg-gradient-to-b from-purple-500 to-purple-400 py-16 px-10 md:px-20">
        <div className="grid grid-cols-12 max-w-7xl m-auto">
          <hr className="col-span-12 border-purple-400 mb-10" />
          <LinksCol title="Information" links={LINKS.information} />
          <LinksCol title="Company" links={LINKS.company} />
          <LinksCol title="Resources" links={LINKS.resources} />
          <LinksCol
            title="Industry Tracks"
            links={LINKS["industry tracks"].slice(0, 6)}
          />
          <LinksCol links={LINKS["industry tracks"].slice(6, 12)} />
          <LinksCol links={LINKS["industry tracks"].slice(12)} />
        </div>
        <div className="flex flex-col items-center justify-center mt-5 md:flex-row md:items-start">
          <div className="flex mb-5 md:mb-0 md:mr-5">
            {SOCIAL_NETWORKS_ICONS.map(({ link, iconPath, title }) => (
              <a
                key={link}
                className="relative w-5 h-5 mr-5 opacity-40"
                href={link}
                target="__blank"
                title={title}
              >
                <Image
                  className="absolute h-full w-full object-cover"
                  src={iconPath}
                  alt={title}
                  fill
                />
              </a>
            ))}
          </div>

          <div className="flex items-center text-xs ml-5 text-purple-100">
            © Copyright {new Date().getFullYear()} Pathrise - All rights
            reserved
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
