"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Pencil, Trash2, MoreHorizontal, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog"
import { Button, Input } from "@heroui/react"
import { toast } from "react-toastify"

export default function MyTutorsPage() {

    const [myTutors, setMyTutors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedTutor, setSelectedTutor] = React.useState(null);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editTutor, setEditTutor] = React.useState(null);

    const fetchMyTutors = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/my-tutors");

            if (!res.ok) throw new Error("Failed to fetch");

            const data = await res.json();
            setMyTutors(data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load tutors");
            setMyTutors([]);           // ← Added this
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchMyTutors();
    }, []);

    const handleDelete = async () => {
        if (!selectedTutor?._id) return;

        setIsDeleting(true);

        try {
            const res = await fetch(`http://localhost:5000/my-tutors/${selectedTutor._id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error("Delete failed");

            setMyTutors((prev) => prev.filter(t => t._id !== selectedTutor._id));
            toast.success("Tutor profile deleted", {
                description: `${selectedTutor.name}'s profile has been removed.`,
            });
        } catch (error) {
            toast.error("Failed to delete tutor");
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
        }
    };


    const handleEditClick = (tutor) => {
        setEditTutor({ ...tutor });
        setIsEditing(true);
    };

    const handleUpdate = async () => {
        if (!editTutor?._id) {
            toast.error("No tutor selected");
            return;
        }

        try {
            const { _id, createdAt, ...dataToUpdate } = editTutor;

            const res = await fetch(`http://localhost:5000/my-tutors/${_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToUpdate),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Update failed");
            }

            toast.success("Tutor updated successfully");
            setIsEditing(false);
            setEditTutor(null);
            fetchMyTutors(); 
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to update tutor");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditTutor(prev => ({
            ...prev,
            [name]: value
        }));
    };
    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-8">
                <p className="text-center text-muted-foreground">Loading your tutors...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-foreground">
                        My Tutors
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Manage your tutor profiles and track their performance
                    </p>
                </div>
                <Link href="/add-tutors">
                    <button className="gap-2 btn btn-primary">
                        <Plus className="h-4 w-4" />
                        Add Tutor
                    </button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="font-serif">Tutor Profiles</CardTitle>
                            <CardDescription>
                                You have {myTutors.length} tutor profile{myTutors.length !== 1 ? "s" : ""}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {myTutors.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tutor</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Rate</TableHead>
                                        <TableHead>Experience</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Total Slot</TableHead>
                                        <TableHead className="w-17"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {myTutors.map((tutor) => (
                                        <TableRow key={tutor._id || tutor.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                                        <Image
                                                            src={tutor.avatar}
                                                            alt={tutor.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">
                                                            {tutor.name}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {tutor.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{tutor.subject}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {tutor.specialty}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">${tutor.hourlyRate}</span>
                                                <span className="text-muted-foreground">/hr</span>
                                            </TableCell>
                                            <TableCell>{(tutor.experience || 0).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium">{tutor.location}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">{tutor.totalSlot}</span>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="btn btn-ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Open menu</span>
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleEditClick(tutor)}>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-destructive focus:text-destructive"
                                                            onClick={() => {
                                                                if (tutor) {
                                                                    setSelectedTutor(tutor);
                                                                    setDeleteDialogOpen(true);
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                                No tutors found
                            </h3>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-serif">Delete Tutor Profile</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {selectedTutor?.name}&apos;s profile?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <button
                            className="btn btn-outline"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancel
                        </button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Tutor Dialog */}
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-serif">Edit Tutor Profile</DialogTitle>
                        <DialogDescription>
                            Update the tutor information below
                        </DialogDescription>
                    </DialogHeader>

                    {editTutor && (
                        <div className="space-y-4 py-4">
                            <div>
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    name="name"
                                    value={editTutor.name || ""}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    name="email"
                                    value={editTutor.email || ""}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Subject</label>
                                    <Input
                                        name="subject"
                                        value={editTutor.subject || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Specialty</label>
                                    <Input
                                        name="specialty"
                                        value={editTutor.specialty || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Hourly Rate ($)</label>
                                    <Input
                                        name="hourlyRate"
                                        type="number"
                                        value={editTutor.hourlyRate || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Experience</label>
                                    <Input
                                        name="experience"
                                        type="number"
                                        value={editTutor.experience || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Location</label>
                                    <Input
                                        name="location"
                                        value={editTutor.location || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Total Slot</label>
                                    <Input
                                        name="totalSlot"
                                        type="number"
                                        value={editTutor.totalSlot || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                        </div>
                    )}

                    <DialogFooter>
                        <button className="btn btn-outline" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                        <Button onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
