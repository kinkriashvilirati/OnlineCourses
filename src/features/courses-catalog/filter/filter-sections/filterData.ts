import baseImg from "../../../../assets/images/course_base_img.jpg";
import type { Category, Instructor, Topic } from "../../courses-catalog-type";
export const SECTION_CATEGORIES: { data: Category[] } = {
  data: [
    {
      id: 1,
      name: "Development",
      icon: "Development",
    },
    {
      id: 2,
      name: "Design",
      icon: "Design",
    },
    {
      id: 3,
      name: "Business",
      icon: "Business",
    },
  ],
};

export const SECTION_TOPICS: { data: Topic[] } = {
  data: [
    {
      id: 1,
      name: "React",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "Python",
    },
  ],
};
export const SECTION_INSTRUCTORS: { data: Instructor[] } = {
  data: [
    {
      id: 1,
      name: "Marlyn Mango",
      avatar: baseImg,
    },
    {
      id: 2,
      name: "Rati Mango",
      avatar: baseImg,
    },
    {
      id: 3,
      name: " Mango",
      avatar: baseImg,
    },
    {
      id: 4,
      name: "Marlyn",
      avatar: baseImg,
    },
    {
      id: 5,
      name: "Marlyn Mango",
      avatar: baseImg,
    },
  ],
};
