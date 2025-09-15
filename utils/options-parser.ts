export interface ParsedOption {
  label: string;
  value: string;
}

/**
 * Parse option strings in "Label=value" format
 */
export function parseOptions(options: string[]): ParsedOption[] {
  return options.map((option) => {
    const [label, value] = option.split("=");
    return {
      label: label.trim(),
      value: value?.trim() || label.trim().toLowerCase().replace(/\s+/g, "-"),
    };
  });
}

/**
 * Format parsed options back to "Label=value" strings
 */
export function formatOptions(options: ParsedOption[]): string[] {
  return options.map((option) => `${option.label}=${option.value}`);
}

/**
 * Add a new option to existing options array
 */
export function addOption(
  options: string[],
  newLabel: string = "New Option"
): string[] {
  const newValue = newLabel.toLowerCase().replace(/\s+/g, "-");
  const newOption = `${newLabel}=${newValue}`;
  return [...options, newOption];
}

/**
 * Remove option at specific index
 */
export function removeOption(options: string[], index: number): string[] {
  return options.filter((_, i) => i !== index);
}
