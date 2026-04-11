import { useAuth } from "../context/AuthContext";
import ContinueLearningSection from "../features/dashboard/continueLearningSectionFolder/ContinueLearningSection";
import { DashboardHeroSlider } from "../features/dashboard/heroSliderSection/DashboardHeroSlider";
import StartLearningSection from "../features/dashboard/startLearningSectionFolder/StartLearningSection";

export function DashboardPage() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex flex-col gap-16 pt-27">
      <DashboardHeroSlider />
      {!isAuthenticated ? (
        <>
          <StartLearningSection />
          <ContinueLearningSection />
        </>
      ) : (
        <>
          <ContinueLearningSection />
          <StartLearningSection />
        </>
      )}
    </div>
  );
}
