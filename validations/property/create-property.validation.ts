import { z } from "zod";
import { FormState } from "@/types";


export const createPropertySchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" }),
  
  salesPrice: z
    .string()
    .min(1, { message: "Sales price is required" }),
  
  location: z
    .string()
    .min(1, { message: "Location is required" }),
  
  description: z
    .string()
    .min(1, { message: "Description is required" }),
  
  supportInCharge: z
    .string()
    .min(1, { message: "Support person is required" }),
  
  whatsAppNumber: z
    .string()
    .min(1, { message: "WhatsApp number is required" }),

  imageUrls: z.array(z.string()).optional().default([]),
    
  videoUrl: z.string().optional().default(""),

  saleSupportAvatar: z.string().optional(),
  
  altNumber: z
    .string()
    .min(1, { message: "Alternative number is required" }),
  
  features: z
    .array(
      z.object({
        id: z.string().optional(),
        description: z
          .string()
          .min(1, { message: "Feature description is required" }),
        icon: z.string().optional().nullable(),
      })
    )
    .optional()
    .default([]),
});



// Export types
export type CreatePropertyDto = z.infer<typeof createPropertySchema>;

export type CreatePropertyFormState = FormState<CreatePropertyDto>;

export type CreatePropertyFormErrors = CreatePropertyFormState["errors"];

export type CreatePropertyFormValues = CreatePropertyFormState["values"];
