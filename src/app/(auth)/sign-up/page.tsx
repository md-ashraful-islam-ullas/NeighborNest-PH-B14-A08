"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const inputClassName =
  "mt-2 h-12 w-full rounded-md border border-[#ead6c3] bg-background px-3 text-base text-foreground outline-none transition placeholder:text-[#81746c] focus:border-[#a63f1c] focus:ring-2 focus:ring-ring/20";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      photoUrl: string;
      email: string;
      password: string;
    };

    // Password validation
    const passwordErrors = [];

    if (user.password.length < 6) {
      passwordErrors.push("at least 6 characters");
    }

    if (!/[A-Z]/.test(user.password)) {
      passwordErrors.push("one uppercase letter");
    }

    if (!/[a-z]/.test(user.password)) {
      passwordErrors.push("one lowercase letter");
    }

    if (passwordErrors.length > 0) {
      toast.error(`Password must contain ${passwordErrors.join(", ")}.`);
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.photoUrl || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      if (data) {
        toast.success("Account created successfully!");

        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
      });

      if (error) {
        toast.error(error.message || "Google sign-in failed.");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="bg-background px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto grid w-full max-w-300 gap-6 lg:grid-cols-[0.94fr_1.35fr] lg:gap-9">
        <section className="relative isolate overflow-hidden rounded-2xl bg-[#a63f1c] px-9 py-10 text-white sm:px-10 sm:py-12 lg:min-h-154 lg:px-9 lg:py-10">
          <div className="pointer-events-none absolute -top-20 -right-20 -z-10 size-64 rounded-full border-9 border-[#d77c53]/70 sm:-right-16" />
          <div className="pointer-events-none absolute -top-14 -right-28 -z-10 size-64 rounded-full border-9 border-[#d77c53]/70" />

          <Image
            src="/neighbor-nest-icon-white.png"
            alt="Neighbor Nest"
            width={60}
            height={60}
          />

          <h1 className="mt-9 max-w-md text-4xl leading-[1.05] font-bold sm:text-5xl">
            Join your neighbors.
          </h1>

          <p className="mt-3 max-w-md text-base leading-7 text-primary-foreground/95 sm:text-lg">
            Create an account to organize and join events near you.
          </p>

          <ul className="mt-8 space-y-4 text-base leading-6 sm:mt-9 sm:text-lg">
            <li>✓&nbsp; Create an event in minutes</li>
            <li>✓&nbsp; Join with a single click</li>
            <li>✓&nbsp; Keep track of everything you joined</li>
          </ul>
        </section>

        <section className="rounded-md border border-border bg-card px-6 py-8 sm:px-9 sm:py-10 lg:px-9 lg:py-9">
          <p className="text-xs font-bold tracking-[0.3em] text-primary sm:text-sm">
            REGISTER
          </p>

          <h2 className="mt-4 text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
            Create your account
          </h2>

          <p className="mt-1 text-base text-muted-foreground sm:text-lg">
            It only takes a minute.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-foreground"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="photo-url"
                  className="text-sm font-bold text-foreground"
                >
                  Photo URL
                </label>

                <input
                  id="photo-url"
                  name="photoUrl"
                  type="url"
                  placeholder="https://"
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="email"
                className="text-sm font-bold text-foreground"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className={inputClassName}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="text-sm font-bold text-foreground"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={inputClassName}
              />

              <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">
                Use an uppercase letter, a lowercase letter, and at least 6
                characters.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex h-13 w-full items-center justify-center rounded-md bg-[#b1421c] px-4 text-base font-bold text-white transition-colors hover:bg-[#913716] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-[#b1421c]/40 focus-visible:outline-none"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="my-5 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-px flex-1 bg-[#e6d3c0]" />
              <span>or</span>
              <span className="h-px flex-1 bg-[#e6d3c0]" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex h-13 w-full items-center justify-center gap-2 rounded-md border border-[#b1421c] px-4 text-base font-bold text-primary transition-colors hover:bg-[#fff1e5] focus-visible:ring-4 focus-visible:ring-[#b1421c]/20 focus-visible:outline-none"
            >
              <span className="text-xl leading-none" aria-hidden="true">
                G
              </span>
              Continue with Google
            </button>

            <p className="mt-4 text-center text-base text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-[#a63f1c] hover:text-[#8f3215] focus-visible:outline-none focus-visible:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
