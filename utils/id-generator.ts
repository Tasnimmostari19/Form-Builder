export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

/**
 * Generate a unique field name based on field type
 */
export function generateFieldName(
  type: string,
  existingNames: string[] = []
): string {
  let baseName = type.toLowerCase().replace(/\s+/g, "_");
  let counter = 1;
  let fieldName = baseName;

  // Ensure uniqueness
  while (existingNames.includes(fieldName)) {
    fieldName = `${baseName}_${counter}`;
    counter++;
  }

  return fieldName;
}
