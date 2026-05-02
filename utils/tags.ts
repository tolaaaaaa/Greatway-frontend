import "server-only";

export enum API_Tags {
  PROPERTIES = "properties",
  USERS = "users",
  GALLERY = "gallery",
  TRAIL = "trail"
}

export function getTag(name: API_Tags, listId?: string) {
  return {
    name,
    default: name + (listId ?? "LIST"),
    createTag: (id: string) => name + id,
  };
}
