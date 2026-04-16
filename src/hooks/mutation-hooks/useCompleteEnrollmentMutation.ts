import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  completeEnrollment,
  type CompleteEnrollmentApiResponse,
} from "../../api/enrollments/completeEnrollment";

type CompleteEnrollmentErrorResponse = {
  message: string;
};

export type CompleteEnrollmentMutationError =
  | AxiosError<CompleteEnrollmentErrorResponse>
  | Error;

export function useCompleteEnrollmentMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    CompleteEnrollmentApiResponse,
    CompleteEnrollmentMutationError,
    number
  >({
    mutationFn: completeEnrollment,
    onSuccess: ({ data }) => {
      // Completing a course changes the detailed course state and removes it
      // from in-progress collections, so those caches should refetch.
      queryClient.invalidateQueries({
        queryKey: ["courses", "detail", data.course.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["courses", "in-progress"],
      });
      queryClient.invalidateQueries({
        queryKey: ["enrollments"],
      });
    },
  });
}
