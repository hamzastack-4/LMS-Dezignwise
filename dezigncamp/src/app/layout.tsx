import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DezignCamp LMS — AI-Powered Learning Platform",
  description: "A modern, AI-driven Learning Management System for students, instructors, and institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
