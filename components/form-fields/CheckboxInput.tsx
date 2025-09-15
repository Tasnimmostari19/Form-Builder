import { FormField } from "@/types";

interface FieldComponentProps {
  field: FormField;
  isPreview: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

export function CheckboxInput({
  field,
  isPreview,
  value = [],
  onChange,
}: FieldComponentProps) {
  const options = field.options || [];

  const parseOption = (option: string) => {
    const [label, val] = option.split("=");
    return { label: label.trim(), value: val?.trim() || label.trim() };
  };

  const handleChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;

    const newValue = checked
      ? [...value, optionValue]
      : value.filter((v: string) => v !== optionValue);

    onChange(newValue);
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
          console.log("optionValue:", optionValue);

          return (
            <label
              key={index}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                name={field.name}
                value={optionValue}
                checked={value.includes(optionValue)}
                onChange={(e) => handleChange(optionValue, e.target.checked)}
                disabled={!isPreview}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
