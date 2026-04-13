import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getCategories,
  type CategoriesApiResponse,
} from "../../api/courses/categories";

export function useCategoriesQuery() {
  return useQuery<CategoriesApiResponse, AxiosError>({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: false,
    staleTime: Infinity,
  });
}
