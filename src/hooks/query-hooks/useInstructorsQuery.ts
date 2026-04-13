import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getInstructors,
  type InstructorsApiResponse,
} from "../../api/courses/instructors";

export function useInstructorsQuery() {
  return useQuery<InstructorsApiResponse, AxiosError>({
    queryKey: ["instructors"],
    queryFn: getInstructors,
    retry: false,
    staleTime: Infinity,
  });
}
