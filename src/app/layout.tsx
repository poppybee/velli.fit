import "./globals.css";

export const metadata = {
  title: "VELLI | Empowering Every Woman",
  description: "High-performance women's sportswear at velli.fit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
