import type { CoursesResponse } from "../../courses-catalog-type";

export const mockData: CoursesResponse = {
  data: Array.from({ length: 54 }, (_, i) => ({
    id: i + 1,
    title: "React from Zero to Hero",
    description:
      "Master React.js from the ground up. Build real-world applications with hooks, context, and modern patterns. This course covers everything from JSX basics to advanced state management.",
    image:
      "https://api.redclass.redberryinternship.ge/storage/courses/react-hero.jpg",
    basePrice: 299,
    durationWeeks: 8,
    isFeatured: true,
    avgRating: 3.7,
    reviewCount: 18,
    category: {
      id: 1,
      name: "Development",
      icon: "development",
    },
    topic: {
      categoryId: 1,
      id: 2,
      name: "React",
    },
    instructor: {
      id: 1,
      name: "Sarah Johnson",
      avatar:
        "https://api.redclass.redberryinternship.ge/storage/instructors/01KN28FDDSFZRVET5MEWHME1DX.jpeg",
    },
  })),
};
