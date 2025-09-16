// src/components/form-builder/FormRenderer.tsx
import React, { useState } from "react";
import { FormSchema } from "@/types/form";

import { useFormMutations } from "@/hooks/useFormMutations";
import { useSelectField } from "@/hooks/useSelectedField";
import { FieldFactory } from "./FieldFectory";
import { FieldWrapper } from "./FieldWrapper";

interface FormRendererProps {
  formData: FormSchema;
  isPreview?: boolean;
}

function getFormColumnClass(width: string): string {
  const widthMap: Record<string, string> = {
    "25%": "col-span-3",
    "33%": "col-span-4",
    "50%": "col-span-6",
    "66%": "col-span-8",
    "75%": "col-span-9",
    "100%": "col-span-12",
  };

  return widthMap[width] || "col-span-12";
}

export function FormRenderer({
  formData,
  isPreview = false,
}: FormRendererProps) {
  const { deleteField, duplicateField, reorderFields } = useFormMutations();
  const selectField = useSelectField();

  // Form values state for preview mode
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSettings = (fieldId: string) => {
    selectField.mutate(fieldId);
  };

  const handleDelete = (fieldId: string) => {
    if (confirm("Are you sure you want to delete this field?")) {
      deleteField.mutate(fieldId);
    }
  };

  const handleDuplicate = (fieldId: string) => {
    duplicateField.mutate(fieldId);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    reorderFields.mutate({ fromIndex, toIndex });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
    alert(
      `Form submitted! Check console for values.\n\nSuccess message: ${formData.successMessage}`
    );
  };

  if (isPreview) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-12 gap-4">
              {formData.fields.map((field) => (
                <div
                  key={field.id}
                  className={getFormColumnClass(field.columnWidth)}
                >
                  <FieldFactory
                    field={field}
                    isPreview={true}
                    value={formValues[field.name]}
                    onChange={(value) => handleFieldChange(field.name, value)}
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Edit mode
  return (
    <div className="space-y-4">
      {formData.fields.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No fields yet
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Drag fields from the left sidebar to start building your form. You
            can reorder, edit, and delete fields once they added.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {formData.fields.map((field, index) => (
            <FieldWrapper
              key={field.id}
              field={field}
              index={index}
              onSettings={handleSettings}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onReorder={handleReorder}
            >
              <FieldFactory
                field={field}
                isPreview={false}
                value={formValues[field.name]}
                onChange={(value) => handleFieldChange(field.name, value)}
              />
            </FieldWrapper>
          ))}
        </div>
      )}
    </div>
  );
}
