export type Enrollment = {
  completedAt: string | null;
  course: {
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
  id: number;
  progress: number;
  quantity: number;
  schedule: {
    location: string | null;
    sessionType: {
      availableSeats: number;
      courseScheduleId: number;
      id: number;
      location: string | null;
      name: "online" | "in_person" | "hybrid";
      priceModifier: number;
    };
    timeSlot: {
      endTime: string;
      id: number;
      label: string;
      startTime: string;
    };
    weeklySchedule: {
      days: string[];
      id: number;
      label: string;
    };
  };
  totalPrice: number;
};
