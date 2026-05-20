import { Users, Calendar, Star, BookOpen } from "lucide-react"

const iconMap = {
    users: Users,
    calendar: Calendar,
    star: Star,
    book: BookOpen,
}

export function StatsSection() {
    const stats = [
        { label: "Active Tutors", value: "2,500+", icon: "users" },
        { label: "Sessions Completed", value: "50,000+", icon: "calendar" },
        { label: "Student Satisfaction", value: "98%", icon: "star" },
        { label: "Subjects Covered", value: "150+", icon: "book" },
    ]

    return (
        <section className="bg-primary py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
                        Trusted by Students Worldwide
                    </h2>
                    <p className="mt-2 text-primary-foreground/80">
                        Join thousands of learners achieving their academic goals
                    </p>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = iconMap[stat.icon]
                        return (
                            <div
                                key={stat.label}
                                className="group rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.06] p-6 text-center transition-all duration-300 hover:bg-primary-foreground/[0.12]"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-foreground/20 transition-transform duration-300 group-hover:scale-110">
                                    <Icon className="h-7 w-7 text-primary-foreground" />
                                </div>
                                <p className="mt-4 font-serif text-4xl font-bold text-primary-foreground">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-sm text-primary-foreground/80">
                                    {stat.label}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
