import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "PulseChat",
    template: "%s | PulseChat",
  },
  description: "The best way to chat with your friends",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <div
          className="bg-contain bg-center min-h-screen"
          style={{ backgroundImage: "url('/assets/bgImage.svg')" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
