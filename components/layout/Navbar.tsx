"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="bg-[#6B7BF7] px-8 py-5">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink data-testid="navbar-logo">
                  <Image
                    src="/Insurity24 Logo.png"
                    alt="Insurity24 Symbol"
                    width={200}
                    height={200}
                  />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10 font-semibold text-lg">
                  Versicherungen
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] gap-3 p-4 grid-cols-3">
                    {/* Erste Spalte */}
                    <div className="space-y-3">
                      <Link
                        href="/kfz"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#6B7BF7]/10 focus:bg-[#6B7BF7]/10"
                      >
                        <div className="text-sm font-medium leading-none">
                          KFZ
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Schütze dein Fahrzeug optimal mit unserer
                          KFZ-Versicherung.
                        </p>
                      </Link>
                      <Link
                        href="/haftpflicht"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#6B7BF7]/10 focus:bg-[#6B7BF7]/10"
                      >
                        <div className="text-sm font-medium leading-none">
                          Haftpflicht
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Private Haftpflicht für alle Lebenslagen.
                        </p>
                      </Link>
                    </div>
                    {/* Zweite Spalte */}
                    <div className="space-y-3">
                      <Link
                        href="/unfall"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#6B7BF7]/10 focus:bg-[#6B7BF7]/10"
                      >
                        <div className="text-sm font-medium leading-none">
                          Unfall
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Umfassender Schutz bei Unfällen.
                        </p>
                      </Link>
                      <Link
                        href="/hausrat"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#6B7BF7]/10 focus:bg-[#6B7BF7]/10"
                      >
                        <div className="text-sm font-medium leading-none">
                          Hausrat
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Absicherung deines Eigentums zuhause.
                        </p>
                      </Link>
                    </div>
                    {/* Dritte Spalte */}
                    <div className="space-y-3">
                      <Link
                        href="/wohngebaeude"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#6B7BF7]/10 focus:bg-[#6B7BF7]/10"
                      >
                        <div className="text-sm font-medium leading-none">
                          Wohngebäude
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Rundum-Schutz für deine Immobilie.
                        </p>
                      </Link>
                      <Link
                        href="/rechtsschutz"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#6B7BF7]/10 focus:bg-[#6B7BF7]/10"
                      >
                        <div className="text-sm font-medium leading-none">
                          Rechtsschutz
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Rechtliche Absicherung in allen Lebenslagen.
                        </p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/konto"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <User className="w-8 h-8 text-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
