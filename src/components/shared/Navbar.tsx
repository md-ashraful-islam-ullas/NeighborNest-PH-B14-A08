"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOutIcon,
  UserIcon,
  CalendarPlusIcon,
  CalendarCogIcon,
  CalendarCheckIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isDark = resolvedTheme === "dark";

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  const navLinkClass = (href: string) => {
    const isActive = pathname === href;

    return `text-sm font-bold transition-colors sm:text-base ${
      isActive ? "text-primary" : "text-foreground hover:text-primary"
    }`;
  };

  const dropdownItemClass =
    "cursor-pointer px-3 py-2.5 text-[15px] font-semibold text-foreground transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-primary";

  return (
    <nav className="border-foreground bg-card">
      <div className="mx-auto flex min-h-18 w-full max-w-300 items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Neighbor Nest home"
        >
          <Image
            src="/neighbor-nest-icon-only.png"
            alt=""
            width={38}
            height={38}
            className="size-9"
            priority
          />

          <Image
            src="/neighbor-nest-text-light.png"
            alt="Neighbor Nest"
            width={154}
            height={36}
            className="h-auto w-36 sm:w-40"
            priority
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5 sm:gap-8">
          <Link
            href="/"
            className={`hidden sm:inline ${navLinkClass("/")}`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>

          <Link
            href="/upcoming-events"
            className={navLinkClass("/upcoming-events")}
            aria-current={pathname === "/upcoming-events" ? "page" : undefined}
          >
            Upcoming Events
          </Link>

          {/* User Menu */}
          {isPending ? (
            <div className="size-10 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="Open user menu"
                  >
                    <Avatar size="lg">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-56 border border-border bg-popover p-1.5 shadow-lg"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-3 py-2 text-sm font-bold text-foreground">
                    {user.name}
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-border" />

                <DropdownMenuItem
                  className={dropdownItemClass}
                  onClick={() => router.push("/profile")}
                >
                  <UserIcon className="size-4 text-primary" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={dropdownItemClass}
                  onClick={() => router.push("/create-event")}
                >
                  <CalendarPlusIcon className="size-4 text-primary" />
                  Create Event
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={dropdownItemClass}
                  onClick={() => router.push("/manage-event")}
                >
                  <CalendarCogIcon className="size-4 text-primary" />
                  Manage Event
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={dropdownItemClass}
                  onClick={() => router.push("/joined-events")}
                >
                  <CalendarCheckIcon className="size-4 text-primary" />
                  Joined Event
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border" />

                {/* Theme toggle */}
                <DropdownMenuItem
                  className={dropdownItemClass}
                  closeOnClick={false}
                  onClick={() => {
                    console.log("clicked, current:", resolvedTheme);
                    setTheme(isDark ? "light" : "dark");
                  }}
                >
                  {isDark ? (
                    <SunIcon className="size-4 text-primary" />
                  ) : (
                    <MoonIcon className="size-4 text-primary" />
                  )}
                  {isDark ? "Light mode" : "Dark mode"}
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border" />

                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer px-3 py-2.5 text-[15px] font-semibold transition-colors data-highlighted:bg-destructive/10"
                  onClick={handleSignOut}
                >
                  <LogOutIcon className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-6"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
