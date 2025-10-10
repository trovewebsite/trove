import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
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
      <body className={`${poppins.className} scrollbar-hide relative`}>
        <div className="relative flex min-h-screen flex-col">{children}</div>
        <div className="absolute right-0 bottom-[1500px] left-0 z-0 flex items-center justify-center overflow-visible">
          <Image
            src="/icons/line01.svg"
            alt="line"
            width={1000}
            height={1000}
            className="w-screen"
          />
        </div>
        <div className="absolute right-0 bottom-[700px] left-0 z-0 flex items-center justify-center overflow-visible">
          <Image
            src="/icons/line02.svg"
            alt="line"
            width={1000}
            height={1000}
            className="-z-10 w-screen"
          />
        </div>
      </body>
    </html>
  );
}
