import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "AccessiTools - Alt Text Generator & Read Aloud for Creators",
    template: "%s | AccessiTools",
  },
  description:
    "Generate export-ready alt text for images in bulk and read PDFs, screenshots, and documents aloud. Built for creators, ecommerce teams, and content marketers.",
  keywords: [
    "alt text generator",
    "bulk alt text",
    "read pdf aloud",
    "text to speech",
    "accessibility tools",
    "ecommerce alt text",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://accessitools.app",
    siteName: "AccessiTools",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
