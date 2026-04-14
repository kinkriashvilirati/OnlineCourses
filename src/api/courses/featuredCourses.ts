import type { Course } from "../../types/courses-type";
import { apiClient } from "../client";

export type FeaturedCourse = Course;

export type FeaturedCoursesApiResponse = {
  data: FeaturedCourse[];
};

export async function getFeaturedCourses() {
  const response =
    await apiClient.get<FeaturedCoursesApiResponse>("/courses/featured");

  return response.data;
}
