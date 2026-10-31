"use client";

import { FormEvent, useState } from "react";

const eventTypes = [
  { label: "Cleanup", className: "bg-[#b8d7f6]" },
  { label: "Plantation", className: "bg-[#b9db8d]" },
  { label: "Donation", className: "bg-[#ffc96f]" },
  { label: "Education", className: "bg-[#f0c0af]" },
];

type FormValues = {
  title: string;
  eventType: string;
  date: string;
  location: string;
  description: string;
  thumbnailUrl: string;
};

const initialValues: FormValues = {
  title: "",
  eventType: "Education",
  date: "",
  location: "",
  description: "",
  thumbnailUrl: "",
};

const inputClassName =
  "mt-2 w-full rounded-md border border-[#ead6c3] bg-[#fff8ee] px-3 py-3 text-base text-[#211b18] outline-none transition placeholder:text-[#7b7775] focus:border-[#a63f1c] focus:ring-2 focus:ring-[#a63f1c]/20";

const CreateEventPage = () => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setError("");
    setSubmitted(false);
  };

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

    const res = await fetch(`http://localhost:5000/create-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error("Failed to create event");
    }

    const data = await res.json();

    console.log("Event submitted:", data);
  };

  return (
    <main className="bg-[#fff8ee] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto grid w-full max-w-300 gap-8 lg:grid-cols-[0.92fr_1.35fr] lg:items-start lg:gap-9">
        <section className="relative overflow-hidden rounded-2xl bg-[#ad421c] px-8 py-10 text-white sm:px-9 sm:py-11">
          <div
            aria-hidden="true"
            className="absolute -right-18 -top-20 size-64 rounded-full border-36 border-[#c56a43]/80"
          />
          <div className="relative">
            <p className="text-sm font-bold tracking-[0.28em]">NEW EVENT</p>
            <h1 className="mt-5 max-w-sm font-dosis text-5xl font-bold leading-[0.98] sm:text-6xl">
              Start something good.
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed">
              Share what you are planning and your neighbors can join in.
            </p>
            <ul className="mt-7 space-y-4 text-base leading-relaxed sm:text-lg">
              <li>✓ Pick a clear place and date.</li>
              <li>✓ Say what volunteers should bring.</li>
              <li>✓ Keep it short and friendly.</li>
            </ul>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-[#ead6c3] bg-white px-6 py-8 shadow-sm sm:px-9 sm:py-9"
        >
          <fieldset>
            <legend className="text-sm font-bold tracking-[0.28em] text-[#ad421c]">
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
                      className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#ad421c] focus-visible:ring-offset-2 ${
                        isSelected ? "border-[#211b18]" : "border-transparent"
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
            <legend className="text-sm font-bold tracking-[0.28em] text-[#ad421c]">
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
            <legend className="text-sm font-bold tracking-[0.28em] text-[#ad421c]">
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
            <p role="alert" className="mt-4 text-sm font-bold text-[#ad421c]">
              {error}
            </p>
          ) : null}
          {submitted ? (
            <p
              role="status"
              className="mt-4 rounded-md bg-[#eef7e7] px-4 py-3 text-sm font-bold text-[#315d2b]"
            >
              Your event is ready to share with the neighborhood.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-[#ad421c] px-5 py-4 text-base font-bold text-white transition-colors hover:bg-[#8f3215] focus-visible:ring-2 focus-visible:ring-[#ad421c] focus-visible:ring-offset-2"
          >
            Publish event →
          </button>
          <p className="mt-4 text-center text-sm text-[#695c54]">
            Your event appears on the Upcoming Events page right away.
          </p>
        </form>
      </div>
    </main>
  );
};

export default CreateEventPage;
