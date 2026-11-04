import JoinEventButtonCard from "@/components/Events/JoinEventButtonCard";
import Image from "next/image";
import Link from "next/link";

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
    typeof event.description === "string" &&
    typeof event.thumbnailUrl === "string" &&
    event.thumbnailUrl.length > 0 &&
    (event.creator == null ||
      (typeof event.creator === "object" &&
        (event.creator.name == null ||
          typeof event.creator.name === "string") &&
        (event.creator.email == null ||
          typeof event.creator.email === "string")))
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

async function getEvent(id: string): Promise<ApiEvent> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to load event: ${response.status}`);
  }

  const payload: unknown = await response.json();

  if (!isApiEvent(payload)) {
    throw new Error("The event response is missing required details.");
  }

  return payload;
}

export default async function EventsDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  return (
    <main className="bg-background px-5 py-8 text-foreground sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-275">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-1 text-base font-bold text-[#a63f1c] transition-colors hover:text-[#8f3215] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          <span aria-hidden="true">←</span>
          All events
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)] lg:items-start">
          <section>
            <div className="relative min-h-75 overflow-hidden rounded-2xl sm:min-h-95 lg:min-h-70">
              <Image
                src={event.thumbnailUrl}
                alt={event.title}
                fill
                priority
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#211b18]/65 via-transparent to-transparent" />
              <div className="absolute inset-x-7 bottom-7 sm:inset-x-8 sm:bottom-8">
                <span className="inline-flex rounded-md bg-card/75 px-3.5 py-2 text-sm font-bold text-foreground backdrop-blur-sm">
                  {event.eventType}
                </span>
                <h1 className="mt-5 max-w-180 text-4xl leading-[1.05] font-bold text-primary-foreground sm:text-5xl lg:text-5xl">
                  {event.title}
                </h1>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card px-4 py-4">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="mt-2 text-base font-bold">
                  {formatDate(event.date)}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card px-4 py-4">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="mt-2 text-base font-bold">{event.location}</p>
              </div>
              <div className="rounded-lg border border-border bg-card px-4 py-4">
                <p className="text-sm text-muted-foreground">Entry</p>
                <p className="mt-2 text-base font-bold">Free to join</p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <section>
                <h2 className="text-3xl leading-tight font-bold">
                  About this event
                </h2>
                <p className="mt-2 max-w-180 text-base leading-7 text-[#3d332e]">
                  {event.description}
                </p>
              </section>

              <section>
                <h2 className="text-3xl leading-tight font-bold">
                  How it works
                </h2>
                <ol className="mt-2 list-decimal space-y-2 pl-5 text-base leading-7 text-[#3d332e]">
                  <li>Press Join Event, and log in if asked.</li>
                  <li>Show up at the place and time above.</li>
                  <li>Find this event later under Joined Events.</li>
                </ol>
              </section>
            </div>
          </section>

          <JoinEventButtonCard event={event} />
        </div>
      </div>
    </main>
  );
}
