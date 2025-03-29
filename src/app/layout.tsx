import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import Header from "@/components/Header/Header";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Footer from "@/components/Footer/Footer";
import { StoreProvider } from "./store/storeProvider";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

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
  description:
    "Indulge in a luxury hotel experience at Velvet-Haven. Book now for world-class accommodations, exceptional dining, and exclusive services in the heart of India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en ||hi">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} dark:bg-black dark:text-white bg-white text-black`}
      >
        <StoreProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <TooltipProvider>
              <Header />
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              {children}
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
