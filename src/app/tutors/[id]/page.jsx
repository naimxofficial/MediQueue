"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
    Star,
    CheckCircle,
    Clock,
    Calendar,
    Globe,
    ArrowLeft,
    MessageSquare,
    Video,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog"
import { toast } from "react-toastify"
import { Input, Label, TextArea } from "@heroui/react"
import { Separator } from "@/components/ui/Separator"
import { authClient } from "@/lib/auth-client"



export default function TutorDetailsPage() {

    const params = useParams()
    const router = useRouter()
    const [tutor, setTutor] = React.useState(null)
    const { data: session } = authClient.useSession()
    const currentUser = session?.user


    React.useEffect(() => {
        fetch(`http://localhost:5000/tutors/${params.id}`,
            {
                headers: {
                    authorization: "logged in"
                }
            }
        )
            .then((res) => res.json())
            .then((data) => setTutor(data))
    }, [params.id])

    const [bookingOpen, setBookingOpen] = React.useState(false)
    const [isBooking, setIsBooking] = React.useState(false)
    const [studentName, setStudentName] = React.useState("")
    const [phone, setPhone] = React.useState("")
    if (!tutor) return <div className="loading loading-spinner text-primary loading-xl mx-auto"></div>

    const handleBookSession = async () => {
        if (!studentName || !phone) {
            toast.error("Please fill in all fields")
            return
        }

        setIsBooking(true)

        const bookingData = {
            studentName,
            phone,
            studentEmail: currentUser?.email,
            tutorId: tutor._id,
            tutorName: tutor.name,
            bookStatus: "pending",
        }



        const res = await fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        })

        if (res.ok) {
            // decrease slot
            await fetch(`http://localhost:5000/tutors/${tutor._id}/decrease-slot`, {
                method: "PATCH",
            })
            toast.success("Session booked successfully!")
            setBookingOpen(false)
            router.push("/my-booked-sessions")
        }
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}))
            toast.error(errorData.error || "Failed to book session")
            setIsBooking(false)
            return
        }

        setIsBooking(false)
    }
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                {/* Back Button */}
                <div className="border-b border-border bg-primary/30">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <Link
                            href="/tutors"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Tutors
                        </Link>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* Profile Header */}
                            <Card>
                                <CardContent className="p-6 sm:p-8">
                                    <div className="flex flex-col gap-6 sm:flex-row">
                                        <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-2xl sm:mx-0">
                                            <Image
                                                src={tutor.avatar}
                                                alt={tutor.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <div className="flex flex-col items-center gap-2 sm:flex-row">
                                                <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                                                    {tutor.name}
                                                </h1>
                                                {tutor.verified && (
                                                    <span className="gap-1 badge bg-accent text-accent-foreground">
                                                        <CheckCircle className="h-3 w-3" />
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 text-lg text-muted-foreground">
                                                {tutor.subject} - {tutor.specialty}
                                            </p>

                                            <div className="mt-4 flex flex-wrap justify-center gap-4 sm:justify-start">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                                                    <span className="font-medium">{tutor.rating}</span>
                                                    <span className="text-muted-foreground">
                                                        ({tutor.reviewCount} reviews)
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    {tutor.experience} years experience
                                                </div>
                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                    <Video className="h-4 w-4" />
                                                    {tutor.totalSessions.toLocaleString()} sessions
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* About */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-serif">About Me</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="leading-relaxed text-muted-foreground">
                                        {tutor.bio}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-serif">Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <Globe className="h-4 w-4 text-primary" />
                                                Languages
                                            </h4>
                                            <p className="mt-1 text-muted-foreground">
                                                {tutor.languages.join(", ")}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                Availability
                                            </h4>
                                            <p className="mt-1 text-muted-foreground">
                                                {tutor.availability.join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Reviews Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-serif">Student Reviews</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {[1, 2, 3].map((review) => (
                                        <div key={review}>
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 shrink-0 rounded-full bg-secondary" />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-foreground">
                                                            Student {review}
                                                        </span>
                                                        <div className="flex items-center gap-0.5">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Star
                                                                    key={star}
                                                                    className="h-3 w-3 fill-amber-400 text-amber-400"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Excellent tutor! Very patient and explains concepts
                                                        clearly. Highly recommended for anyone looking to
                                                        improve their understanding.
                                                    </p>
                                                </div>
                                            </div>
                                            {review < 3 && <Separator className="mt-6" />}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar - Booking Card */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <Card className="border-2 border-primary/20">
                                    <CardHeader>
                                        <CardTitle className="font-serif">Book a Session</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-baseline justify-between">
                                            <div>
                                                <span className="text-3xl font-bold text-primary">
                                                    ${tutor.hourlyRate}
                                                </span>
                                                <span className="text-muted-foreground">/hour</span>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <Video className="h-4 w-4 text-primary" />
                                                <span>Live video sessions</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <MessageSquare className="h-4 w-4 text-primary" />
                                                <span>Chat support between sessions</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                <span>Flexible scheduling</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                <span>Session Date: {tutor.sessionDate}</span>
                                            </div>
                                        </div>
                                        {tutor.totalSlot === 0 ? (
                                            <p className="text-red-500 text-sm">No available slots left.</p>
                                        ) : new Date() < new Date(tutor.sessionDate) ? (
                                            <p className="text-red-500 text-sm">Booking is not available yet for this tutor.</p>
                                        ) : (
                                            <button className="btn btn-primary w-full" onClick={() => setBookingOpen(true)}>
                                                Book Session
                                            </button>
                                        )}

                                        <p className="text-center text-xs text-muted-foreground">
                                            Free cancellation up to 24 hours before the session
                                        </p>
                                        <p className="text-center font-bold text-sm text-red-500">
                                            {tutor.totalSlot} slots remaining
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Booking Dialog */}
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-serif">
                            Book Session
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Student Name</Label>
                            <br />
                            <Input placeholder="Your Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                            <br />
                            <br />
                            <Label>Phone Number</Label>
                            <br />
                            <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <br />
                            <br />
                            <Label>Tutor id</Label>
                            <br />
                            <Input value={tutor._id} disabled />
                            <br />
                            <br />
                            <Label>Tutor Name</Label>
                            <br />
                            <Input value={tutor.name} disabled />
                            <br />
                            <br />
                            <Label>Student Email</Label>
                            <br />
                            <Input value={currentUser?.email} disabled />
                        </div>
                        <Separator />
                    </div>

                    <DialogFooter>
                        <button className="btn btn-outline" onClick={() => setBookingOpen(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleBookSession} disabled={isBooking}>
                            {isBooking ? "Booking..." : "Confirm Booking"}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
