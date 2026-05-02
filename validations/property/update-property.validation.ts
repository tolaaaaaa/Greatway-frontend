import { createPropertySchema } from "./create-property.validation";
import { z } from "zod";
import { FormState } from "@/types";

export const updatePropertySchema = createPropertySchema.extend({
  imageUrls: z.array(z.string()).optional().default([]),

  videoUrl: z.string().optional().default(""),

  saleSupportAvatar: z.string().optional(),
});

export type UpdatePropertyDto = z.infer<typeof updatePropertySchema>;
export type UpdatePropertyFormState = FormState<UpdatePropertyDto>;
export type UpdatePropertyFormErrors = UpdatePropertyFormState["errors"];
export type UpdatePropertyFormValues = UpdatePropertyFormState["values"];
