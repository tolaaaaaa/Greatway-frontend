"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Bell, Check, CheckCheck, X } from "lucide-react";
import {
  NotificationData,
  getUnreadNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/actions/notification.action";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = () => {
    startTransition(async () => {
      const data = await getUnreadNotifications();
      setNotifications(data);
    });
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = (id: string) => {
    startTransition(async () => {
      await markNotificationAsRead(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    });
  };

  const handleMarkAllAsRead = () => {
    startTransition(async () => {
      await markAllNotificationsAsRead();
      setNotifications([]);
    });
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell — matches your existing button style exactly */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative w-8 h-8 sm:w-8.25 sm:h-8.25 cursor-pointer flex items-center justify-center bg-surface-secondary rounded-[3.67px] hover:bg-surface-tertiary transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-accent" strokeWidth={1.48} />
        {unreadCount > 0 ? (
          <span className="absolute -top-1 -right-1 min-w-4 h-4 flex items-center justify-center rounded-full bg-danger text-white text-[9px] font-bold px-1 leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : (
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full sm:hidden" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-85 sm:w-95 rounded-2xl border border-border bg-surface shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground font-cambay">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-accent-soft text-accent text-xs font-semibold">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={isPending}
                  className="flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors px-2 py-1 rounded-lg hover:bg-default font-cambay"
                >
                  <CheckCheck size={13} />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg text-muted hover:text-foreground hover:bg-default transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-95 overflow-y-auto">
            {isPending && notifications.length === 0 ? (
              <div className="flex flex-col gap-3 p-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-default mt-2 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-default rounded w-3/4" />
                      <div className="h-3 bg-default rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="w-12 h-12 rounded-[3.67px] bg-surface-secondary flex items-center justify-center mb-3">
                  <Bell size={20} className="text-muted" strokeWidth={1.48} />
                </div>
                <p className="text-sm font-semibold text-foreground font-cambay">
                  All caught up
                </p>
                <p className="text-xs text-muted mt-1">No new notifications</p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    isPending={isPending}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationItem({
  notification,
  onMarkAsRead,
  isPending,
}: {
  notification: NotificationData;
  onMarkAsRead: (id: string) => void;
  isPending: boolean;
}) {
  const message =
    typeof notification.data?.message === "string"
      ? notification.data.message
      : "You have a new notification";

  return (
    <li className="flex items-start gap-3 px-4 py-3 hover:bg-surface-secondary/50 transition-colors group">
      <div className="mt-2 w-2 h-2 rounded-full bg-accent shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug line-clamp-2 font-cambay">
          {message}
        </p>
        <p className="text-xs text-muted mt-1">{timeAgo(notification.createdAt)}</p>
      </div>
      <button
        onClick={() => onMarkAsRead(notification.id)}
        disabled={isPending}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/10 shrink-0 mt-0.5"
        aria-label="Mark as read"
      >
        <Check size={13} />
      </button>
    </li>
  );
}