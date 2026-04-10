import { DashboardHeroSlider } from "../features/dashboard/HeroSliderSection/DashboardHeroSlider";
import StartLearningSection from "../features/dashboard/StartLearningSectionFolder/StartLearningSection";

export function DashboardPage() {
  return (
    <main className="flex flex-col gap-16">
      <DashboardHeroSlider />
      <StartLearningSection />
    </main>
  );
}
