import Image from "next/image";
import Link from "next/link";

type ApiEvent = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  description?: string;
  thumbnailUrl?: string;
};

type EventCard = {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  color: string;
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

// Today's date as YYYY-MM-DD in Dhaka time, regardless of server timezone
function getToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

async function getEvents(): Promise<EventCard[]> {
  const response = await fetch("http://localhost:5000/events", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to load events: ${response.status}`);
  }

  const payload: unknown = await response.json();
  const today = getToday();

  const events = (Array.isArray(payload) ? payload.filter(isApiEvent) : [])
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  return events.map((event) => ({
    id: event._id,
    title: event.title,
    category: event.eventType,
    date: formatDate(event.date),
    location: event.location,
    color: categoryColors[event.eventType] ?? fallbackColor,
    thumbnailUrl: event.thumbnailUrl,
  }));
}

export default async function AllEventsPage() {
  const events = await getEvents();

  return (
    <main className="bg-[#fff7ed] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-300">
        <p className="text-xs font-bold tracking-[0.3em] text-[#b1421c] sm:text-sm">
          UPCOMING EVENTS
        </p>

        <h1 className="mt-4 max-w-180 text-4xl leading-tight font-bold tracking-tight text-[#211b18] sm:text-5xl lg:text-6xl">
          Find your next good deed.
        </h1>

        {events.length === 0 ? (
          <p className="mt-9 text-lg text-[#695c54]">
            No upcoming events right now. Check back soon or{" "}
            <Link
              href="/create-event"
              className="font-bold text-[#a63f1c] underline"
            >
              create one
            </Link>
            .
          </p>
        ) : (
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-md border border-[#e6d3c0] bg-white shadow-sm"
              >
                {/* Event Thumbnail */}
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
                      className={`flex h-full items-end bg-linear-to-br ${event.color} p-4 text-white`}
                    >
                      <p className="text-base font-bold">{event.category}</p>
                    </div>
                  )}
                </div>

                {/* Event Information */}
                <div className="flex flex-col p-5 sm:p-5.5">
                  <p className="text-xs font-bold tracking-[0.28em] text-[#b1421c]">
                    {event.category.toUpperCase()}
                  </p>

                  <h2 className="mt-4 text-2xl leading-tight font-bold text-[#211b18]">
                    {event.title}
                  </h2>

                  <div className="mt-2 text-base leading-6 text-[#695c54]">
                    <p>{event.location}</p>
                    <p>{event.date}</p>
                  </div>

                  <Link
                    href={`/upcoming-events/${event.id}`}
                    className="mt-5 rounded-md bg-[#a63f1c] px-4 py-3 text-center text-base font-bold text-white transition-colors hover:bg-[#8f3215] focus-visible:ring-4 focus-visible:ring-[#b1421c]/30 focus-visible:outline-none"
                  >
                    View Event
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}