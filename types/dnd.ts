export interface DragItem {
  type: string;
  fieldType?: string; // For new fields from palette
  fieldId?: string; // For existing fields
  index?: number; // For reordering
}

export const ItemTypes = {
  FIELD_TYPE: "fieldType", // Dragging from palette
  FIELD_ITEM: "fieldItem", // Dragging existing field for reorder
} as const;
