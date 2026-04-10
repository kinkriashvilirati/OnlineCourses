import continueLearningBase from "../../../assets/images/continue_learning_base.png";
import type { Enrollment } from "../../../types/enrollment";

export const notAuthCards: Enrollment[] = [
  {
    completedAt: null,
    course: {
      avgRating: 4.9,
      basePrice: 299,
      category: {
        icon: "code",
        id: 1,
        name: "Development",
      },
      description:
        "Master modern React patterns and TypeScript for scalable front-end apps.",
      durationWeeks: 12,
      id: 101,
      image: continueLearningBase,
      instructor: {
        avatar: "",
        id: 11,
        name: "Marilyn Mango",
      },
      isFeatured: true,
      reviewCount: 128,
      title: "Advanced React & TypeScript Development",
      topic: {
        categoryId: 1,
        id: 1011,
        name: "React",
      },
    },
    id: 1,
    progress: 65,
    quantity: 1,
    schedule: {
      location: null,
      sessionType: {
        availableSeats: 18,
        courseScheduleId: 301,
        id: 401,
        location: null,
        name: "online",
        priceModifier: 0,
      },
      timeSlot: {
        endTime: "20:00",
        id: 501,
        label: "Evening",
        startTime: "18:00",
      },
      weeklySchedule: {
        days: ["Monday", "Wednesday"],
        id: 601,
        label: "Mon / Wed",
      },
    },
    totalPrice: 299,
  },
  {
    completedAt: null,
    course: {
      avgRating: 4.7,
      basePrice: 349,
      category: {
        icon: "design",
        id: 2,
        name: "Design",
      },
      description:
        "Build polished mobile-first interfaces and reusable systems in Figma.",
      durationWeeks: 10,
      id: 102,
      image: continueLearningBase,
      instructor: {
        avatar: "",
        id: 12,
        name: "Nina Parker",
      },
      isFeatured: false,
      reviewCount: 94,
      title: "UI Design Systems for Product Teams",
      topic: {
        categoryId: 2,
        id: 1012,
        name: "Design Systems",
      },
    },
    id: 2,
    progress: 30,
    quantity: 1,
    schedule: {
      location: "RedClass Studio",
      sessionType: {
        availableSeats: 9,
        courseScheduleId: 302,
        id: 402,
        location: "RedClass Studio",
        name: "in_person",
        priceModifier: 20,
      },
      timeSlot: {
        endTime: "16:00",
        id: 502,
        label: "Afternoon",
        startTime: "14:00",
      },
      weeklySchedule: {
        days: ["Tuesday", "Thursday"],
        id: 602,
        label: "Tue / Thu",
      },
    },
    totalPrice: 369,
  },
  {
    completedAt: "2026-04-01T11:30:00.000Z",
    course: {
      avgRating: 5,
      basePrice: 259,
      category: {
        icon: "marketing",
        id: 3,
        name: "Marketing",
      },
      description:
        "Learn growth experiments, analytics, and campaign planning across channels.",
      durationWeeks: 8,
      id: 103,
      image: continueLearningBase,
      instructor: {
        avatar: "",
        id: 13,
        name: "Luka Bennett",
      },
      isFeatured: false,
      reviewCount: 61,
      title: "Growth Marketing Foundations",
      topic: {
        categoryId: 3,
        id: 1013,
        name: "Growth",
      },
    },
    id: 3,
    progress: 100,
    quantity: 1,
    schedule: {
      location: "Hybrid Hub",
      sessionType: {
        availableSeats: 6,
        courseScheduleId: 303,
        id: 403,
        location: "Hybrid Hub",
        name: "hybrid",
        priceModifier: 10,
      },
      timeSlot: {
        endTime: "13:00",
        id: 503,
        label: "Morning",
        startTime: "11:00",
      },
      weeklySchedule: {
        days: ["Saturday"],
        id: 603,
        label: "Weekend",
      },
    },
    totalPrice: 269,
  },
];
