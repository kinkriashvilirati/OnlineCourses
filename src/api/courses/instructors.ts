import type { Instructor } from "../../types/courses-type";
import { apiClient } from "../client";

export type InstructorsApiResponse = {
  data: Instructor[];
};

export async function getInstructors() {
  const response = await apiClient.get<InstructorsApiResponse>("/instructors");

  return response.data;
}
