import { FeaturedTutors } from "@/components/FeaturedTutors";
import { HeroCarousel } from "@/components/HeroCarousel";
import { StatsSection } from "@/components/StatsSection";


export default function Home() {
  return (
    <div className="">
      <HeroCarousel></HeroCarousel>
      <FeaturedTutors></FeaturedTutors>
      <StatsSection></StatsSection>
    </div>
  );
}
