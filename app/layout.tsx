import type { Metadata } from "next";
import "./globals.css";
import CustomCursorWrapper from '@/components/CustomCursorWrapper';

export const metadata: Metadata = {
  title: "Aman Kumar Jha — Portfolio",
  description: "AI Engineer & Full-Stack Developer. Building intelligent systems, autonomous agents, and scalable web applications.",
  keywords: ["portfolio", "AI engineer", "full-stack developer", "machine learning", "next.js", "aman kumar jha"],
  openGraph: {
    title: "Aman Kumar Jha — Portfolio",
    description: "AI Engineer & Full-Stack Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-overlay">
        <CustomCursorWrapper />
        {children}
      </body>
    </html>
  );
}
