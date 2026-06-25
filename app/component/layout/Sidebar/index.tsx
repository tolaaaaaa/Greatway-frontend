"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Images,
  Users,
  Settings,
} from "lucide-react";

interface SideBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function SideBar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SideBarProps) {
  const pathname = usePathname();

  const menuItems = [
    { 
      label: "Dashboard", 
      icon: LayoutDashboard, 
      href: "/dashboard" 
    },
    { 
      label: "Properties", 
      icon: Building2, 
      href: "/dashboard/properties" 
    },
    { 
      label: "Gallery", 
      icon: Images, 
      href: "/dashboard/gallery" 
    },
    { 
      label: "Careers", 
      icon: Users, 
      href: "/dashboard/careers" 
    },
    { 
      label: "Settings", 
      icon: Settings, 
      href: "/dashboard/settings" 
    },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="h-full flex flex-col bg-surface font-cambay">
      {/* Header with Logo */}
      <div className="p-4 lg:p-6">
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h2 className="text-foreground text-lg font-bold">Menu</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center lg:justify-start py-2">
          <Image
            src="/logo.svg"
            alt="Greatway Properties Ltd"
            width={120}
            height={72}
            className="w-auto h-12 lg:h-18"
            priority
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6">
        <ul className="space-y-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);

            return (
              <li key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-6 lg:px-20.5 py-3
                    transition-all duration-200
                    ${isActive
                      ? "text-accent font-bold bg-background"
                      : "text-muted hover:bg-surface-secondary hover:text-accent"
                    }
                  `}
                >
                  <Icon
                    className={`
                      w-5 h-5 shrink-0 transition-colors duration-200
                      ${isActive
                        ? "text-accent"
                        : "text-muted group-hover:text-accent"
                      }
                    `}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="text-sm lg:text-base leading-6.25">
                    {item.label}
                  </span>
                </Link>

                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.25 bg-accent rounded-r-[5px]" />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer - Copyright */}
      <div className="p-6">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <span className="text-muted text-sm lg:text-base leading-6.5">
              Copyright
            </span>
            <span className="text-muted text-sm lg:text-base leading-6.5 mx-0.5">
              ©
            </span>
            <span className="text-muted text-sm lg:text-base leading-6.5">
              2026
            </span>
          </div>
          <p className="text-muted/60 text-sm lg:text-base leading-6.5">
            Greatway Properties
          </p>
        </div>
      </div>
    </div>
  );
}