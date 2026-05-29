"use server";

import { ServerApiClient } from "@/utils/api-server";

export type NotificationData = {
  id: string;
  notifiableId: string;
  type: string;
  data: Record<string, unknown>;
  readAt: string | null;
  createdAt: string;
};

export async function getNotifications(): Promise<NotificationData[]> {
  const response = await ServerApiClient.get<NotificationData[]>("/notifications");
  console.log(response)
  if (response.code >= 400) return [];
  return response.data;
}

export async function getUnreadNotifications(): Promise<NotificationData[]> {
  const response = await ServerApiClient.get<NotificationData[]>("/notifications/unread");
  if (response.code >= 400) return [];
  return response.data;
}

export async function markNotificationAsRead(id: string): Promise<boolean> {
  const response = await ServerApiClient.patch(`/notifications/${id}/read`, {});
  return response.code < 400;
}

export async function markAllNotificationsAsRead(): Promise<boolean> {
  const response = await ServerApiClient.patch("/notifications/read-all", {});
  return response.code < 400;
}