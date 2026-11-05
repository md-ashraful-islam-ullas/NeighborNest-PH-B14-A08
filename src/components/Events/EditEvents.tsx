"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import getTokenFromClient from "@/lib/getTokenFromClient";
import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";

// Pastel background + a darker shade of the same color for the text,
// so the chips stay readable in both light and dark themes.
const eventTypes = [
  { label: "Cleanup", className: "bg-[#b8d7f6] text-[#042c53]" },
  { label: "Plantation", className: "bg-[#b9db8d] text-[#173404]" },
  { label: "Donation", className: "bg-[#ffc96f] text-[#412402]" },
  { label: "Education", className: "bg-[#f0c0af] text-[#4a1b0c]" },
];

type FormValues = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  description: string;
  thumbnailUrl: string;
};

const inputClassName =
  "mt-2 w-full rounded-md border border-input bg-background px-3 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20";

const EditEvents = ({ events }: { events: FormValues }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [values, setValues] = useState(events);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setError("");
    setSubmitted(false);
  };
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !values.title.trim() ||
      !values.date ||
      !values.location.trim() ||
      !values.description.trim()
    ) {
      setError("Please complete the required event details before publishing.");
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);

    const { title, eventType, date, location, description, thumbnailUrl } =
      values;

    const token = await getTokenFromClient();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${values._id}`, {
      cache: "no-store",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        eventType,
        date,
        location,
        description,
        thumbnailUrl,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create event");
    }

    const data = await res.json();
    setOpen(false);
    router.refresh();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="rounded-md border border-primary px-4 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-accent focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-none"
          >
            Update
          </button>
        }
      />
      <DialogContent className="min-w-200 border-0! outline-none! ring-0! p-0 shadow-none">
        <DialogTitle className="sr-only">Update event</DialogTitle>
        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-border bg-card px-6 py-8 shadow-sm sm:px-9 sm:py-9"
        >
          <fieldset>
            <legend className="text-sm font-bold tracking-[0.28em] text-primary">
              1 · THE BASICS
            </legend>

            <label htmlFor="title" className="mt-5 block font-bold">
              Title
              <input
                id="title"
                name="title"
                value={values.title}
                onChange={(event) => updateValue("title", event.target.value)}
                placeholder="Winter clothes drive"
                className={inputClassName}
                required
              />
            </label>

            <div className="mt-5">
              <p className="font-bold">Event type</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {eventTypes.map((eventType) => {
                  const isSelected = values.eventType === eventType.label;

                  return (
                    <button
                      key={eventType.label}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => updateValue("eventType", eventType.label)}
                      className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
                        isSelected ? "border-foreground" : "border-transparent"
                      } ${eventType.className}`}
                    >
                      {eventType.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="text-sm font-bold tracking-[0.28em] text-primary">
              2 · WHEN AND WHERE
            </legend>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label htmlFor="date" className="block font-bold">
                Event date
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={values.date}
                  onChange={(event) => updateValue("date", event.target.value)}
                  className={inputClassName}
                  required
                />
              </label>
              <label htmlFor="location" className="block font-bold">
                Location
                <input
                  id="location"
                  name="location"
                  value={values.location}
                  onChange={(event) =>
                    updateValue("location", event.target.value)
                  }
                  placeholder="Mirpur 10, Dhaka"
                  className={inputClassName}
                  required
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="text-sm font-bold tracking-[0.28em] text-primary">
              3 · TELL PEOPLE MORE
            </legend>
            <label htmlFor="description" className="mt-5 block font-bold">
              Description
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={(event) =>
                  updateValue("description", event.target.value)
                }
                placeholder="What will volunteers do, and what should they bring?"
                className={`${inputClassName} min-h-24 resize-y`}
                required
              />
            </label>
            <label htmlFor="thumbnailUrl" className="mt-5 block font-bold">
              Thumbnail image URL (optional)
              <input
                id="thumbnailUrl"
                name="thumbnailUrl"
                type="url"
                value={values.thumbnailUrl}
                onChange={(event) =>
                  updateValue("thumbnailUrl", event.target.value)
                }
                placeholder="https://"
                className={inputClassName}
              />
            </label>
          </fieldset>

          {error ? (
            <p role="alert" className="mt-4 text-sm font-bold text-destructive">
              {error}
            </p>
          ) : null}
          {submitted ? (
            <p
              role="status"
              className="mt-4 rounded-md bg-[#eef7e7] px-4 py-3 text-sm font-bold text-[#315d2b] dark:bg-[#1f3a1c] dark:text-[#b9db8d]"
            >
              Your event is ready to share with the neighborhood.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-primary px-5 py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            Publish event →
          </button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Your event appears on the Upcoming Events page right away.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEvents;