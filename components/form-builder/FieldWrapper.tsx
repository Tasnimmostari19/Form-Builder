"use client";

import React, { useRef, useState } from "react";
import { FormField } from "@/types/form";
import { Settings, Trash2, Copy, GripVertical } from "lucide-react";
import { DragItem, ItemTypes } from "@/types";
import { useDrag, useDrop } from "react-dnd";

interface FieldWrapperProps {
  field: FormField;
  children: React.ReactNode;
  index: number;
  onSettings: (fieldId: string) => void;
  onDelete: (fieldId: string) => void;
  onDuplicate: (fieldId: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
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
  index,
  onSettings,
  onDelete,
  onDuplicate,
  onReorder,
}: FieldWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  // Drag source for reordering
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: ItemTypes.FIELD_ITEM,
    item: {
      type: ItemTypes.FIELD_ITEM,
      fieldId: field.id,
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop target for reordering
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.FIELD_ITEM,
    drop: (item: DragItem) => {
      if (item.fieldId !== field.id) {
        onReorder(item.index!, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // drag and drop refs
  drag(ref);
  drop(ref);
  dragPreview(drop(ref));

  return (
    <div
      className={`
        relative transition-all duration-200
        ${getFormColumnClass(field.columnWidth)}
        ${isDragging ? "opacity-50 scale-95" : ""}
        ${isOver && canDrop ? "scale-105" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drop indicator */}
      {isOver && canDrop && (
        <div className="absolute -inset-1 bg-blue-200 rounded-lg border-2 border-blue-400 border-dashed pointer-events-none z-10" />
      )}

      {/* Field Content */}
      <div ref={ref} className="relative group">
        {/* Drag Handle */}
        {isHovered && !isDragging && (
          <div className="absolute top-2 left-2 z-20">
            <div className="p-1 bg-white border border-gray-200 rounded shadow-sm cursor-move">
              <GripVertical size={14} className="text-gray-400" />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isHovered && !isDragging && (
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
