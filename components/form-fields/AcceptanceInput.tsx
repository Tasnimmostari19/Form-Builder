import { FormField } from "@/types";

interface FieldComponentProps {
  field: FormField;
  isPreview: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

export function AcceptanceField({
  field,
  isPreview,
  value = false,
  onChange,
}: FieldComponentProps) {
  return (
    <div className="space-y-3">
      <label className="flex items-start space-x-3 cursor-pointer">
        <input
          type="checkbox"
          name={field.name}
          checked={value}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={!isPreview}
          required={field.required}
          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div className="flex-1">
          <div
            className="text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: field.content || field.label }}
          />
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </div>
      </label>
    </div>
  );
}
