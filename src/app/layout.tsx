import type { Metadata } from "next";
import { Dosis, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html
      lang="en"
      className={cn(dosis.className, "font-sans", geist.variable)}
    >
      <body>
        <Navbar />
        {children}
        <Toaster
          style={
            {
              "--normal-bg": "#ffffff",
              "--normal-text": "#211b18",
              "--normal-border": "#e6d3c0",
              "--success-bg": "#ffffff",
              "--error-bg": "#ffffff",
            } as React.CSSProperties
          }
        />
        <Footer />
      </body>
    </html>
  );
}
