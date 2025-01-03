import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import Header from "@/components/Header/Header";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Book Your Luxury Stay at Velvet-Haven - India’s Premier Hotel",
  description: "Indulge in a luxury hotel experience at Velvet-Haven. Book now for world-class accommodations, exceptional dining, and exclusive services in the heart of India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} dark:bg-black dark:text-white bg-white text-black`}
      >
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <TooltipProvider>
            <Header />
            {children}
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
