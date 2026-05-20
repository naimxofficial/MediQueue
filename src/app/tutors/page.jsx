"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { TutorCard } from "@/components/ui/TutorCard"
import { Input } from "@heroui/react"

export default function TutorsPage() {
  const [search, setSearch] = React.useState("")
  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")
  const [tutors, setTutors] = React.useState([])

  React.useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (startDate) params.append("startDate", startDate)
    if (endDate) params.append("endDate", endDate)

    fetch(`http://localhost:5000/tutors?${params}`)
      .then((res) => res.json())
      .then((data) => setTutors(data))
  }, [search, startDate, endDate])

  const activeFiltersCount = [!!search, !!startDate, !!endDate].filter(Boolean).length

  const clearFilters = () => {
    setSearch("")
    setStartDate("")
    setEndDate("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="border-b border-border bg-primary/30 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Find Your Perfect Tutor
            </h1>
            <p className="mt-2 text-muted-foreground">
              Browse our community of expert educators and book your session
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div> 
              <div className="flex items-center gap-3"><p>From:</p>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-40" /></div>
              <div className="flex items-center gap-3">
              <p>To:</p>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-40" /></div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {search && (
                  <span className="gap-1 badge">
                    "{search}"
                    <button onClick={() => setSearch("")}><X className="h-3 w-3" /></button>
                  </span>
                )}
                {(startDate || endDate) && (
                  <span className="gap-1 badge">
                    {startDate || "..."} → {endDate || "..."}
                    <button onClick={() => { setStartDate(""); setEndDate("") }}><X className="h-3 w-3" /></button>
                  </span>
                )}
                <button onClick={clearFilters} className="text-xs">Clear all</button>
              </div>
            )}
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-6 text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{tutors.length}</span> tutors
            </p>

            {tutors.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tutors.map((tutor) => (
                  <TutorCard key={tutor._id} tutor={tutor} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card py-16 text-center">
                <div className="mx-auto max-w-md">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">No tutors found</h3>
                  <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
                  <button onClick={clearFilters} className="text-xs btn btn-sm btn-primary">Clear all filters</button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}