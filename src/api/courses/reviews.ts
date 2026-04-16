import { apiClient } from "../client";

export type CreateReviewApiRequest = {
  courseId: number;
  rating: number;
};

export type CreateReviewApiResponse = {
  data: {
    id: number;
    rating: number;
  };
};

export async function createReview({
  courseId,
  rating,
}: CreateReviewApiRequest) {
  const response = await apiClient.post<CreateReviewApiResponse>(
    `/courses/${courseId}/reviews`,
    { rating },
  );

  return response.data;
}
