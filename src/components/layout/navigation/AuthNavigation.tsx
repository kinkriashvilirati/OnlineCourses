import { useAuth } from "../../../context/AuthContext";
import BrowseCourses from "./BrowsCourses";
import EnrolledCoursesButton from "./EnrolledCoursesButton";
import ProfileStatusButton from "./ProfileButton";

export default function AuthNavigation() {
  const { profileComplete } = useAuth();

  return (
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-12">
        <BrowseCourses />
        <EnrolledCoursesButton />
      </div>

      <ProfileStatusButton isProfileComplete={profileComplete} />
    </div>
  );
}
