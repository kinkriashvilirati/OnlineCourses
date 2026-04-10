import ContinueLearningSection from "../features/dashboard/continueLearningSectionFolder/ContinueLearningSection";
import { DashboardHeroSlider } from "../features/dashboard/heroSliderSection/DashboardHeroSlider";
import StartLearningSection from "../features/dashboard/startLearningSectionFolder/StartLearningSection";

export function DashboardPage() {
  return (
    <main className="flex flex-col gap-16">
      <DashboardHeroSlider />
      <StartLearningSection />
      <ContinueLearningSection />
    </main>
  );
}
