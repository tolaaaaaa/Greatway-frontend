"use client";

import { Button, Input } from "@/app/component/ui";
import { ArrowLeft } from "lucide-react";
import PageTitle from "../../_component/pageTitle";
import { useRouter } from "next/navigation";
import { CreateCareerFormValues } from "@/validations/career/create-career.validation";

const locationOptions = [
  { label: "Remote", key: "remote" },
  { label: "On-site", key: "on-site" },
];

const employmentOptions = [
  { label: "Full Time", key: "full-time" },
  { label: "Contract", key: "contract" },
  { label: "Part Time", key: "part-time" },
  { label: "Internship", key: "internship" },
];



type JobFormProps = {
  values: CreateCareerFormValues;
  onChange?: (values: CreateCareerFormValues) => void;
  onSave: (values: CreateCareerFormValues) => void;
  isSaving?: boolean;
  pageTitle?: string;
  errors?: Partial<Record<keyof CreateCareerFormValues, string>>;
};

export default function JobForm({
  values,
  onChange,
  onSave,
  isSaving = false,
  pageTitle = "Post New Job",
  errors = {},
}: JobFormProps) {
  const router = useRouter();

  const set = (key: keyof CreateCareerFormValues, value: string) =>
    onChange?.({ ...values, [key]: value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(values);
    e.preventDefault();
    onSave(values); 
  };

  return (
    <form onSubmit={handleSubmit} className="font-cambay space-y-10"> {/* ✅ form tag */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="group cursor-pointer hover:bg-accent/10 rounded-md p-1 transition-all duration-200"
          >
            <ArrowLeft className="w-9 h-9 text-accent transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
          </button>
          <PageTitle title={pageTitle} />
        </div>
        <Button
          variant="primary"
          size="lg"
          className="px-15 py-6"
          type="submit"      
          isDisabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Job Title"
          name="title"
          placeholder="Enter Title"
          value={values.title}
          onChange={(val) => set("title", val)}
          error={errors.title}
        />
        <Input
          label="Company Name"
          name="companyName"
          placeholder="Enter company name"
          value={values.companyName}
          onChange={(val) => set("companyName", val)}
          error={errors.companyName}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Location"
          name="location"
          placeholder="Select Location"
          type="select"
          options={locationOptions}
          value={values.location}
          onChange={(val) => set("location", val)}
          error={errors.location}
        />
        <Input
          label="Employment Type"
          name="employmentType"
          placeholder="Select Employment Type"
          type="select"
          options={employmentOptions}
          value={values.employmentType}
          onChange={(val) => set("employmentType", val)}
          error={errors.employmentType}
        />
      </div>

      <Input
        type="textarea"
        name="description"
        label="Job Description"
        rows={10}
        placeholder="Enter job description"
        value={values.description}
        onChange={(val) => set("description", val)}
        error={errors.description}
      />
    </form>
  );
}