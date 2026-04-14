import type { Enrollment } from "./enrollment";

export type Category = {
  id: number;
  name: string;
  icon: string;
};

export type Topic = {
  categoryId: number;
  id: number;
  name: string;
};

export type Instructor = {
  id: number;
  name: string;
  avatar: string | null;
};

export type Review = {
  userId: number;
  rating: number;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  isFeatured: boolean;
  avgRating: number | null;
  reviewCount: number;
  category: Category;
  topic: Topic;
  instructor: Instructor;
};

export type DetailedCourse = {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  hours: number;
  isFeatured: boolean;
  reviews: Review[];
  isRated: boolean;
  category: Category;
  topic: Topic;
  instructor: Instructor;
  enrollment: Enrollment | null;
};

export type CoursesResponse = {
  data: Course[];
};
