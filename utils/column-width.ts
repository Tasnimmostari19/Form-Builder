export function getColumnClass(width: string): string {
  const widthMap: Record<string, string> = {
    "25%": "w-1/4",
    "33%": "w-1/3",
    "50%": "w-1/2",
    "66%": "w-2/3",
    "75%": "w-3/4",
    "100%": "w-full",
  };

  return widthMap[width] || "w-full";
}

/**
 * Get responsive column classes for form layout
 */
export function getResponsiveColumnClass(width: string): string {
  const baseClass = getColumnClass(width);
  // Add responsive breakpoints
  return `${baseClass} md:${baseClass} sm:w-full`;
}

/**
 * Get all available column width options
 */
export function getColumnWidthOptions() {
  return [
    { label: "25%", value: "25%" },
    { label: "33%", value: "33%" },
    { label: "50%", value: "50%" },
    { label: "66%", value: "66%" },
    { label: "75%", value: "75%" },
    { label: "100%", value: "100%" },
  ];
}
