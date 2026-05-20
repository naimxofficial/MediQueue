"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, CheckCircle, Clock } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "./Card"
import { Badge, Button } from "@heroui/react"

export function TutorCard({ tutor }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={tutor.avatar}
              alt={tutor.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-serif text-lg font-semibold text-foreground">
                {tutor.name}
              </h3>
              {tutor.verified && (
                <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{tutor.subject}</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium text-foreground">
                  {tutor.rating}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({tutor.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {tutor.specialty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Clock className="mr-1 h-3 w-3" />
            {tutor.experience} years
          </Badge>
        </div>

        <p className="mt-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {tutor.bio}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div>
            <span className="text-2xl font-bold text-primary">
              ${tutor.hourlyRate}
            </span>
            <span className="text-sm text-muted-foreground">/hour</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              {tutor.totalSessions.toLocaleString()} sessions
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-border p-4">
        <Link href={`/tutors/${tutor.id}`} className="w-full">
          <button className="w-full btn btn-primary rounded-full">View Profile</button>
        </Link>
      </CardFooter>
    </Card>
  )
}
