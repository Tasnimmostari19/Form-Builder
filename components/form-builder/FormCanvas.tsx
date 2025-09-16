"use client";

import { useFormData } from "@/hooks/useFormData";
import { FormRenderer } from "./FormRenderer";
import { DragItem, FormField, ItemTypes } from "@/types";
import { useFormMutations } from "@/hooks/useFormMutations";
import { useDrop } from "react-dnd";

const createDefaultField = (type: string): FormField => {
  const id = Math.random().toString(36).substring(2, 10);

  const baseField: FormField = {
    id,
    name: `${type}_${id}`,
    type: type as FormField["type"],
    label: getDefaultLabel(type),
    required: false,
    columnWidth: "50%",
  };

  // Add type-specific defaults
  switch (type) {
    case "text":
      return {
        ...baseField,
        placeholder: "Enter text here",
      };
    case "email":
      return {
        ...baseField,
        placeholder: "Enter email address",
      };
    case "select":
      return {
        ...baseField,
        placeholder: "Select an option",
        options: ["Option 1=option1", "Option 2=option2"],
      };
    case "checkbox":
      return {
        ...baseField,
        options: ["Option 1=option1", "Option 2=option2", "Option 3=option3"],
      };
    case "radio":
      return {
        ...baseField,
        options: ["Option 1=option1", "Option 2=option2", "Option 3=option3"],
      };
    case "acceptance":
      return {
        ...baseField,
        content: "<p><strong>I agree to the terms and conditions</strong></p>",
        required: true,
        columnWidth: "100%",
      };
    case "file":
      return {
        ...baseField,
        columnWidth: "100%",
      };
    default:
      return baseField;
  }
};

const getDefaultLabel = (type: string): string => {
  const labelMap: Record<string, string> = {
    text: "Text Input",
    email: "Email Address",
    select: "Select Option",
    checkbox: "Checkbox Options",
    radio: "Radio Selection",
    date: "Date",
    time: "Time",
    file: "File Upload",
    acceptance: "Terms & Conditions",
  };
  return labelMap[type] || "New Field";
};

export function FormCanvas() {
  const { data: formData, isLoading, error } = useFormData();
  const { addField, reorderFields } = useFormMutations();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.FIELD_TYPE, ItemTypes.FIELD_ITEM],
    drop: (item: DragItem, monitor) => {
      if (monitor.getItemType() === ItemTypes.FIELD_TYPE) {
        // Adding new field from palette
        const newField = createDefaultField(item.fieldType!);
        addField.mutate({ field: newField });
      }
      // Reordering is handled in the individual field wrappers
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

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
      <div
        ref={drop}
        className={`
          flex-1 p-6 overflow-y-auto transition-colors
          ${isOver && canDrop ? "bg-blue-50" : "bg-gray-50"}
        `}
      >
        <div className="max-w-6xl mx-auto">
          {isOver && canDrop && (
            <div className="mb-4 border-2 border-dashed border-blue-400 bg-blue-100 rounded-lg p-8 text-center">
              <div className="text-blue-600">
                <div className="text-2xl mb-2">📋</div>
                <p className="font-medium">Drop field here to add to form</p>
              </div>
            </div>
          )}

          <FormRenderer formData={formData} isPreview={false} />
        </div>
      </div>
    </div>
  );
}
