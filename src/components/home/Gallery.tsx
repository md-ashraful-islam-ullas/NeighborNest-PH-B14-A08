import Image from "next/image";
import Link from "next/link";

const Gallery = () => {
  // Pastel background + a darker shade of the same color for the text,
  // so the chips stay readable in both light and dark themes.
  const categories = [
    { label: "Donation", className: "bg-[#f9c873] text-[#412402]" },
    { label: "Plantation", className: "bg-[#b8d98d] text-[#173404]" },
    { label: "Cleanup", className: "bg-[#a9cbed] text-[#042c53]" },
    { label: "Education", className: "bg-[#f5bbaa] text-[#4a1b0c]" },
  ];

  const events = [
    {
      title: "Winter clothes",
      location: "Mirpur 10",
      image: "/winter-cloth.png",
      category: "Donation",
    },
    {
      title: "Tree planting",
      location: "Dhanmondi",
      image: "/tree-plantation.png",
      category: "Plantation",
    },
    {
      title: "Lakeside cleanup",
      location: "Gulshan",
      image: "/lake-cleanup.png",
      category: "Cleanup",
    },
    {
      title: "Reading corner",
      location: "Uttara",
      image: "/reading-corner.png",
      category: "Education",
    },
    {
      title: "Blanket drive",
      location: "Mohammadpur",
      image: "/donation-drive.png",
      category: "Donation",
    },
    {
      title: "Canal cleanup",
      location: "Mirpur 1",
      image: "/canal-cleanup.png",
      category: "Cleanup",
    },
    {
      title: "School garden",
      location: "Uttara",
      image: "/school-garden.png",
      category: "Plantation",
    },
    {
      title: "Food pantry",
      location: "Mirpur 1",
      image: "/food-distribution.png",
      category: "Donation",
    },
  ];

  return (
    <section className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-300">
        <p className="text-xs font-bold tracking-[0.3em] text-primary sm:text-sm">
          GALLERY
        </p>
        <h2 className="mt-5 max-w-150 text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
          Moments from our streets.
        </h2>
        <p className="mt-5 text-base text-muted-foreground sm:text-lg">
          Real people, real neighborhoods, one good turn at a time.
        </p>

        <div
          className="mt-7 flex flex-wrap gap-3"
          aria-label="Event categories"
        >
          {categories.map((category) => (
            <span
              key={category.label}
              className={`${category.className} rounded-md px-3.5 py-2 text-xs font-bold`}
            >
              {category.label}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <Link
              key={event.title}
              href="#"
              aria-label={`${event.title} in ${event.location}`}
              className="group relative isolate flex min-h-52 overflow-hidden rounded-lg bg-muted text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              <Image
                src={event.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="z-0 object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-0 bg-linear-to-t from-[#211b18]/85 via-[#211b18]/10 to-transparent" />
              <div className="relative z-10 flex w-full flex-col justify-between p-4">
                <div className="mt-auto">
                  <h3 className="text-xl leading-tight font-bold">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-white/90">
                    {event.location}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;