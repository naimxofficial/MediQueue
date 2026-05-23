"use client"

import * as React from "react"
import Link from "next/link"
import {
  Calendar,
  MoreHorizontal,
  X
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/Card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/Table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/Dialog"
import { toast } from "react-toastify"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { Button } from "@heroui/react"



export default function MyBookedSessionsPage() {
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false)
  const [selectedSession, setSelectedSession] = React.useState(null)
  const [isCancelling, setIsCancelling] = React.useState(false)
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      const activeBookings = data.filter(session => session.bookStatus !== "cancelled");
      setBookings(activeBookings);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your sessions");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMyBookings();
  }, []);


  const handleCancel = async () => {
    if (!selectedSession) return;

    setIsCancelling(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${selectedSession._id}/cancel`, {
        method: 'PATCH'
      });

      if (!res.ok) throw new Error("Failed to cancel");

      toast.success("Session cancelled", {
        description: "Your session has been cancelled and refunded."
      });

      fetchMyBookings();
    } catch (error) {
      toast.error("Failed to cancel session");
    } finally {
      setIsCancelling(false);
      setCancelDialogOpen(false);
    }
  };




  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          My Sessions
        </h1>
        <p className="mt-2 text-muted-foreground">
          View and manage your tutoring sessions
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="font-serif">Your Booked Sessions</CardTitle>
              <CardDescription>
                All your upcoming tutoring sessions
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center"><span className="loading loading-spinner text-primary loading-xl"></span></div>
          ) : bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tutor</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-17"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map(session => (
                    <TableRow key={session._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/tutors/${session.tutorId}`}
                            className="font-medium text-foreground hover:underline"
                          >
                            {session.tutorName}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>{session.studentName || session.student}</TableCell>
                      <TableCell>{session.studentEmail || "—"}</TableCell>
                      <TableCell className="font-medium">{session.phone}</TableCell>
                      <TableCell><span className="badge bg-accent text-accent-foreground">{session.bookStatus}</span></TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="btn btn-ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link className="text-blue-500 font-bold" href={`/tutors/${session.tutorId}`}>
                                View Tutor
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className=" font-bold text-red-500 "
                              onClick={() => {
                                setSelectedSession(session)
                                setCancelDialogOpen(true)
                              }}
                            >
                              <X className="mr-2 h-4 w-4 text-red-500" />
                              Cancel Session
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
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                No sessions found
              </h3>
              <p className="mt-2 text-muted-foreground">You haven't booked any sessions yet.</p>
              <Link href="/tutors">
                <button className="mt-4 btn btn-primary">
                  Find a Tutor
                </button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif">Cancel Session</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your session with{" "}
              {selectedSession?.tutorName}? You will receive a full refund.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setCancelDialogOpen(false)}
              variant="secondary"
            >
              Keep Session
            </Button>
            <Button
              variant="danger"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Cancel Session"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
