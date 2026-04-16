import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  createReview,
  type CreateReviewApiRequest,
  type CreateReviewApiResponse,
} from "../../api/courses/reviews";

type ReviewErrorResponse = {
  message: string;
};

export type CreateReviewMutationError =
  | AxiosError<ReviewErrorResponse>
  | Error;

export function useCreateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    CreateReviewApiResponse,
    CreateReviewMutationError,
    CreateReviewApiRequest
  >({
    mutationFn: createReview,
    onSuccess: (_data, variables) => {
      // Rating changes `isRated` and review data on the detailed course page,
      // so refetch that course after a successful review submission.
      queryClient.invalidateQueries({
        queryKey: ["courses", "detail", variables.courseId],
      });
    },
  });
}
