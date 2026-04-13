import type { Topic } from "../../features/courses-catalog/courses-catalog-type";
import { apiClient } from "../client";

export type TopicsApiResponse = {
  data: Topic[];
};

export async function getTopics() {
  const response = await apiClient.get<TopicsApiResponse>("/topics");

  return response.data;
}
