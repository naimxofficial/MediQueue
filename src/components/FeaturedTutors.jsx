import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@heroui/react"
import { TutorCard } from "./ui/TutorCard"

export async function FeaturedTutors() {
  const tutorsCollection = await fetch('http://localhost:5000/featured')
  const featuredTutors = await tutorsCollection.json()

  return (
    <section className="bg-background py-16 sm:py-20" id="featured-tutors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Featured Tutors
            </h2>
            <p className="mt-2 text-muted-foreground">
              Learn from our top-rated educators with proven track records
            </p>
          </div>
          <Link href="/tutors">
            <Button variant="outline" className="gap-2">
              View All Tutors
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  )
}