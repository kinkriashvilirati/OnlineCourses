import type { Topic } from "../../features/courses-catalog/courses-catalog-type";
import { apiClient } from "../client";

export type GetTopicsParams = {
  categories?: number[];
};

export type TopicsApiResponse = {
  data: Topic[];
};

export async function getTopics(params: GetTopicsParams = {}) {
  const queryParams =
    params.categories && params.categories.length > 0
      ? { "categories[]": params.categories }
      : undefined;

  const response = await apiClient.get<TopicsApiResponse>("/topics", {
    params: queryParams,
  });

  return response.data;
}
