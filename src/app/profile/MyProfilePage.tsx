"use client";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";



type ApiEvent = {
  _id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  description: string;
  thumbnailUrl: string;
  creator?: {
    name?: string | null;
    email?: string | null;
  } | null;
};

type Props = {
  manageEvents: ApiEvent[];
  joinedEvents: ApiEvent[];
};

type ProfileUser = {
  name: string;
  email: string;
  image?: string | null;
};

const inputClassName =
  "mt-2 h-12 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-70";

const MyProfilePage = ({ manageEvents, joinedEvents }: Props) => {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <main className="min-h-[calc(100vh-7rem)] bg-background px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto h-120 w-full max-w-300 animate-pulse rounded-2xl bg-muted" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ProfileContent
      key={user.id}
      user={user}
      manageEvents={manageEvents}
      joinedEvents={joinedEvents}
      refetch={refetch}
    />
  );
};

const ProfileContent = ({
  user,
  manageEvents,
  joinedEvents,
  refetch,
}: Props & {
  user: ProfileUser;
  refetch: () => Promise<void>;
}) => {
  const [name, setName] = useState(user.name ?? "");
  const [photoUrl, setPhotoUrl] = useState(user.image ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const initials = (user?.name || "User").charAt(0).toUpperCase();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setFeedback({ type: "error", message: "Please enter your name." });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const { error } = await authClient.updateUser({
      name: trimmedName,
      image: photoUrl.trim() || null,
    });

    if (error) {
      setFeedback({
        type: "error",
        message: error.message || "Unable to save your profile changes.",
      });
    } else {
      await refetch();
      setFeedback({
        type: "success",
        message: "Profile updated successfully.",
      });
    }

    setIsSaving(false);
  };

  return (
    <main className="min-h-[calc(100vh-7rem)] bg-background px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto grid w-full max-w-300 gap-6 lg:grid-cols-[0.94fr_1.35fr] lg:gap-9">
        <section className="relative isolate min-h-120 overflow-hidden rounded-2xl bg-[#a63f1c] px-9 py-10 text-white sm:px-10 sm:py-12 lg:min-h-130 lg:px-9 lg:py-10">
          <div className="pointer-events-none absolute -top-20 -right-20 -z-10 size-64 rounded-full border-9 border-[#d77c53]/70 sm:-right-16" />

          <Avatar size="lg" className="size-23 after:hidden sm:size-24">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="bg-white text-4xl font-bold text-[#ad421b]">
              {initials}
            </AvatarFallback>
          </Avatar>

          <h1 className="mt-5 text-4xl leading-none font-bold">{user.name}</h1>
          <p className="mt-2 text-base text-white/95">{user.email}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:gap-4">
            <div className="rounded-xl bg-[#c26645] px-4 py-4 text-white">
              <p className="text-[40px] leading-tight font-black text-white">
                {manageEvents?.length ?? "N/A"}
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Events created
              </p>
            </div>

            <div className="rounded-xl bg-[#c26645] px-4 py-4 text-white">
              <p className="text-[40px] leading-tight font-black text-white">
                {joinedEvents?.length ?? "N/A"}
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Events joined
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-md border border-border bg-card px-6 py-8 sm:px-9 sm:py-10 lg:px-9 lg:py-9">
          <p className="text-xs font-bold tracking-[0.3em] text-primary sm:text-sm">
            MY PROFILE
          </p>
          <h2 className="mt-4 text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
            Your details
          </h2>
          <p className="mt-1 text-base text-muted-foreground sm:text-lg">
            Update your name and profile picture.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="profile-name"
                className="text-sm font-bold text-foreground"
              >
                Name
              </label>
              <input
                id="profile-name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClassName}
                autoComplete="name"
                disabled={isSaving}
              />
            </div>

            <div>
              <label
                htmlFor="profile-email"
                className="text-sm font-bold text-foreground"
              >
                Email
              </label>
              <input
                id="profile-email"
                value={user.email}
                className={inputClassName}
                disabled
                readOnly
              />
            </div>

            <div>
              <label
                htmlFor="profile-photo"
                className="text-sm font-bold text-foreground"
              >
                Photo URL
              </label>
              <input
                id="profile-photo"
                name="photoUrl"
                type="url"
                value={photoUrl}
                onChange={(event) => setPhotoUrl(event.target.value)}
                className={inputClassName}
                placeholder="https://"
                autoComplete="photo"
                disabled={isSaving}
              />
            </div>

            {feedback && (
              <p
                role="status"
                className={
                  feedback.type === "success"
                    ? "text-sm font-semibold text-green-700 dark:text-green-400"
                    : "text-sm font-semibold text-destructive"
                }
              >
                {feedback.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="flex h-13 w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default MyProfilePage;