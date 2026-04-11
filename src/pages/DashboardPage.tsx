import { useAuth } from "../context/AuthContext";
import ContinueLearningSection from "../features/dashboard/continueLearningSectionFolder/ContinueLearningSection";
import { DashboardHeroSlider } from "../features/dashboard/heroSliderSection/DashboardHeroSlider";
import StartLearningSection from "../features/dashboard/startLearningSectionFolder/StartLearningSection";

export function DashboardPage() {
  const { isAuthenticated } = useAuth();
  return (
    <main className="flex flex-col gap-16">
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
    </main>
  );
}
