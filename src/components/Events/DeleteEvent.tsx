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
import { ApiEvent } from "./JoinEventButtonCard";

const DeleteEvent = ({ event }: { event: ApiEvent }) => {
    const router = useRouter();

    const handleDeleteEvent = async () => {
        const res = await fetch(`http://localhost:5000/events/${event._id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        console.log("Event deleted:", data);

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
            className="rounded-md bg-[#b92720] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#991d18] focus-visible:ring-4 focus-visible:ring-[#b92720]/30 focus-visible:outline-none"
          >
            Delete
          </button>
        }
      />
      <AlertDialogContent
        className="border border-[#ead6c3] bg-white shadow-xl"
        size="sm"
      >
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-[#fff1e6] text-[#b4441b]">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle className="font-bold text-[#29211e]">
            Delete Event?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-[#78665c]">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-[#ead6c3] bg-white text-[#29211e] hover:bg-[#fff7ed] hover:text-[#b4441b]">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction onClick={handleDeleteEvent} className="bg-[#b92c24] text-white hover:bg-[#a3221c]">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEvent;
