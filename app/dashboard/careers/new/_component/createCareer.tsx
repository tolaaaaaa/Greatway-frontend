"use client";

import { useActionState, useEffect, useTransition, useState } from "react";
import { customToast } from "@/app/component/ui";
import { createCareer } from "@/actions/career.action";
import { CreateCareerFormState, CreateCareerFormValues } from "@/validations/career/create-career.validation";
import JobForm from "../../_component/jobForm";

const initialValues: CreateCareerFormValues = {
  title: "",
  companyName: "",
  location: "" as any,
  employmentType: "" as any,
  description: "",
};

const initialState: CreateCareerFormState = {
  error: "",
  errors: {},
  values: initialValues,
};

export default function PostNewJob() {
  const [isTransitioning, startTransition] = useTransition();
  const [formValues, setFormValues] = useState<CreateCareerFormValues>(initialValues); 

  const [{ error, errors }, dispatch, isPending] = useActionState(
    createCareer,
    initialState,
  );

  useEffect(() => {
    if (error) customToast.error(error);
  }, [error]);

  const handleSave = (values: CreateCareerFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("companyName", values.companyName);
    formData.append("location", values.location);
    formData.append("employmentType", values.employmentType);
    formData.append("description", values.description);

    startTransition(() => {
      dispatch(formData);
    });
  };

  return (
    <JobForm
      values={formValues}           
      onChange={setFormValues}       
      onSave={handleSave}
      isSaving={isPending || isTransitioning}
      errors={{
        title: errors.title,
        companyName: errors.companyName,
        location: errors.location,
        employmentType: errors.employmentType,
        description: errors.description,
      }}
      pageTitle="Post New Job"
    />
  );
}