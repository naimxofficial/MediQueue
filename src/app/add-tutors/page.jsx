"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"
import { Button, Input, Label, TextArea } from "@heroui/react"
import { toast } from "react-toastify"
import { Checkbox } from "@/components/ui/Checkbox"

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const languages = ["English", "Spanish", "French", "Mandarin", "Hindi", "German", "Japanese", "Korean"]

export default function AddTutorPage() {
    const subjects = [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "English",
        "History",
        "Economics",
        "Psychology",
        "Music",
    ]

    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        subject: "",
        specialty: "",
        bio: "",
        hourlyRate: "",
        experience: "",
        languages: [],
        availability: [],
        avatar: "",
        availableTimeSlot: "",
        totalSlot: "",
        sessionDate: "",
        institution: "",
        location: "",
        teachingMode: "",
    })

    const handleLanguageToggle = (language) => {
        setFormData((prev) => ({
            ...prev,
            languages: prev.languages.includes(language)
                ? prev.languages.filter((l) => l !== language)
                : [...prev.languages, language],
        }))
    }

    const handleAvailabilityToggle = (day) => {
        setFormData((prev) => ({
            ...prev,
            availability: prev.availability.includes(day)
                ? prev.availability.filter((d) => d !== day)
                : [...prev.availability, day],
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.email || !formData.subject || !formData.hourlyRate) {
            toast.error("Please fill in all required fields")
            return
        }

        if (formData.languages.length === 0) {
            toast.error("Please select at least one language")
            return
        }

        if (formData.availability.length === 0) {
            toast.error("Please select your availability")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch('http://localhost:5000/my-tutors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save tutor profile');
            }

            toast.success("Tutor profile created successfully!", {
                description: "Your profile is now visible to students.",
            })

            router.push("/my-tutors")
        } catch (error) {
            toast.error("Something went wrong", {
                description: error.message,
            })
        } finally {
            setIsSubmitting(false)
        }

        toast.success("Tutor profile created successfully!", {
            description: "Your profile is now visible to students.",
        })

        router.push("/my-tutors")
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-bold text-foreground">
                    Become a Tutor
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Fill in your details to create your tutor profile
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-serif text-xl">Basic Information</CardTitle>
                            <CardDescription>
                                Tell students about yourself
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="Dr. John Smith"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john.smith@example.com"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <br />
                                <TextArea
                                    id="bio"
                                    placeholder="Tell students about your background, teaching style, and what makes you a great tutor..."
                                    value={formData.bio}
                                    onChange={(e) =>
                                        setFormData({ ...formData, bio: e.target.value })
                                    }
                                    rows={4}
                                />
                                <div className="space-y-2 mt-4">
                                    <Label htmlFor="avatar">Photo Link (imgbb/postimage URL) * </Label>
                                    <br />
                                    <Input
                                        id="avatar"
                                        placeholder="https://i.ibb.co/..."
                                        value={formData.avatar}
                                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="institution">Institution & Experience</Label>
                                        <Input
                                            id="institution"
                                            placeholder="e.g., Dhaka University, 3 years"
                                            value={formData.institution}
                                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location (Area/City)</Label>
                                        <Input
                                            id="location"
                                            placeholder="e.g., Gulshan, Dhaka"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Teaching Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-serif text-xl">Teaching Details</CardTitle>
                            <CardDescription>
                                Specify your expertise and rates
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject *</Label>
                                    <Select
                                        value={formData.subject}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, subject: value })
                                        }
                                    >
                                        <SelectTrigger id="subject">
                                            <SelectValue placeholder="Select a subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects.map((subject) => (
                                                <SelectItem key={subject} value={subject}>
                                                    {subject}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="specialty">Specialty  </Label>
                                    <Input
                                        id="specialty"
                                        placeholder="e.g., Calculus, Organic Chemistry"
                                        value={formData.specialty}
                                        onChange={(e) =>
                                            setFormData({ ...formData, specialty: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
                                    <Input
                                        id="hourlyRate"
                                        type="number"
                                        placeholder="50"
                                        min="10"
                                        max="500"
                                        value={formData.hourlyRate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, hourlyRate: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="experience">Years of Experience</Label>
                                    <Input
                                        id="experience"
                                        type="number"
                                        placeholder="5"
                                        min="0"
                                        max="50"
                                        value={formData.experience}
                                        onChange={(e) =>
                                            setFormData({ ...formData, experience: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-3 mt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="teachingMode">Teaching Mode</Label>
                                        <Select
                                            value={formData.teachingMode}
                                            onValueChange={(value) => setFormData({ ...formData, teachingMode: value })}
                                        >
                                            <SelectTrigger id="teachingMode">
                                                <SelectValue placeholder="Select mode" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Online">Online</SelectItem>
                                                <SelectItem value="Offline">Offline</SelectItem>
                                                <SelectItem value="Both">Both</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <br />
                                    <div className="space-y-2">
                                        <Label htmlFor="totalSlot">Total Slots *</Label>
                                        <Input
                                            id="totalSlot"
                                            type="number"
                                            placeholder="e.g., 5"
                                            min="1"
                                            value={formData.totalSlot}
                                            onChange={(e) => setFormData({ ...formData, totalSlot: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sessionDate">Session Start Date</Label>
                                        <Input
                                            id="sessionDate"
                                            type="date"
                                            value={formData.sessionDate}
                                            onChange={(e) => setFormData({ ...formData, sessionDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Languages */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-serif text-xl">Languages *</CardTitle>
                            <CardDescription>
                                Select languages you can teach in
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {languages.map((language) => (
                                    <div key={language} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`lang-${language}`}
                                            checked={formData.languages.includes(language)}
                                            onCheckedChange={() => handleLanguageToggle(language)}
                                        />
                                        <Label
                                            htmlFor={`lang-${language}`}
                                            className="text-sm font-normal"
                                        >
                                            {language}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Availability */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-serif text-xl">Availability *</CardTitle>
                            <CardDescription>
                                Select the days you&apos;re available to teach
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {daysOfWeek.map((day) => (
                                    <Button
                                        key={day}
                                        type="button"
                                        variant={
                                            formData.availability.includes(day)
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        onClick={() => handleAvailabilityToggle(day)}
                                    >
                                        {day}
                                    </Button>
                                ))}
                            </div>
                            <div className="mt-6 space-y-2">
                                <Label htmlFor="availableTimeSlot">Available Time Slots</Label>
                                <br />
                                <TextArea
                                    id="availableTimeSlot"
                                    placeholder="Example: Sun - Thu 5:00 PM - 8:00 PM"
                                    value={formData.availableTimeSlot}
                                    onChange={(e) => setFormData({ ...formData, availableTimeSlot: e.target.value })}
                                    rows={2}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating Profile..." : "Create Tutor Profile"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
