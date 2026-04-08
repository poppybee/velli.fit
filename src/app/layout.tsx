import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VELLI | Empowering Every Woman",
  description: "High-performance women's sportswear at velli.fit.",
  metadataBase: new URL('https://velli.fit'),
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
