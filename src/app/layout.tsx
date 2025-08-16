import type { Metadata } from "next";
import { Inter, Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";
import { Toaster } from "@/components/ui/toaster";
import BlobCursor from "@/components/ui/blob-cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RideSmarter - Book rides in Frankfurt and across Germany",
  description: "A streamlined ride booking service for Frankfurt and intercity travel in Germany",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${montserrat.variable} font-sans antialiased cursor-none`}>
        <BlobCursor color="rgba(59, 130, 246, 0.3)" size={40} blur={15} />
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
