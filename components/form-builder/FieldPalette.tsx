"use client";

import { ItemTypes } from "@/types";
import { Plus } from "lucide-react";
import { useDrag } from "react-dnd";

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

interface DraggableFieldItemProps {
  fieldType: (typeof fieldTypes)[0];
}

function DraggableFieldItem({ fieldType }: DraggableFieldItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FIELD_TYPE,
    item: {
      type: ItemTypes.FIELD_TYPE,
      fieldType: fieldType.type,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`
        p-3 bg-white rounded-lg border border-gray-200 cursor-grab hover:shadow-sm transition-all group
        ${isDragging ? "opacity-50 rotate-2 scale-105" : ""}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg">{fieldType.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-600">
            {fieldType.label}
          </h4>
          <p className="text-xs text-gray-500 mt-1">{fieldType.description}</p>
        </div>
      </div>
      {isDragging && (
        <div className="absolute inset-0 bg-blue-100 rounded-lg border-2 border-blue-300 border-dashed"></div>
      )}
    </div>
  );
}

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
          <DraggableFieldItem key={fieldType.type} fieldType={fieldType} />
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
