import { FormField } from "@/types";

interface FieldComponentProps {
  field: FormField;
  isPreview: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

export function RadioField({
  field,
  isPreview,
  value = "",
  onChange,
}: FieldComponentProps) {
  const options = field.options || [];

  const parseOption = (option: string) => {
    const [label, val] = option.split("=");
    return { label: label.trim(), value: val?.trim() || label.trim() };
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option, index) => {
          const { label, value: optionValue } = parseOption(option);
          return (
            <label
              key={index}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name={field.name}
                value={optionValue}
                checked={value === optionValue}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={!isPreview}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
