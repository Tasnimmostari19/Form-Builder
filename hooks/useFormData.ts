import { useQuery } from "@tanstack/react-query";
import { FormSchema } from "@/types/form";
import sampleFormData from "@/data/sample-form.json";

// Query key constant
const FORM_DATA_KEY = "formData";

/**
 * Hook to fetch and manage form data
 */
function useFormData() {
  return useQuery({
    queryKey: [FORM_DATA_KEY],
    queryFn: () => {
      // Simulate API call - in real app this would be an actual API endpoint
      return Promise.resolve(sampleFormData as FormSchema);
    },
    staleTime: Infinity, // Data doesn't change unless we mutate it
    gcTime: Infinity, // Keep in cache indefinitely
  });
}
export { useFormData, FORM_DATA_KEY };
