import { apiClient } from "../client";

export type FeaturedCourse = {
  avgRating: number | null;
  basePrice: number;
  category: {
    icon: string;
    id: number;
    name: string;
  };
  description: string;
  durationWeeks: number;
  id: number;
  image: string;
  instructor: {
    avatar: string;
    id: number;
    name: string;
  };
  isFeatured: boolean;
  reviewCount: number;
  title: string;
  topic: {
    categoryId: number;
    id: number;
    name: string;
  };
};

export type FeaturedCoursesApiResponse = {
  data: FeaturedCourse[];
};

export async function getFeaturedCourses() {
  const response =
    await apiClient.get<FeaturedCoursesApiResponse>("/courses/featured");

  return response.data;
}
