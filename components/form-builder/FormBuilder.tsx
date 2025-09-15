"use client";

import { useFormData } from "@/hooks/useFormData";
import { usePreviewMode } from "@/hooks/usePreviewMode";
import { PreviewToggle } from "./PreviewToggle";
import { FormPreview } from "./FormPreview";
import { FieldPalette } from "./FieldPalette";
import { FormCanvas } from "./FormCanvas";
import { SettingsPanel } from "./SettingsPanel";

export function FormBuilder() {
  const { data: formData, isLoading, error } = useFormData();
  const { data: isPreviewMode } = usePreviewMode();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading form builder...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error loading form data</h3>
        <p className="text-red-600 text-sm mt-1">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-yellow-800 font-medium">No form data available</h3>
        <p className="text-yellow-600 text-sm mt-1">
          Unable to load form configuration.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-y-auto">
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <PreviewToggle />
      </div>

      <div className="h-[calc(100vh-200px)]">
        {isPreviewMode ? (
          // Preview
          <div className="h-full p-6">
            <FormPreview />
          </div>
        ) : (
          // Edit Mode
          <div className="h-full grid grid-cols-12 gap-0">
            {/* Left Sidebar */}
            <div className="col-span-3 border-r border-gray-200 bg-gray-50">
              <FieldPalette />
            </div>

            {/* Form Canvas */}
            <div className="col-span-6 bg-white">
              <FormCanvas />
            </div>

            {/* Settings */}
            <div className="col-span-3 border-l border-gray-200 bg-gray-50">
              <SettingsPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
