"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon, UserIcon, CalendarPlusIcon,
  CalendarCogIcon,
  CalendarCheckIcon, } from "lucide-react";
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
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

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

  return (
    <nav className="border-t-3 border-[#211b18] bg-white">
      <div className="mx-auto flex min-h-18 w-full max-w-300 items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
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

        <div className="flex items-center gap-5 sm:gap-8">
          <Link
            href="/"
            className="hidden text-sm font-bold text-[#b1421c] transition-colors hover:text-[#8f3215] sm:inline sm:text-base"
          >
            Home
          </Link>

          <Link
            href="/upcoming-events"
            className="text-sm font-bold text-[#211b18] transition-colors hover:text-[#b1421c] sm:text-base"
          >
            Upcoming Events
          </Link>

          {isPending ? (
            // Placeholder so the layout doesn't jump / flash "Sign In"
            <div className="size-10 animate-pulse rounded-full bg-gray-200" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#b1421c]"
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

              <DropdownMenuContent align="end" className='bg-white border border-[#e6d3c0] shadow-md'>
                {/* Base UI requires Label to live inside a Group */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem className='cursor-pointer' onClick={() => router.push("/profile")}>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem className='cursor-pointer' onClick={() => router.push("/create-event")}>
                  <CalendarPlusIcon />
                  Create Event
                </DropdownMenuItem>

                <DropdownMenuItem className='cursor-pointer' onClick={() => router.push("/manage-events")}>
                  <CalendarCogIcon />
                  Manage Event
                </DropdownMenuItem>

                 <DropdownMenuItem className='cursor-pointer' onClick={() => router.push("/joined-events")}>
                  <CalendarCheckIcon />
                  Joined Event
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className='cursor-pointer' variant="destructive" onClick={handleSignOut}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-md bg-[#a63f1c] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#8f3215] sm:px-6"
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