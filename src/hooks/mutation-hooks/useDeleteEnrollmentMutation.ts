import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { deleteEnrollment } from "../../api/enrollments/deleteEnrollment";

type DeleteEnrollmentVariables = {
  courseId: number;
  enrollmentId: number;
};

type DeleteEnrollmentErrorResponse = {
  message: string;
};

export type DeleteEnrollmentMutationError =
  | AxiosError<DeleteEnrollmentErrorResponse>
  | Error;

export function useDeleteEnrollmentMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, DeleteEnrollmentMutationError, DeleteEnrollmentVariables>(
    {
      mutationFn: async ({ enrollmentId }) => {
        await deleteEnrollment(enrollmentId);
      },
      onSuccess: (_data, variables) => {
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
    },
  );
}
