import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  createEnrollment,
  type CreateEnrollmentApiRequest,
  type CreateEnrollmentApiResponse,
} from "../../api/enrollments/createEnrollment";

type EnrollmentErrorResponse = {
  conflicts?: {
    conflictingCourseName: string;
    conflictingEnrollmentId: number;
    requestedCourseId: number;
    schedule: string;
  }[];
  message: string;
};

export type CreateEnrollmentMutationError =
  | AxiosError<EnrollmentErrorResponse>
  | Error;

type UseCreateEnrollmentMutationOptions = {
  invalidateOnSuccess?: boolean;
};

export function useCreateEnrollmentMutation(
  options: UseCreateEnrollmentMutationOptions = {},
) {
  const queryClient = useQueryClient();
  const { invalidateOnSuccess = true } = options;

  return useMutation<
    CreateEnrollmentApiResponse,
    CreateEnrollmentMutationError,
    CreateEnrollmentApiRequest
  >({
    mutationFn: createEnrollment,
    onSuccess: (_data, variables) => {
      if (!invalidateOnSuccess) {
        return;
      }

      // Enrollment changes both the detailed course state and the dashboard's
      // in-progress list, so we invalidate those caches after a successful POST.
      queryClient.invalidateQueries({
        queryKey: ["courses", "detail", variables.courseId],
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
