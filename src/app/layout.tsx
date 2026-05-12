import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmergencyBar from "@/components/ui/EmergencyBar";

export const metadata: Metadata = {
  title: "HealPath — You Are Not Alone",
  description:
    "A safe, anonymous space for survivors of domestic violence and sexual assault to find support, share stories, and access free resources in NJ and NYC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0F0A1E] text-[#F0EBF8] flex flex-col antialiased">
        {/* Crisis bar fixed at top — always visible, never dismissable */}
        <EmergencyBar />
        {/* Push content below the fixed crisis bar (h-8 ≈ 32px) */}
        <div className="h-8 shrink-0" />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
