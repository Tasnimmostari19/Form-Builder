export interface FormField {
  id: string;
  label: string;
  name: string;
  type:
    | "text"
    | "email"
    | "date"
    | "time"
    | "file"
    | "select"
    | "checkbox"
    | "radio"
    | "acceptance";
  placeholder?: string;
  required: boolean;
  columnWidth: string;
  options?: string[]; // Format: "Display Name=value"
  content?: string; // For acceptance type
  inlineStyle?: string; // For checkbox
}

export interface FormSchema {
  id: string;
  version: string;
  name: string;
  toEmail: string;
  subject: string;
  successMessage: string;
  fields: FormField[];
}
