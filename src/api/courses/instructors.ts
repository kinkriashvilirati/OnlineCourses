import type { Instructor } from "../../features/courses-catalog/courses-catalog-type";
import { apiClient } from "../client";

export type InstructorsApiResponse = {
  data: Instructor[];
};

export async function getInstructors() {
  const response =
    await apiClient.get<InstructorsApiResponse>("/instructors");

  return response.data;
}
