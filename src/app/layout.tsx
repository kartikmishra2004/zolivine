import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zolivine - Nature's Golden Essence",
  description: "Discover Zolivine - a luxury perfume brand blending golden elegance with nature's finest botanicals. Artisan-crafted, eco-friendly, and unforgettable.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="bg-transparent text-white overflow-y-scroll">
        {children}
      </body>
    </html>
  );
}
