export interface LinksColProps {
  title?: string;
  links: Array<{ title: string; link: string }>;
}

const LinksCol = (props: LinksColProps) => {
  const { links, title } = props;

  return (
    <div className="col-span-12 flex flex-col text-center mx-4 md:text-left md:col-span-2">
      {title ? (
        <span className="font-bold text-white mb-3 mt-5 text-sm md:mt-0">
          {title.toUpperCase()}
        </span>
      ) : (
        <></>
      )}
      <div className="flex flex-col">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.link}
            className="text-purple-100 text-sm hover:text-white mb-5"
            target="_blank"
            rel="noreferrer"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinksCol;
