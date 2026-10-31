const Subscription = () => {
  return (
    <section className="bg-[#fff7ed] px-5 py-12 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="relative mx-auto max-w-292 overflow-hidden rounded-2xl bg-[#af431c] px-5 py-10 text-white sm:px-12 sm:py-14 lg:px-13 lg:py-15">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-7 -top-32 size-72 rounded-full border-[38px] border-[#c16b45]/70 sm:-right-3 sm:-top-36 sm:size-80" />
        <div className="pointer-events-none absolute -bottom-36 -left-28 size-52 rounded-full border-[32px] border-[#c16b45]/70 sm:-bottom-44 sm:-left-24 sm:size-64" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-white sm:text-sm">
              STAY IN THE LOOP
            </p>

            <h2 className="mt-5 max-w-125 text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
              Hear about the next event first.
            </h2>

            <p className="mt-5 text-sm text-white/95 sm:text-lg">
              One short email when new events open near you.
            </p>
          </div>

          <div className="w-full">
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full">
              <label htmlFor="subscription-email" className="sr-only">
                Email address
              </label>

              <input
                id="subscription-email"
                type="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-xl px-4 py-3 text-sm text-[#5b4b42] outline-none placeholder:text-[#8f8178] focus-visible:ring-2 focus-visible:ring-[#af431c]/40 sm:rounded-full"
              />

              <button
                type="button"
                className="w-full rounded-xl bg-[#211b18] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3b2e28] focus-visible:ring-2 focus-visible:ring-[#211b18]/50 focus-visible:outline-none sm:w-auto sm:rounded-full"
              >
                Subscribe
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-white/95 sm:pl-5 sm:text-left">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
