import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/Footer";
import { OverlayRipple } from "../components/Overlay";
import { ClickRipple } from "./ClickRipple";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Ignacio Peñafiel | Frontend Engineer",
  description: "Showcasing my software skills through this webpage",
  keywords:
    "frontend, react, next.js, UI/UX, portfolio, developer, engineer, ignacio, peñafiel",
  openGraph: {
    title: "Ignacio Peñafiel | Frontend Engineer",
    description: "Showcasing my software skills through this webpage",
    url: "https://ignaciopenafiel.cl",
    images: [
      {
        url: "https://ignaciopenafiel.cl/ignacio-penafiel-og.jpg",
        width: 1200,
        height: 630,
        alt: "Ignacio Peñafiel Frontend Engineer",
      },
    ],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body
      className={`flex flex-col min-w-full min-h-dvh max-h-dvh ${roboto.className}`}
    >
      <OverlayRipple />
      <ClickRipple />
      {children}
      <Footer />
    </body>
  </html>
);

export default RootLayout;
