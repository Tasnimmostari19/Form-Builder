"use client";

import { usePreviewMode, usePreviewModeToggle } from "@/hooks/usePreviewMode";
import { Eye, Edit3 } from "lucide-react";

export function PreviewToggle() {
  const { data: isPreviewMode } = usePreviewMode();
  const togglePreview = usePreviewModeToggle();

  const handleToggle = () => {
    togglePreview.mutate(!isPreviewMode);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={togglePreview.isPending}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
        ${
          isPreviewMode
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
        ${togglePreview.isPending ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {isPreviewMode ? (
        <>
          <Edit3 size={18} />
          Edit Form
        </>
      ) : (
        <>
          <Eye size={18} />
          Preview
        </>
      )}
    </button>
  );
}
