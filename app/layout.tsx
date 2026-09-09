import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muslims Soulmate",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Muslims Soulmate", statusBarStyle: "default" },
  description: "A respectful space for Muslims to find meaningful connections.",
  icons: {
    icon: "/soulmate-icon.png",
    apple: "/icon-192.png",
    shortcut: "/soulmate-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
