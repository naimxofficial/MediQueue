import { CallToAction } from "@/components/CallToAction";
import { FeaturedTutors } from "@/components/FeaturedTutors";
import { HeroCarousel } from "@/components/HeroCarousel";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";


export default function Home() {
  return (
    <div className="">
      <HeroCarousel></HeroCarousel>
      <FeaturedTutors></FeaturedTutors>
      <StatsSection></StatsSection>
      <TestimonialsSection></TestimonialsSection>
      <CallToAction></CallToAction>
    </div>
  );
}
