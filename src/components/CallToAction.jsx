import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CallToAction() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary/80 px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to Start Learning?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
            Join MediQueue today and connect with expert tutors who are ready to
            help you achieve your academic goals. Your first session is just a
            click away.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/tutors">
              <button
                className="gap-2 btn text-background bg-foreground border-none shadow-none hover:bg-foreground/70 rounded-lg"
              >
                Browse Tutors
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/dashboard/add-tutor">
              <button
                className="btn btn-outline text-foreground  rounded-lg  hover:bg-foreground/30 sm:w-auto"
              >
                Become a Tutor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
