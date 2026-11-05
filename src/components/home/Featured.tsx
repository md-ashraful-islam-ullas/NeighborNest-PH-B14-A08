import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type FeaturedEvent = {
  _id: string;
  title: string;
  location: string;
  eventType: string;
  date: string;
  thumbnailUrl: string;
};

// Pastel background + a darker shade of the same color for the text,
// so labels stay readable in both light and dark themes.
const categories = [
  { label: "Donation", className: "bg-[#f9c873] text-[#412402]" },
  { label: "Plantation", className: "bg-[#b8d98d] text-[#173404]" },
  { label: "Cleanup", className: "bg-[#a9cbed] text-[#042c53]" },
  { label: "Education", className: "bg-[#f5bbaa] text-[#4a1b0c]" },
];

const getCategoryStyle = (eventType: string) => {
  return (
    categories.find((category) => category.label === eventType) || {
      label: eventType,
      className: "bg-gray-200 text-gray-700",
    }
  );
};

const getFeaturedEvents = async (): Promise<FeaturedEvent[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load featured events: ${res.status}`);
  }

  return res.json();
};

const formatDate = (value: string) => {
  const date = new Date(value);

  return {
    day: new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date),
  };
};

const Featured = async () => {
  const events = await getFeaturedEvents();

  return (
    <section className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-300">
        <p className="text-xs font-bold tracking-[0.3em] text-primary sm:text-sm">
          FEATURED EVENTS
        </p>
        <h2 className="mt-5 max-w-190 text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl">
          A little help can change an ordinary day.
        </h2>

        <Carousel
          opts={{ align: "start", loop: events.length > 3 }}
          className="mt-8"
        >
          <div className="mb-5 hidden justify-end gap-3 sm:flex">
            <CarouselPrevious className="static size-12 translate-y-0 rounded-full border-border bg-card text-foreground shadow-none" />
            <CarouselNext className="static size-12 translate-y-0 rounded-full border-border bg-card text-foreground shadow-none" />
          </div>

          <CarouselContent className="-ml-4">
            {events.map((event) => {
              const { day, month } = formatDate(event.date);
              const category = getCategoryStyle(event.eventType);

              return (
                <CarouselItem
                  key={event._id}
                  className="basis-full pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <div className="relative h-44 overflow-hidden bg-muted sm:h-48">
                      <Image
                        src={event.thumbnailUrl}
                        alt={event.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <span
                        className={`absolute left-4 top-4 rounded-md px-3 py-2 text-xs font-bold backdrop-blur-sm ${category.className}`}
                      >
                        {category.label}
                      </span>
                      <span className="absolute right-4 top-4 flex min-w-12 flex-col items-center rounded-xl bg-card px-2 py-2 text-foreground">
                        <strong className="text-xl leading-none">{day}</strong>
                        <span className="mt-1 text-[0.65rem] font-bold uppercase">
                          {month}
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-col p-5">
                      <h3 className="text-xl leading-tight font-bold text-foreground">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {event.location}
                      </p>
                      <Link
                        href={`/upcoming-events/${event._id}`}
                        className="mt-5 flex min-h-12 items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                      >
                        View Event
                      </Link>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="mt-5 flex justify-center gap-3 sm:hidden">
            <CarouselPrevious className="static size-10 translate-y-0 rounded-full border-border bg-card text-foreground shadow-none" />
            <CarouselNext className="static size-10 translate-y-0 rounded-full border-border bg-card text-foreground shadow-none" />
          </div>
        </Carousel>

        <Link
          href="/upcoming-events"
          className="mt-10 block text-center text-sm font-bold text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          See all upcoming events →
        </Link>
      </div>
    </section>
  );
};

export default Featured;