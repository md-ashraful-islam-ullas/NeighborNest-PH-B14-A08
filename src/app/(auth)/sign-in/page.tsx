'use client';
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const inputClassName =
  "mt-2 h-12 w-full rounded-md border border-[#ead6c3] bg-[#fff8ee] px-3 text-base text-[#211b18] outline-none transition placeholder:text-[#81746c] focus:border-[#a63f1c] focus:ring-2 focus:ring-[#a63f1c]/20";

export default function SignInPage() {

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    const { data, error } = await authClient.signIn.email({
      ...user,
    });

    if (data) {
      redirect("/"); // Redirect to the home page after successful sign-in
      // Handle successful sign-in (e.g., redirect to the home page)
    } else {
      console.error("Sign-in error:", error);
      // Handle sign-in error (e.g., display an error message)
    }
}

  return (
    <main className="bg-[#fff8ee] px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto grid w-full max-w-300 gap-6 lg:grid-cols-[0.94fr_1.35fr] lg:gap-9">
        <section className="relative isolate overflow-hidden rounded-2xl bg-[#ad421b] px-9 py-10 text-white sm:px-10 sm:py-12 lg:min-h-154 lg:px-9 lg:py-10">
          <div className="pointer-events-none absolute -top-20 -right-20 -z-10 size-64 rounded-full border-9 border-[#d77c53]/70 sm:-right-16" />
          <div className="pointer-events-none absolute -top-14 -right-28 -z-10 size-64 rounded-full border-9 border-[#d77c53]/70" />

          <Image
            src="/neighbor-nest-icon-white.png"
            alt="Neighbor Nest"
            width={60}
            height={60}
            className="size-14"
            priority
          />

          <h1 className="mt-9 max-w-md text-4xl leading-[1.05] font-bold sm:text-5xl">
            Good to see you again.
          </h1>
          <p className="mt-3 max-w-md text-base leading-7 text-white/95 sm:text-lg">
            Your events and the people you help are waiting.
          </p>

          <ul className="mt-8 space-y-4 text-base leading-6 sm:mt-9 sm:text-lg">
            <li>✓&nbsp; Create an event in minutes</li>
            <li>✓&nbsp; Join with a single click</li>
            <li>✓&nbsp; Keep track of everything you joined</li>
          </ul>
        </section>

        <section className="rounded-md border border-[#e6d3c0] bg-white px-6 py-8 sm:px-9 sm:py-10 lg:px-9 lg:py-9">
          <p className="text-xs font-bold tracking-[0.3em] text-[#b1421c] sm:text-sm">
            LOGIN
          </p>
          <h2 className="mt-4 text-4xl leading-tight font-bold tracking-tight text-[#211b18] sm:text-5xl">
            Welcome back
          </h2>
          <p className="mt-1 text-base text-[#695c54] sm:text-lg">
            Log in to create, join, and track events.
          </p>

          <form onSubmit={handleSignIn} className="mt-6">
            <div>
              <label htmlFor="email" className="text-sm font-bold text-[#211b18]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="demo@nest.app"
                className={inputClassName}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="text-sm font-bold text-[#211b18]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className={inputClassName}
              />
            </div>

            <button
              type="submit"
              className="mt-6 h-13 w-full rounded-md bg-[#a63f1c] px-4 text-base font-bold text-white transition-colors hover:bg-[#8f3215] focus-visible:ring-4 focus-visible:ring-[#b1421c]/30 focus-visible:outline-none"
            >
              Sign In
            </button>

            <p className="mt-4 text-center text-sm text-[#695c54]">
              Use your NeighborNest account details to continue.
            </p>

            <div className="my-5 flex items-center gap-3 text-sm text-[#695c54]">
              <span className="h-px flex-1 bg-[#e6d3c0]" />
              <span>or</span>
              <span className="h-px flex-1 bg-[#e6d3c0]" />
            </div>

            <button
              type="button"
              className="flex h-13 w-full items-center justify-center gap-2 rounded-md border border-[#b1421c] px-4 text-base font-bold text-[#b1421c] transition-colors hover:bg-[#fff1e5] focus-visible:ring-4 focus-visible:ring-[#b1421c]/20 focus-visible:outline-none"
            >
              <span className="text-xl leading-none" aria-hidden="true">
                G
              </span>
              Continue with Google
            </button>

            <p className="mt-4 text-center text-base text-[#695c54]">
              New here?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-[#a63f1c] hover:text-[#8f3215] focus-visible:outline-none focus-visible:underline"
              >
                Create an account
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
    }