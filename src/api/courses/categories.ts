import type { Category } from "../../types/courses-type";
import { apiClient } from "../client";

export type CategoriesApiResponse = {
  data: Category[];
};

export async function getCategories() {
  const response = await apiClient.get<CategoriesApiResponse>("/categories");

  return response.data;
}
