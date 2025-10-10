import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trove",
  description: "Trove",
  icons: {
    icon: [{ url: "/icons/small-logo.svg" }],
    apple: [{ url: "/icons/small-logo.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} scrollbar-hide`}>
        <div className="relative flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
