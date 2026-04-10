type FooterLinksColumnProps = {
  links: string[];
  title: string;
};

export function FooterLinksColumn({ links, title }: FooterLinksColumnProps) {
  return (
    <div className="flex  flex-col gap-4">
      <h4 className="text-h4 text-purple-800">{title}</h4>

      <div className=" flex flex-col gap-2">
        {links.map((link) => (
          <a
            className="text-body-m text-grayscale-500 transition-colors duration-200 hover:text-purple-500"
            href="#"
            key={link}
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}
