"use client";

import NotificationBell from "@/app/dashboard/notification/notifcation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TopbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  user: {
    id: string;
    fullName: string;
    role: UserRole;
    email: string;
    avatarUrl?: string;
  };
}

export default function Topbar({ onMenuClick, showMenuButton = true, user }: TopbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const getUserInitials = () => {
    const names = user.fullName.trim().split(/\s+/);
    const initials = names.slice(0, 2).map((name) => name[0]).join("");
    return initials.toUpperCase();
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/dashboard/properties/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-border font-cambay">
      <div className="flex items-center justify-between h-12 sm:h-16 lg:h-20 px-4 sm:px-6 lg:px-11.25">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-surface-secondary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          )}

          {/* Desktop Search */}
          <div className="hidden md:block relative w-full max-w-97.75">
            <input
              type="search"
              name="search"
              placeholder="Search Here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full h-8.75 sm:h-10 lg:h-8.75 pl-4 pr-10 bg-field-background border border-border rounded-[19px] text-foreground text-sm sm:text-base placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft-hover transition-all"
            />
            <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 hover:bg-surface-secondary rounded-lg transition-colors ml-auto"
            aria-label="Toggle search"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-10">
          <button
            className="relative w-8 h-8 sm:w-8.25 sm:h-8.25 flex items-center justify-center bg-surface-secondary rounded-[3.67px] hover:bg-surface-tertiary transition-colors"
            aria-label="Notifications"
          >
            <NotificationBell />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full sm:hidden" />
          </button>

          <div className="hidden sm:block w-px h-6 sm:h-8 lg:h-[48.5px] bg-border" />

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-2.75">
            <div className="hidden sm:block text-right">
              <h2 className="text-sm lg:text-xl font-bold text-foreground leading-tight lg:leading-7.5 tracking-[0.01em]">
                {user.fullName}
              </h2>
              <p className="text-xs lg:text-base text-muted leading-tight lg:leading-6.25 capitalize">
                {user.role === "super_admin" ? "Super Admin" : user.role}
              </p>
            </div>

            <button className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-14.5 lg:h-13.75 rounded-full sm:rounded-[5px] overflow-hidden bg-surface-tertiary ring-2 ring-border hover:ring-accent transition-all">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={`${user.fullName} profile`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-accent text-white font-bold text-sm sm:text-base lg:text-lg">
                  {getUserInitials()}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search - Expandable */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3 bg-surface border-t border-border">
          <div className="relative w-full">
            <input
              type="search"
              name="search"
              placeholder="Search Here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full h-10 pl-4 pr-10 bg-field-background border border-border rounded-[19px] text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft-hover transition-all"
              autoFocus
            />
            <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          </div>
        </div>
      )}
    </header>
  );
}