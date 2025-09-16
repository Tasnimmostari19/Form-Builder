"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, X } from "lucide-react";
import { useSelectedField } from "@/hooks/useSelectedField";
import { useFormData } from "@/hooks/useFormData";
import { useFormMutations } from "@/hooks/useFormMutations";
import { FormField } from "@/types/form";

export function SettingsPanel() {
  const { data: selectedFieldId } = useSelectedField();
  const { data: formData } = useFormData();
  const { updateField } = useFormMutations();

  // Find the selected field
  const selectedField = formData?.fields.find(
    (field) => field.id === selectedFieldId
  );

  // Local state for editing
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Update editing field when selection changes
  useEffect(() => {
    if (selectedField) {
      setEditingField({ ...selectedField });
      setHasChanges(false);
    } else {
      setEditingField(null);
      setHasChanges(false);
    }
  }, [selectedField]);

  const handleFieldChange = (key: keyof FormField, value: any) => {
    if (!editingField) return;

    setEditingField({
      ...editingField,
      [key]: value,
    });
    setHasChanges(true);
  };

  const handleOptionsChange = (optionsText: string) => {
    if (!editingField) return;

    const options = optionsText
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => line.trim());

    handleFieldChange("options", options);
  };

  const handleSave = () => {
    if (!editingField || !hasChanges) return;

    updateField.mutate(editingField, {
      onSuccess: () => {
        setHasChanges(false);
      },
    });
  };

  const handleCancel = () => {
    if (selectedField) {
      setEditingField({ ...selectedField });
      setHasChanges(false);
    }
  };

  if (!selectedField || !editingField) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Settings size={18} />
            Field Settings
          </h3>
          <p className="text-xs text-gray-500 mt-1">Click a field to edit</p>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="text-center text-gray-400 mt-8">
            <Settings size={48} className="mx-auto mb-4 opacity-50" />
            <h4 className="font-medium text-gray-500 mb-2">
              No field selected
            </h4>
            <p className="text-sm text-gray-400">
              Click the settings button on any field to edit its properties
            </p>
          </div>
        </div>
      </div>
    );
  }

  const supportsOptions = ["select", "checkbox", "radio"].includes(
    editingField.type
  );
  const supportsPlaceholder = ["text", "email", "select"].includes(
    editingField.type
  );
  const isAcceptanceType = editingField.type === "acceptance";

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Settings size={18} />
          Field Settings
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Editing: {editingField.type} field
        </p>
        {hasChanges && (
          <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
            Unsaved changes
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Basic Properties */}
        <div className="space-y-4">
          {/* Label */}
          {!isAcceptanceType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={editingField.label}
                onChange={(e) => handleFieldChange("label", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Name */}
          {!isAcceptanceType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Name
              </label>
              <input
                type="text"
                value={editingField.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Used for form submission data
              </p>
            </div>
          )}

          {/* Placeholder */}
          {supportsPlaceholder && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placeholder
              </label>
              <input
                type="text"
                value={editingField.placeholder || ""}
                onChange={(e) =>
                  handleFieldChange("placeholder", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Required Toggle */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editingField.required}
                onChange={(e) =>
                  handleFieldChange("required", e.target.checked)
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Required field
              </span>
            </label>
          </div>

          {/* Column Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Column Width
            </label>
            <select
              value={editingField.columnWidth}
              onChange={(e) => handleFieldChange("columnWidth", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="25%">25% (1/4 width)</option>
              <option value="33%">33% (1/3 width)</option>
              <option value="50%">50% (1/2 width)</option>
              <option value="66%">66% (2/3 width)</option>
              <option value="75%">75% (3/4 width)</option>
              <option value="100%">100% (Full width)</option>
            </select>
          </div>
        </div>

        {/* Options for select, checkbox, radio */}
        {supportsOptions && (
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options
            </label>
            <textarea
              value={(editingField.options || []).join("\n")}
              onChange={(e) => handleOptionsChange(e.target.value)}
              rows={6}
              placeholder="Enter one option per line&#10;Format: Display Name=value&#10;Example:&#10;Option 1=option1&#10;Option 2=option2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
            <p className="text-xs text-gray-500 mt-1">
              One option per line. Use "Display Name=value" format or just
              "Display Name"
            </p>
          </div>
        )}

        {/* Content for acceptance type */}
        {isAcceptanceType && (
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (HTML allowed)
            </label>
            <textarea
              value={editingField.content || ""}
              onChange={(e) => handleFieldChange("content", e.target.value)}
              rows={4}
              placeholder="Enter the acceptance text (HTML tags allowed)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Footer with Save/Cancel */}
      {hasChanges && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={updateField.isPending}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={14} />
              {updateField.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
