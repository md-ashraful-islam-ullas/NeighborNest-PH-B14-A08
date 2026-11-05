"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const inputClassName =
  "mt-2 h-12 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      if (data) {
        toast.success("Signed in successfully!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign-in error:", error);
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

        <section className="rounded-md border border-border bg-card px-6 py-8 sm:px-9 sm:py-10 lg:px-9 lg:py-9">
          <p className="text-xs font-bold tracking-[0.3em] text-primary sm:text-sm">
            LOGIN
          </p>
          <h2 className="mt-4 text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
            Welcome back
          </h2>
          <p className="mt-1 text-base text-muted-foreground sm:text-lg">
            Log in to create, join, and track events.
          </p>

          <form onSubmit={handleSignIn} className="mt-6">
            <div>
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
                placeholder="demo@nest.app"
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
                autoComplete="current-password"
                placeholder="••••••••"
                className={inputClassName}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex h-13 w-full items-center justify-center rounded-md bg-primary px-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Use your NeighborNest account details to continue.
            </p>

            <div className="my-5 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              <span>or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex h-13 w-full items-center justify-center gap-2 rounded-md border border-primary px-4 text-base font-bold text-primary transition-colors hover:bg-accent focus-visible:ring-4 focus-visible:ring-ring/20 focus-visible:outline-none"
            >
              <span className="text-xl leading-none" aria-hidden="true">
                G
              </span>
              Continue with Google
            </button>

            <p className="mt-4 text-center text-base text-muted-foreground">
              New here?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-primary hover:text-primary/80 focus-visible:outline-none focus-visible:underline"
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