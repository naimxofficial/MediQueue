import { FeaturedTutors } from "@/components/FeaturedTutors";
import { HeroCarousel } from "@/components/HeroCarousel";


export default function Home() {
  return (
    <div className="">
      <HeroCarousel></HeroCarousel>
      <FeaturedTutors></FeaturedTutors>
    </div>
  );
}
