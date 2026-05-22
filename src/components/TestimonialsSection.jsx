import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "./ui/Card"
// import { Card, CardContent } from "@/components/ui/card"
// import { testimonials } from "@/lib/data"

export function TestimonialsSection() {
    const testimonials = [
        {
            id: "1",
            name: "Alexa Johnson",
            role: "Computer Science Student",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face&q=80](https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face&q=80",
            content: "MediQueue helped me find the perfect tutor for my algorithms course. My grades improved dramatically within just a few weeks!",
            rating: 5,
        },
        {
            id: "2",
            name: "Priya Sharma",
            role: "Pre-Med Student",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
            content: "The booking process is so seamless. I love being able to see tutor availability in real-time and schedule sessions that fit my busy schedule.",
            rating: 5,
        },
        {
            id: "3",
            name: "Marcus Chen",
            role: "High School Senior",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
            content: "Thanks to my math tutor from MediQueue, I aced my SATs! The personalized attention made all the difference. It was great to have a tutor who could explain concepts.",
            rating: 5,
        },
    ]
    return (
        <section id="testimonials" className=" py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                        What Our Students Say
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Real stories from real learners who achieved their goals
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card
                            key={testimonial.id}
                            className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-foreground/30 hover:bg-primary-foreground/[0.12]"
                        >
                            <CardContent className="p-6">
                                <Quote className="h-10 w-10 text-primary" />
                                <p className="mt-4 text-foreground/70">
                                    {testimonial.content}
                                </p>
                                <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-sm text-foreground/50">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-4 w-4 fill-amber-400 text-amber-400"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
