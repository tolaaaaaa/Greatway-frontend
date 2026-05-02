import { FormState } from "@/types";
import z from "zod";

export const updateCareerSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  companyName: z.string().min(1, "Company name is required").optional(),
  location: z
    .enum(["remote", "on-site"], {
      error: "Location must be remote or on-site",
    })
    .optional(),
  employmentType: z
    .enum(["full-time", "contract", "part-time", "internship"], {
      error:
        "Employment type must be full-time, contract, internship or part-time",
    })
    .optional(),
  description: z.string().min(1, "Description is required").optional(),
});

export type UpdateCareerDto = z.infer<typeof updateCareerSchema>;
export type UpdateCareerFormState = FormState<UpdateCareerDto>;

export type UpdateCareerFormErrors = UpdateCareerFormState["errors"];

export type UpdateCareerFormValues = UpdateCareerFormState["values"];
