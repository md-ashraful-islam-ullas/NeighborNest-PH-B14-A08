import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ExternalLink } from "lucide-react";

const socialLinks = [
  {
    label: "Facebook",
    icon: "f",
    className:
      "hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white",
  },
  {
    label: "Instagram",
    icon: "◎",
    className:
      "hover:border-[#e4405f] hover:bg-[#e4405f] hover:text-white",
  },
  {
    label: "X",
    icon: "𝕏",
    className:
      "hover:border-foreground hover:bg-foreground hover:text-background",
  },
  {
    label: "YouTube",
    icon: "▶",
    className:
      "hover:border-[#ff0000] hover:bg-[#ff0000] hover:text-white",
  },
];

const exploreLinks = [
  "Home",
  "Upcoming Events",
  "Create Event",
  "Manage Events",
  "Joined Events",
];

const Footer = () => {
  return (
    <footer className="border-t-4 border-primary bg-background  text-foreground">
      <div className="mx-auto w-full max-w-300 px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_1.2fr] lg:gap-16">
          <div>
            <Link
              href="#"
              className="inline-flex items-center gap-2"
              aria-label="Neighbor Nest home"
            >
              <Image
                src="/neighbor-nest-icon-only.png"
                alt=""
                width={40}
                height={40}
                className="size-10"
              />
              {/* Light theme: dark text */}
              <Image
                src="/neighbor-nest-text-light.png"
                alt="Neighbor Nest"
                width={170}
                height={40}
                className="h-auto w-40 dark:hidden"
              />
              {/* Dark theme: cream text */}
              <Image
                src="/neighbor-nest-text-dark.png"
                alt="Neighbor Nest"
                width={170}
                height={40}
                className="hidden h-auto w-40 dark:block"
              />
            </Link>

            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
              Find, join, and organize community service events in your
              neighborhood. Good starts next door.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((socialLink) => (
                <Link
                  key={socialLink.label}
                  href="#"
                  aria-label={socialLink.label}
                  className={`flex size-12 items-center justify-center rounded-full border border-border text-lg font-bold text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${socialLink.className}`}
                >
                  <span aria-hidden="true">{socialLink.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold">Explore</h2>
            <nav aria-label="Footer navigation" className="mt-4">
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-base text-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h2 className="text-xl font-bold">Say hello</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Questions, ideas, or an event to suggest? We would love to hear
              from you.
            </p>
            <Link
              href="#"
              className="mt-5 inline-flex items-center gap-1 font-bold transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
            >
              hello@neighbornest.example
              <ExternalLink aria-hidden="true" className="size-4" />
            </Link>
            <p className="mt-5 text-base text-muted-foreground">
              Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-5 text-sm text-muted-foreground sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Neighbor Nest. All rights reserved.</p>
          <Link
            href="#"
            className="inline-flex items-center gap-1 font-bold text-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;