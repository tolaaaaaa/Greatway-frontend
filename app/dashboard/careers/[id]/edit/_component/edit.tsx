"use client";

import { useActionState, useEffect, useTransition, useState } from "react";
import JobForm from "../../../_component/jobForm";
import { updateCareer } from "@/actions/career.action";
import { customToast } from "@/app/component/ui";
import {
  UpdateCareerFormState,
  UpdateCareerFormValues,
} from "@/validations/career/update-career.validation";

type Prop = {
  career: Career;
};

export default function EditJob({ career }: Prop) {
  const [isTransitioning, startTransition] = useTransition();

  const initialValues: UpdateCareerFormValues = {
    title: career.title,
    companyName: career.companyName || "",
    location: career.location as "remote" | "on-site",
    employmentType: career.employmentType,
    description: career.description,
  };

  const initialState: UpdateCareerFormState = {
    errors: {},
    error: "",
    values: initialValues,
  };

  const updateCareerWithId = updateCareer.bind(null, career.id);

  const [{ error, errors }, dispatch, isPending] = useActionState(
    updateCareerWithId,
    initialState,
  );

  const [formValues, setFormValues] =
    useState<UpdateCareerFormValues>(initialValues);

  useEffect(() => {
    if (error) customToast.error(error);
  }, [error]);

  const handleSave = (values: UpdateCareerFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title ?? "");
    formData.append("companyName", values.companyName ?? "");
    formData.append("location", values.location ?? "");
    formData.append("employmentType", values.employmentType ?? "");
    formData.append("description", values.description ?? "");

    startTransition(() => {
      dispatch(formData);
    });
  };

  return (
    <JobForm
      values={formValues as UpdateCareerFormValues & Required<UpdateCareerFormValues>}
      onChange={setFormValues}
      onSave={handleSave}
      isSaving={isPending || isTransitioning}
      errors={{
        title: errors?.title,
        companyName: errors?.companyName,
        location: errors?.location,
        employmentType: errors?.employmentType,
        description: errors?.description,
      }}
      pageTitle="Edit Job"
    />
  );
}
