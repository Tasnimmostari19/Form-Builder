import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormSchema, FormField } from "@/types/form";
import { FORM_DATA_KEY } from "./useFormData";

function useFormMutations() {
  const queryClient = useQueryClient();

  const addField = useMutation({
    mutationFn: async ({
      field,
      index,
    }: {
      field: FormField;
      index?: number;
    }) => {
      const currentData = queryClient.getQueryData<FormSchema>([FORM_DATA_KEY]);
      if (!currentData) {
        throw new Error("No form data available");
      }

      const newFields = [...currentData.fields];

      if (index !== undefined && index >= 0) {
        newFields.splice(index, 0, field);
      } else {
        newFields.push(field);
      }

      const updatedData: FormSchema = {
        ...currentData,
        fields: newFields,
      };

      return updatedData;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData([FORM_DATA_KEY], updatedData);
    },
    onError: (error) => {
      console.error("Failed to add field:", error);
    },
  });

  const updateField = useMutation({
    mutationFn: async (updatedField: FormField) => {
      const currentData = queryClient.getQueryData<FormSchema>([FORM_DATA_KEY]);
      if (!currentData) {
        throw new Error("No form data available");
      }

      const updatedFields = currentData.fields.map((field) =>
        field.id === updatedField.id ? updatedField : field
      );

      const updatedData: FormSchema = {
        ...currentData,
        fields: updatedFields,
      };

      return updatedData;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData([FORM_DATA_KEY], updatedData);
    },
    onError: (error) => {
      console.error("Failed to update field:", error);
    },
  });

  /**
   * Delete a field from the form
   */
  const deleteField = useMutation({
    mutationFn: async (fieldId: string) => {
      const currentData = queryClient.getQueryData<FormSchema>([FORM_DATA_KEY]);
      if (!currentData) {
        throw new Error("No form data available");
      }

      const updatedFields = currentData.fields.filter(
        (field) => field.id !== fieldId
      );

      const updatedData: FormSchema = {
        ...currentData,
        fields: updatedFields,
      };

      return updatedData;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData([FORM_DATA_KEY], updatedData);
    },
    onError: (error) => {
      console.error("Failed to delete field:", error);
    },
  });

  //duplicate a field
  const duplicateField = useMutation({
    mutationFn: async (fieldId: string) => {
      const currentData = queryClient.getQueryData<FormSchema>([FORM_DATA_KEY]);
      if (!currentData) {
        throw new Error("No form data available");
      }

      const fieldIndex = currentData.fields.findIndex(
        (field) => field.id === fieldId
      );
      if (fieldIndex === -1) {
        throw new Error("Field not found");
      }

      const originalField = currentData.fields[fieldIndex];

      const duplicatedField: FormField = {
        ...originalField,
        id: generateId(),
        name: `${originalField.name}_copy`,
        label: `${originalField.label} (Copy)`,
      };

      const newFields = [...currentData.fields];
      newFields.splice(fieldIndex + 1, 0, duplicatedField);

      const updatedData: FormSchema = {
        ...currentData,
        fields: newFields,
      };

      return updatedData;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData([FORM_DATA_KEY], updatedData);
    },
    onError: (error) => {
      console.error("Failed to duplicate field:", error);
    },
  });

  const reorderFields = useMutation({
    mutationFn: async ({
      fromIndex,
      toIndex,
    }: {
      fromIndex: number;
      toIndex: number;
    }) => {
      const currentData = queryClient.getQueryData<FormSchema>([FORM_DATA_KEY]);
      if (!currentData) {
        throw new Error("No form data available");
      }

      if (fromIndex === toIndex) {
        return currentData; // No change needed
      }

      const fields = [...currentData.fields];
      const [movedField] = fields.splice(fromIndex, 1);
      fields.splice(toIndex, 0, movedField);

      const updatedData: FormSchema = {
        ...currentData,
        fields,
      };

      return updatedData;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData([FORM_DATA_KEY], updatedData);
    },
    onError: (error) => {
      console.error("Failed to reorder fields:", error);
    },
  });

  return {
    addField,
    updateField,
    deleteField,
    duplicateField,
    reorderFields,

    isLoading:
      addField.isPending ||
      updateField.isPending ||
      deleteField.isPending ||
      duplicateField.isPending ||
      reorderFields.isPending,
  };
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export { useFormMutations };
