import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/_components/Extras/Navbar";
import LennisWrapper from "@/utils/LenisWrapper";
import Preloader from "@/app/_components/Extras/Preloader";
import { LoadingProvider } from "./_context/LoadingContext";

export const metadata: Metadata = {
  title: "Zolivine - Nature's Golden Essence",
  description: "Discover Zolivine - a luxury perfume brand blending golden elegance with nature's finest botanicals. Artisan-crafted, eco-friendly, and unforgettable.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <LennisWrapper>
        <body className="text-zinc-50 overflow-y-auto overflow-x-hidden w-full">
          <LoadingProvider>
            <Preloader />
            <Navbar />
            {children}
          </LoadingProvider>
        </body>
      </LennisWrapper>
    </html>
  );
}
