import { FormField } from "@/types";
import { AcceptanceField } from "../form-fields/AcceptanceInput";
import { DateField } from "../form-fields/DateField";
import { EmailField } from "../form-fields/EmailInput";
import { FileField } from "../form-fields/FileInput";
import { RadioField } from "../form-fields/RadioInput";
import { SelectField } from "../form-fields/SelectInput";
import { TextField } from "../form-fields/TextInput";
import { CheckboxInput } from "../form-fields/CheckboxInput";
import { TimeInput } from "../form-fields/TimeInput";

interface FieldFactoryProps {
  field: FormField;
  isPreview?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

export function FieldFactory({
  field,
  isPreview = false,
  value,
  onChange,
}: FieldFactoryProps) {
  const commonProps = {
    field,
    isPreview,
    value,
    onChange,
  };

  switch (field.type) {
    case "text":
      return <TextField {...commonProps} />;

    case "email":
      return <EmailField {...commonProps} />;

    case "select":
      return <SelectField {...commonProps} />;

    case "checkbox":
      return <CheckboxInput {...commonProps} />;

    case "radio":
      return <RadioField {...commonProps} />;

    case "date":
      return <DateField {...commonProps} />;

    case "time":
      return <TimeInput {...commonProps} />;

    case "file":
      return <FileField {...commonProps} />;

    case "acceptance":
      return <AcceptanceField {...commonProps} />;

    default:
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">
            Unsupported field type: {(field as any).type}
          </p>
        </div>
      );
  }
}
