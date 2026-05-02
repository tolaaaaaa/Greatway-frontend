import { FormState } from "@/types";
import z from "zod";

export const createCareerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  companyName: z.string().min(1, "Company name is required"),
  location: z.enum(["remote", "on-site"], {
    error: "Location must be remote or on-site",
  }),
  employmentType: z.enum(["full-time", "contract", "part-time", "internship"], {
    error: "Employment type must be full-time, contract, internship or part-time",
  }),
  description: z.string().min(1, "Description is required"),
});

export type CreateCareerDto = z.infer<typeof createCareerSchema>;
export type CreateCareerFormState = FormState<CreateCareerDto>;

export type CreateCareerFormErrors = CreateCareerFormState["errors"];

export type CreateCareerFormValues = CreateCareerFormState["values"];
