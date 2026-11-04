import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type ApiEvent = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  thumbnailUrl?: string;
};

const categoryColors: Record<string, string> = {
  Donation: "from-[#f9822c] to-[#b4451b]",
  Plantation: "from-[#6d9148] to-[#38552f]",
  Cleanup: "from-[#5e83ad] to-[#315271]",
  Education: "from-[#5a4c44] to-[#302923]",
};

const fallbackColor = "from-[#f9822c] to-[#b4451b]";

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
    typeof event.location === "string"
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

async function getJoinedEvents(email: string): Promise<ApiEvent[]> {
  const response = await fetch(
    `http://localhost:5000/my-joined-events/${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Unable to load joined events: ${response.status}`);
  }

  const payload: unknown = await response.json();

  if (!Array.isArray(payload)) {
    throw new Error("The joined events response was not a list.");
  }

  // Sort by event date, soonest first (dates are YYYY-MM-DD strings)
  return payload
    .filter(isApiEvent)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export default async function JoinedEventPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.email) {
    redirect("/sign-in");
  }

  const events = await getJoinedEvents(session.user.email);

  return (
    <main className="bg-[#fff7ed] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-300">
        <h1 className="text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
          Events you joined
        </h1>

        {events.length > 0 ? (
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-md border border-border bg-card shadow-sm"
              >
                <div className="relative h-45 sm:h-46">
                  {event.thumbnailUrl ? (
                    <Image
                      src={event.thumbnailUrl}
                      alt={event.title}
                      height={180}
                      width={300}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`flex h-full items-end bg-linear-to-br ${
                        categoryColors[event.eventType] ?? fallbackColor
                      } p-4 text-primary-foreground`}
                    >
                      <p className="text-base font-bold">{event.eventType}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col p-5 sm:p-5.5">
                  <p className="text-xs font-bold tracking-[0.28em] text-primary">
                    {event.eventType.toUpperCase()}
                  </p>

                  <h2 className="mt-4 text-2xl leading-tight font-bold text-foreground">
                    {event.title}
                  </h2>

                  <div className="mt-2 text-base leading-6 text-muted-foreground">
                    <p>{event.location}</p>
                    <p>{formatDate(event.date)}</p>
                  </div>

                  <Link
                    href={`/upcoming-events/${event._id}`}
                    className="mt-5 rounded-md bg-primarypx-4 py-3 text-center text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-[#b1421c]/30 focus-visible:outline-none"
                  >
                    View Event
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-9 rounded-md border border-border bg-card p-6 text-base text-muted-foreground">
            You have not joined any events yet.
          </p>
        )}
      </div>
    </main>
  );
}