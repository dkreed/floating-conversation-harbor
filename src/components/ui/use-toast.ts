
// This file should be a simple re-export from the hooks folder
import * as useToastHook from "@/hooks/use-toast";

// Re-export everything from the actual hook implementation
export const useToast = useToastHook.useToast;
export const toast = useToastHook.toast;
