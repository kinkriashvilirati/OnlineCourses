import sliderOne from "../../../assets/images/slider/slider_1.png";
import sliderTwo from "../../../assets/images/slider/slider_2.png";
import sliderThree from "../../../assets/images/slider/slider_3.png";

export type DashboardHeroSlide = {
  buttonLabel: string;
  description: string;
  id: number;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

export const dashboardHeroSlides: DashboardHeroSlide[] = [
  {
    buttonLabel: "Browse Courses",
    description:
      "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
    id: 1,
    imageAlt: "Abstract pink and purple hero background for new learning",
    imageSrc: sliderOne,
    title: "Start learning something new today",
  },
  {
    buttonLabel: "Start Learning",
    description:
      "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
    id: 2,
    imageAlt: "Abstract warm hero background for continuing courses",
    imageSrc: sliderTwo,
    title: "Pick up where you left off",
  },
  {
    buttonLabel: "Learn More",
    description: "",
    id: 3,
    imageAlt:
      "Abstract purple and green hero background for community learning",
    imageSrc: sliderThree,
    title: "Learn together, grow faster",
  },
];
