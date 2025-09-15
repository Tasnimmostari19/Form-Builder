import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Query key constant
export const PREVIEW_MODE_KEY = "previewMode";

/**
 * Hook to get current preview mode state
 */
export function usePreviewMode() {
  return useQuery({
    queryKey: [PREVIEW_MODE_KEY],
    queryFn: () => Promise.resolve(false), // Default to edit mode
    staleTime: Infinity,
  });
}

/**
 * Hook to toggle preview mode
 */
export function usePreviewModeToggle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isPreview: boolean) => {
      // Simulate async operation if needed
      return Promise.resolve(isPreview);
    },
    onSuccess: (isPreview) => {
      // Update the query cache
      queryClient.setQueryData([PREVIEW_MODE_KEY], isPreview);
    },
  });
}
