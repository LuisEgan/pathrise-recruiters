import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-lato",
});

const SourceSerifPro = localFont({
  variable: "--font-serif",
  src: [
    {
      path: "../../public/fonts/serif-pro-extra-light.otf",
      weight: "100",
      style: "extra-light",
    },
    {
      path: "../../public/fonts/serif-pro-light.otf",
      weight: "300",
      style: "light",
    },
    {
      path: "../../public/fonts/serif-pro-regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/serif-pro-semibold.otf",
      weight: "600",
      style: "semi-bold",
    },
    {
      path: "../../public/fonts/serif-pro-bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
});

export const metadata: Metadata = {
  title: "Pathrise - Recruiters guides",
  description: "Pathrise's guides for finding and managing recruiters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html
        lang="en"
        className={`${lato.className} ${inter.variable} ${SourceSerifPro.variable}`}
      >
        <body>
          {children}
          <footer>
            {/* <Footer /> */}
          </footer>
        </body>
      </html>
    </Providers>
  );
}
