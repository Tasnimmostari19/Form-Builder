"use client";

import { useFormData } from "@/hooks/useFormData";
import { FormRenderer } from "./FormRenderer";

export function FormCanvas() {
  const { data: formData, isLoading, error } = useFormData();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading form...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <h3 className="text-red-800 font-medium mb-1">Error loading form</h3>
          <p className="text-red-600 text-sm">Please refresh and try again</p>
        </div>
      </div>
    );
  }

  if (!formData) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h3 className="font-semibold text-gray-900">Form Canvas</h3>
        <p className="text-xs text-gray-500 mt-1">
          {formData.fields.length} field
          {formData.fields.length !== 1 ? "s" : ""} in form
        </p>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Form Renderer */}
          <FormRenderer formData={formData} isPreview={false} />
        </div>
      </div>
    </div>
  );
}
