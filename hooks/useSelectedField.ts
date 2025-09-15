import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const SELECTED_FIELD_KEY = "selectedField";

function useSelectedField() {
  return useQuery({
    queryKey: [SELECTED_FIELD_KEY],
    queryFn: () => Promise.resolve(null as string | null),
    staleTime: Infinity,
  });
}

function useSelectField() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fieldId: string | null) => {
      return Promise.resolve(fieldId);
    },
    onSuccess: (fieldId) => {
      queryClient.setQueryData([SELECTED_FIELD_KEY], fieldId);
    },
  });
}

export { useSelectedField, useSelectField, SELECTED_FIELD_KEY };
