import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-t-3 border-[#211b18] bg-white">
      <div className="mx-auto flex min-h-18 w-full max-w-300 items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link
          href="#"
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
          <Link
            href="/sign-in"
            className="rounded-md bg-[#a63f1c] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#8f3215] sm:px-6"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
