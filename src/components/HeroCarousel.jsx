"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@heroui/react"

const slides = [
  {
    id: 1,
    title: "Learn from the Best Tutors Online",
    subtitle: "Connect with expert educators worldwide",
    description:
      "Get personalized 1-on-1 tutoring sessions tailored to your learning style and pace. Our verified tutors are here to help you succeed.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
    cta: "Find Your Tutor",
    href: "/tutors",
  },
  {
    id: 2,
    title: "Flexible Scheduling That Works for You",
    subtitle: "Book sessions anytime, anywhere",
    description:
      "Choose from hundreds of available time slots. Learn at your own pace with sessions that fit your busy schedule.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop",
    cta: "View Available Sessions",
    href: "/tutors",
  },
  {
    id: 3,
    title: "Track Your Progress & Excel",
    subtitle: "Data-driven learning insights",
    description:
      "Monitor your improvement with detailed analytics and personalized recommendations to help you reach your academic goals.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    cta: "Start Learning",
    href: "/register",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // ✅ TypeScript types removed below
  const goToSlide = (index) => setCurrentSlide(index)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/5 to-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  "transition-all duration-500",
                  currentSlide === index
                    ? "opacity-100"
                    : "pointer-events-none absolute opacity-0"
                )}
              >
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  {slide.subtitle}
                </span>
                <h1 className="mt-4 font-serif text-4xl not-md:text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-6 text-lg not-md:text-sm text-muted-foreground">
                  {slide.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href={slide.href}>
                    <Button size="md"  className="gap-2">
                      {slide.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="md" variant="outline">
                      Create Free Account
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-2xl">
              {slides.map((slide, index) => (
                <Image
                  key={slide.id}
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className={cn(
                    "object-cover transition-all duration-700",
                    currentSlide === index
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0"
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
            </div>

            {/* Navigation Arrows */}
            <div className="absolute -bottom-4 right-4 flex gap-2 sm:bottom-4">
              <Button
                variant="secondary"
                size="icon"
                onClick={prevSlide}
                className="h-10 w-10 rounded-full shadow-lg"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={nextSlide}
                className="h-10 w-10 rounded-full shadow-lg"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next slide</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/30 hover:bg-primary/50"
              )}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}