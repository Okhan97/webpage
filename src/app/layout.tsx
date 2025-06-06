import type { Metadata } from "next";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/Footer";
import { WEBPAGE_URL } from "./constants";
import { Providers } from "./providers";

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
    url: WEBPAGE_URL,
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
      <Providers>
        {children}
        <Footer />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
