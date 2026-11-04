
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EditEvents from "@/components/Events/EditEvents";
import DeleteEvent from "@/components/Events/DeleteEvent";
import getTokenFromServer from "@/lib/getTokenFromServer";

type ApiEvent = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  thumbnailUrl: string;
  description: string;
};

const categoryStyles: Record<string, { background: string; text: string }> = {
  Donation: { background: "bg-[#ffc96f]", text: "text-foreground" },
  Plantation: { background: "bg-[#b9db8d]", text: "text-foreground" },
  Cleanup: { background: "bg-[#b8d7f6]", text: "text-foreground" },
  Education: { background: "bg-[#f0c0af]", text: "text-foreground" },
};

const fallbackCategoryStyle = {
  background: "bg-[#ead6c3]",
  text: "text-foreground",
};

function isApiEvent(value: unknown): value is ApiEvent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const event = value as Partial<ApiEvent>;

  return (
    typeof event._id === "string" &&
    typeof event.title === "string" &&
    typeof event.eventType === "string" &&
    typeof event.date === "string" &&
    typeof event.location === "string" &&
    (event.thumbnailUrl === undefined || typeof event.thumbnailUrl === "string")
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

async function getMyEvents(email: string): Promise<ApiEvent[]> {
  const token = await getTokenFromServer();
  const response = await fetch(
    `http://localhost:5000/my-events/${encodeURIComponent(email)}`,
    { cache: "no-store", headers: { authorization: `Bearer ${token}` } },
  );

  if (!response.ok) {
    throw new Error(`Unable to load your events: ${response.status}`);
  }

  const payload: unknown = await response.json();

  if (!Array.isArray(payload)) {
    throw new Error("The my-events response was not a list.");
  }

  const events = payload.filter(isApiEvent);

  if (events.length !== payload.length) {
    throw new Error("The my-events response contained invalid events.");
  }

  return events;
}

function EventThumbnail({ event }: { event: ApiEvent }) {
  const categoryStyle =
    categoryStyles[event.eventType] ?? fallbackCategoryStyle;

  if (event.thumbnailUrl) {
    return (
      <div className="relative size-17 shrink-0 overflow-hidden rounded-xl sm:size-18">
        <Image
          src={event.thumbnailUrl}
          alt=""
          fill
          sizes="72px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex size-17 shrink-0 items-center justify-center rounded-xl text-3xl font-bold sm:size-18 ${categoryStyle.background} ${categoryStyle.text}`}
      aria-label={`${event.eventType} event`}
    >
      {event.eventType.charAt(0).toUpperCase()}
    </div>
  );
}

export default async function ManageMyEventsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.email) {
    throw new Error("You must be signed in to manage events.");
  }

  const events = await getMyEvents(session.user.email);

  return (
    <main className="bg-[#fff7ed] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-300">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-primary sm:text-sm">
              YOUR EVENTS
            </p>
            <h1 className="mt-4 text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
              Manage your events
            </h1>
          </div>

          <Link
            href="/create-event"
            className="inline-flex w-fit items-center justify-center rounded-md bg-[#ad421c] px-5 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-[#b1421c]/30 focus-visible:outline-none"
          >
            + New event
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="mt-8 space-y-4 sm:mt-9">
            {events.map((event) => (
              <article
                key={event._id}
                className="flex flex-col gap-5 rounded-md border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-6"
              >
                <EventThumbnail event={event} />

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-bold text-foreground sm:text-xl">
                    {event.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    {event.location} · {formatDate(event.date)}
                  </p>
                  <span
                    className={`mt-3 inline-flex rounded-md px-3 py-1 text-xs font-bold ${
                      (categoryStyles[event.eventType] ?? fallbackCategoryStyle)
                        .background
                    } ${
                      (categoryStyles[event.eventType] ?? fallbackCategoryStyle)
                        .text
                    }`}
                  >
                    {event.eventType}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 sm:shrink-0">
                  <Link
                    href={`/upcoming-events/${event._id}`}
                    className="rounded-md border border-[#ad421c] px-4 py-2.5 text-sm font-bold text-[#ad421c] transition-colors hover:bg-[#fff1e5] focus-visible:ring-4 focus-visible:ring-[#b1421c]/30 focus-visible:outline-none"
                  >
                    View
                  </Link>
                  <EditEvents events={event} />
                  
                  <DeleteEvent event={event} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-md border border-border bg-card p-6 text-center shadow-sm sm:mt-9 sm:p-10">
            <h2 className="text-2xl font-bold text-foreground">No events yet</h2>
            <p className="mt-2 text-base text-muted-foreground">
              Create an event to start something good in your neighborhood.
            </p>
            <Link
              href="/create-event"
              className="mt-5 inline-flex rounded-md bg-[#ad421c] px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-[#b1421c]/30 focus-visible:outline-none"
            >
              Create your first event
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
