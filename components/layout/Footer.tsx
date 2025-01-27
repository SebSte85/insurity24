import Link from "next/link";

export const Footer = () => {
  const footerLinks = {
    Produkte: [
      { title: "KFZ-Versicherung", href: "/kfz" },
      { title: "Haftpflichtversicherung", href: "/haftpflicht" },
      { title: "Hausratversicherung", href: "/hausrat" },
      { title: "Unfallversicherung", href: "/unfall" },
      { title: "Wohngebäudeversicherung", href: "/wohngebaeude" },
      { title: "Rechtsschutzversicherung", href: "/rechtsschutz" },
    ],
    Unternehmen: [
      { title: "Impressum", href: "/impressum" },
      { title: "Datenschutz", href: "/datenschutz" },
      { title: "Cookies", href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-black text-white py-12 mt-auto">
      <div className="max-w-[600px] mx-auto px-8 flex items-start justify-between gap-16">
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="font-semibold text-lg mb-6">{category}</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};
