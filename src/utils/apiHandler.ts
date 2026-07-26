import axios from "axios";
import { toast } from "react-toastify";
import type { UseFormSetError, FieldValues, Path } from "react-hook-form";
import type { ApiErrorResponse } from "../types/types.api.response";

export const handleApiSuccess = (message?: string) => {
  toast.success(message , {
    position: 'bottom-right',
    autoClose: 4000,
  });
};

export const handleApiError = <T extends FieldValues>(
  error: unknown,
  setError?: UseFormSetError<T>,
  defaultFallbackMessage: string = 'An unexpected error occurred. Please try again.'
) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const errorData = error.response?.data;

    if (errorData) {
      let hasFieldErrors = false;
      if (Array.isArray(errorData.errors) && setError && errorData.errors.length > 0) {
        errorData.errors.forEach((err) => {
          if (err.field && err.message) {
            setError(err.field as Path<T>, {
              type: 'server',
              message: err.message,
            });
            hasFieldErrors = true;
          }
        });
      }

      const toastMessage = errorData.message || defaultFallbackMessage;

      if (!hasFieldErrors || errorData.message) {
        toast.error(toastMessage, {
          position: 'bottom-right',
          autoClose: 5000,
        });
      }
      return;
    }
  }

  if (error instanceof Error) {
    toast.error(error.message, {
      position: 'bottom-right',
      autoClose: 5000,
    });
  } else {
    toast.error(defaultFallbackMessage, {
      position: 'bottom-right',
      autoClose: 5000,
    });
  }
};