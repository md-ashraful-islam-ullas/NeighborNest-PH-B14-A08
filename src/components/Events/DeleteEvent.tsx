'use client';
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import getTokenFromClient from "@/lib/getTokenFromClient";
type ApiEvent = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  description: string;
  thumbnailUrl: string;
  creator?: {
    name?: string | null;
    email?: string | null;
  } | null;
};

const DeleteEvent = ({ event }: { event: ApiEvent }) => {
  const router = useRouter();

  const handleDeleteEvent = async () => {
    const token = await getTokenFromClient();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${event._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (data.deletedCount > 0) {
      router.refresh();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            className="rounded-md bg-[#b92720] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#991d18] focus-visible:ring-4 focus-visible:ring-destructive/30 focus-visible:outline-none"
          >
            Delete
          </button>
        }
      />
      <AlertDialogContent
        className="border border-border bg-card shadow-xl"
        size="sm"
      >
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle className="font-bold text-foreground">
            Delete Event?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-border bg-card text-foreground hover:bg-accent hover:text-primary">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDeleteEvent}
            className="bg-[#b92720] text-white hover:bg-[#991d18]"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEvent;