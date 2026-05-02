"use client";

import { ArrowLeft } from "lucide-react";
import PageTitle from "../../_component/pageTitle";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/app/component/ui";
import { useState } from "react";

const selectItems = [
  { label: "Remote", key: "remote" },
  { label: "On-site", key: "on-site" },
];

const employmentItems = [
  { label: "Full Time", key: "full-time" },
  { label: "Contract", key: "contract" },
  { label: "Part Time", key: "part-time" },
  { label: "Internship", key: "internship" },
];

export default function PostNewJob() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    location: "",
    employment_type: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Form data:", formData);
      // Add your API call here
      // await createJob(formData);
      
      // Redirect to careers page after success
      router.push("/dashboard/careers");
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="font-cambay">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="group cursor-pointer hover:bg-accent/10 rounded-md p-1 transition-all duration-200"
            >
              <ArrowLeft className="w-9 h-9 text-accent transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
            </button>
            <PageTitle title="Post New Job" />
          </div>
          <Button
            variant="primary"
            size="lg"
            className="px-15 py-6"
            type="submit"
            isDisabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Job Title"
            name="title"
            placeholder="Enter Title"
            value={formData.title}
            // onChange={handleChange}
            // required
          />

          <Input
            label="Company Name"
            name="company_name"
            placeholder="Enter company name"
            value={formData.company_name}
            // onChange={handleChange}
            // required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Location"
            name="location"
            placeholder="Select Location"
            type="select"
            options={selectItems}
            value={formData.location}
            // onChange={handleChange}
            // required
          />
          
          <Input
            label="Employment Type"
            name="employment_type"
            placeholder="Select Employment Type"
            type="select"
            options={employmentItems}
            value={formData.employment_type}
            // onChange={handleChange}
            // required
          />
        </div>

        <div>
          <Input
            type="textarea"
            name="description"
            label="Job Description"
            rows={10}
            placeholder="Enter job description"
            value={formData.description}
          />
        </div>
      </form>
    </main>
  );
}