import type { Metadata } from "next";

import "./globals.css";
import { inter } from "./lib/utils/fonts";

export const metadata: Metadata = {
  title: "Trello-Style Task Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
