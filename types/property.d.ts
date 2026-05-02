export interface Property {
  id: string;
  title: string;
  salesPrice: string;
  location: string;
  description: string;
  status: "listed" | "unlisted" | "sold"
  imageUrls: string[];
  saleSupportAvatar: string;
  features: PropertyFeature[];
  videoUrl: string;
  supportInCharge: string;
  whatsAppNumber: string;
  altNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyFeature {
  id: string;
  description: string;
  icon: string | null | React;
}