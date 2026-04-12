import type { Course } from "../../features/courses-catalog/courses-catalog-type";
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
