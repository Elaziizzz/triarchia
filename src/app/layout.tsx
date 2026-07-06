import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TRIARCHIA | Premium Cyber Luxury Fashion",
  description: "Discover the future of fashion with TRIARCHIA. Premium cyber luxury clothing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-brand-primary text-text-primary min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
