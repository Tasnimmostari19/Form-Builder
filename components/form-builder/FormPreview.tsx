"use client";

import { useFormData } from "@/hooks/useFormData";
import { FormRenderer } from "./FormRenderer";

export function FormPreview() {
  const { data: formData } = useFormData();

  if (!formData) return null;

  return <FormRenderer formData={formData} isPreview={true} />;
}
