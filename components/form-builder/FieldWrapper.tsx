"use client";

import React, { useState } from "react";
import { FormField } from "@/types/form";
import { Settings, Trash2, Copy } from "lucide-react";

interface FieldWrapperProps {
  field: FormField;
  children: React.ReactNode;
  onSettings: (fieldId: string) => void;
  onDelete: (fieldId: string) => void;
  onDuplicate: (fieldId: string) => void;
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

export function FieldWrapper({
  field,
  children,
  onSettings,
  onDelete,
  onDuplicate,
}: FieldWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${getFormColumnClass(field.columnWidth)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Field Content */}
      <div className="relative group">
        {/* Action Buttons */}
        {isHovered && (
          <div className="absolute top-2 right-2 flex gap-1 z-20">
            <button
              onClick={() => onSettings(field.id)}
              className="p-1.5 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors"
              title="Settings"
            >
              <Settings size={14} className="text-gray-600" />
            </button>

            <button
              onClick={() => onDuplicate(field.id)}
              className="p-1.5 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors"
              title="Duplicate"
            >
              <Copy size={14} className="text-gray-600" />
            </button>

            <button
              onClick={() => onDelete(field.id)}
              className="p-1.5 bg-white border border-gray-200 rounded shadow-sm hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} className="text-red-600" />
            </button>
          </div>
        )}

        {/* Field Content */}
        <div className="relative z-5">{children}</div>
      </div>
    </div>
  );
}
