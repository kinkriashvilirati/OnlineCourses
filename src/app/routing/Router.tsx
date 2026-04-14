import { createBrowserRouter } from "react-router";
import { AppLayout } from "../../components/layout/AppLayout";
import { ErrorPage } from "../../components/error/Error";
import { CoursesCatalogPage } from "../../pages/CoursesCatalogPage";
import { DashboardPage } from "../../pages/DashboardPage";
import DetailedCourse from "../../pages/DetailedCourse";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "courses",
        element: <CoursesCatalogPage />,
      },
      {
        path: "courses/:courseId", // <-- add this
        element: <DetailedCourse />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
