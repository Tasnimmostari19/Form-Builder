"use client";

import { Plus } from "lucide-react";

const fieldTypes = [
  {
    type: "text",
    label: "Text Input",

    description: "Single line text",
  },
  {
    type: "email",
    label: "Email Input",

    description: "Email address",
  },
  {
    type: "select",
    label: "Select Dropdown",

    description: "Dropdown selection",
  },
  {
    type: "checkbox",
    label: "Checkbox Group",

    description: "Multiple choices",
  },
  {
    type: "radio",
    label: "Radio Group",

    description: "Single choice",
  },
  {
    type: "acceptance",
    label: "Acceptance",

    description: "Terms agreement",
  },
];

export function FieldPalette() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Plus size={18} />
          Add Fields
        </h3>
        <p className="text-xs text-gray-500 mt-1">Drag fields to the canvas</p>
      </div>

      {/* Field Types List */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {fieldTypes.map((fieldType) => (
          <div
            key={fieldType.type}
            className="p-3 bg-white rounded-lg border border-gray-200 cursor-grab hover:shadow-sm transition-shadow group"
            draggable
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-600">
                  {fieldType.label}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {fieldType.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          {fieldTypes.length} field types available
        </p>
      </div>
    </div>
  );
}
