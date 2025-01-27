import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const navItems = [
    "KFZ",
    "Haftpflicht",
    "Unfall",
    "Hausrat",
    "Wohngebäude",
    "Rechtsschutz",
  ];

  return (
    <nav className="bg-[#6B7BF7] px-8 py-5">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <Image
          src="/Insurity24 Logo.png"
          alt="Insurity24 Symbol"
          width={200}
          height={200}
        />

        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-white hover:text-gray-100 transition-colors text-base font-medium"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
