import { FormField } from "@/types";

interface FieldComponentProps {
  field: FormField;
  isPreview: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

export function TimeInput({
  field,
  isPreview,
  value = "",
  onChange,
}: FieldComponentProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="time"
        name={field.name}
        required={field.required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={!isPreview}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${!isPreview ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
        `}
      />
    </div>
  );
}
