import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const steps = [
    {
      label: "STEP 1",
      title: "Create an event.",
      action: "Start organizing",
      color: "bg-[#fb8732]",
      links: "/create-event",
    },
    {
      label: "STEP 2",
      title: "Join one near you.",
      action: "See what’s coming",
      color: "bg-[#ffa844]",
      links: "/upcoming-events",
    },
    {
      label: "STEP 3",
      title: "Track what you joined.",
      action: "Open my events",
      color: "bg-[#ffb744]",
      links: "/joined-events",
    },
  ];

  return (
    <main className="overflow-hidden bg-background">
      <section className="relative isolate min-h-135 text-white">
        <Image
          src="/banner.jpg"
          alt=""
          fill
          priority
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#2b211d]/70 to-[#482719]/65" />
        <div className="relative z-10 mx-auto flex min-h-135 max-w-300 flex-col items-center justify-center px-5 pb-36 pt-20 text-center sm:px-8 lg:px-10">
          <p className="mb-6 text-xs font-bold tracking-[0.3em] text-[#ffb744] sm:text-sm">
            SMALL ACTS. SHARED STREETS.
          </p>
          <h1 className="max-w-180 text-5xl leading-[0.98] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Good starts next door.
          </h1>
          <p className="mt-6 max-w-170 text-base leading-7 text-white/90 sm:text-lg">
            Find a neighborhood event, show up, and see what a few hours can
            change.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/upcoming-events"
              className="rounded-md bg-[#ffb744] px-6 py-3 text-sm font-bold text-[#211b18] transition-colors hover:bg-[#ffc765]"
            >
              Browse events
            </Link>
            <Link
              href="/create-event"
              className="rounded-md border border-white/80 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Create an event
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-19 grid max-w-300 grid-cols-1 px-5 pb-14 shadow-[0_20px_35px_-24px_rgba(33,27,24,0.65)] sm:px-8 md:grid-cols-3 lg:px-10">
        {steps.map((step) => (
          <Link
            key={step.label}
            href={step.links}
            className={`${step.color} flex min-h-55 flex-col justify-between p-7 text-[#211b18] transition-[filter] hover:brightness-105 sm:p-8`}
          >
            <span className="text-xs font-bold tracking-[0.25em]">
              {step.label}
            </span>
            <div className="mt-12">
              <h2 className="text-2xl leading-tight font-bold sm:text-3xl">
                {step.title}
              </h2>
              <p className="mt-3 text-base font-bold">{step.action} →</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Banner;