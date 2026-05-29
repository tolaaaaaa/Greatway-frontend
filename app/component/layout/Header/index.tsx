"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
    const pathname = usePathname();

    const isActiveRoute = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="app-container">
            <nav className="py-6 flex justify-between items-center">
                <div>
                    {/* logo */}
                    <Image src="/logo.svg" alt="logo" width={150} height={120} />
                </div>

                <div className="flex gap-8">
                    {NAV_LINKS.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className={`text-[16px] font-bold ${
                                isActiveRoute(href)
                                    ? "text-accent"
                                    : "text-white/80 hover:text-white transition-colors"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                <div>
                    <Link href={"/book"}>
                        <Button variant="primary" className="text-[16px] inline-flex justify-center items-center py-2 px-4">
                            Book Now
                        </Button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}