import Image from "next/image";
import { unstable_rethrow } from "next/navigation";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type FeaturedEvent = {
  title: string;
  location: string;
  category: string;
  day: string;
  month: string;
  image: string;
};

type FeaturedEventRecord = Record<string, unknown>;

const fallbackEvents: FeaturedEvent[] = [
  {
    title: "Winter Clothes Distribution",
    location: "Mirpur 10, Dhaka",
    category: "Donation",
    day: "15",
    month: "Nov",
    image: "/winter-cloth.png",
  },
  {
    title: "Blanket Distribution for the Needy",
    location: "Mohammadpur, Dhaka",
    category: "Donation",
    day: "23",
    month: "Nov",
    image: "/donation-drive.png",
  },
  {
    title: "Neighborhood Tree Planting",
    location: "Dhanmondi, Dhaka",
    category: "Plantation",
    day: "28",
    month: "Nov",
    image: "/tree-plantation.png",
  },
  {
    title: "Lakeside Cleanup",
    location: "Gulshan, Dhaka",
    category: "Cleanup",
    day: "03",
    month: "Dec",
    image: "/lake-cleanup.png",
  },
];

const imageFallbacks = [
  "/winter-cloth.png",
  "/donation-drive.png",
  "/tree-plantation.png",
  "/lake-cleanup.png",
  "/reading-corner.png",
  "/canal-cleanup.png",
  "/school-garden.png",
  "/food-distribution.png",
];

const stringValue = (value: unknown) =>
  typeof value === "string" || typeof value === "number"
    ? String(value)
    : "";

const getDateParts = (event: FeaturedEventRecord) => {
  const dateValue = event.date ?? event.eventDate ?? event.startDate;
  const date = dateValue ? new Date(String(dateValue)) : null;

  if (date && !Number.isNaN(date.getTime())) {
    return {
      day: new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date),
      month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date),
    };
  }

  return {
    day: stringValue(event.day ?? event.dateDay) || "--",
    month: stringValue(event.month ?? event.dateMonth) || "---",
  };
};

const normalizeEvents = (value: unknown): FeaturedEvent[] => {
  const records = Array.isArray(value)
    ? value
    : value &&
        typeof value === "object" &&
        Array.isArray((value as { events?: unknown }).events)
      ? (value as { events: unknown[] }).events
      : [];

  return records.flatMap((record, index) => {
    if (!record || typeof record !== "object") return [];

    const event = record as FeaturedEventRecord;
    const title = stringValue(event.title ?? event.name);
    const location = stringValue(event.location ?? event.address);
    const category = stringValue(event.category ?? event.type) || "Community";
    const dateParts = getDateParts(event);
    const imageValue = stringValue(event.image ?? event.imageUrl ?? event.photo);
    const image = imageValue.startsWith("/")
      ? imageValue
      : imageFallbacks[index % imageFallbacks.length];

    if (!title || !location) return [];

    return [
      {
        title,
        location,
        category,
        ...dateParts,
        image,
      },
    ];
  });
};

const Featured = async () => {
  let events = fallbackEvents;

  try {
    const res = await fetch("http://localhost:5000/featured-events", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        `Unable to load featured events: ${res.status} ${res.statusText}`,
      );
    } else {
      const data: unknown = await res.json();
      const normalizedEvents = normalizeEvents(data);

      if (normalizedEvents.length > 0) {
        events = normalizedEvents;
      }
    }
  } catch (error) {
    unstable_rethrow(error);
    console.error("Unable to load featured events.", error);
  }

  return (
    <section className="bg-[#fff7ed] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-300">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-[#b1421c] sm:text-sm">
            FEATURED EVENTS
          </p>
          <h2 className="mt-5 max-w-190 text-4xl leading-[1.05] font-bold tracking-tight text-[#211b18] sm:text-5xl">
            A little help can change an ordinary day.
          </h2>
        </div>

        <Carousel
          opts={{ align: "start", loop: events.length > 3 }}
          className="mt-8"
        >
          <div className="mb-5 hidden justify-end gap-3 sm:flex">
            <CarouselPrevious
              className="static size-12 translate-y-0 rounded-full border-[#e6d9cd] bg-white text-[#211b18] shadow-none"
              aria-label="Previous featured event"
            />
            <CarouselNext
              className="static size-12 translate-y-0 rounded-full border-[#e6d9cd] bg-white text-[#211b18] shadow-none"
              aria-label="Next featured event"
            />
          </div>

          <CarouselContent className="-ml-4">
            {events.map((event) => (
              <CarouselItem
                key={`${event.title}-${event.day}-${event.location}`}
                className="basis-full pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <article className="overflow-hidden rounded-xl border border-[#e6d9cd] bg-white shadow-sm">
                  <div className="relative h-44 overflow-hidden bg-[#d7c6b8] sm:h-48">
                    <Image
                      src={event.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-md bg-white/85 px-3 py-2 text-xs font-bold text-[#211b18] backdrop-blur-sm">
                      {event.category}
                    </span>
                    <span className="absolute right-4 top-4 flex min-w-12 flex-col items-center rounded-xl bg-white px-2 py-2 text-[#211b18]">
                      <strong className="text-xl leading-none">{event.day}</strong>
                      <span className="mt-1 text-[0.65rem] font-bold uppercase">
                        {event.month}
                      </span>
                    </span>
                  </div>

                  <div className="flex min-h-48 flex-col p-5">
                    <h3 className="text-xl leading-tight font-bold text-[#211b18]">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#5b4b42]">
                      {event.location}
                    </p>
                    <Link
                      href="#"
                      className="mt-auto flex min-h-12 items-center justify-center rounded-md bg-[#b1421c] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#913716] focus-visible:ring-2 focus-visible:ring-[#b1421c]/40 focus-visible:outline-none"
                    >
                      View Event
                    </Link>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-5 flex justify-center gap-3 sm:hidden">
            <CarouselPrevious
              className="static size-10 translate-y-0 rounded-full border-[#e6d9cd] bg-white text-[#211b18] shadow-none"
              aria-label="Previous featured event"
            />
            <CarouselNext
              className="static size-10 translate-y-0 rounded-full border-[#e6d9cd] bg-white text-[#211b18] shadow-none"
              aria-label="Next featured event"
            />
          </div>
        </Carousel>

        <Link
          href="/upcoming-events"
          className="mt-10 block text-center text-sm font-bold text-[#b1421c] transition-colors hover:text-[#913716] focus-visible:ring-2 focus-visible:ring-[#b1421c]/40 focus-visible:outline-none"
        >
          See all upcoming events →
        </Link>
      </div>
    </section>
  );
};

export default Featured;
