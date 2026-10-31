import type { Metadata } from "next";
import { Dosis, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dosis = Dosis({
  subsets: ["latin"],
  variable: "--font-dosis",
});

export const metadata: Metadata = {
  title: "Neighbor Nest",
  description: "Your neighborhood community",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(dosis.className, "font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}