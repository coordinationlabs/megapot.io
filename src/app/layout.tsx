import type { Metadata } from "next";
import "@/app/globals.css";
import { Web3Provider } from "@/lib/web3/providers";

export const metadata: Metadata = {
  title: "Megapot.io",
  description: "Decentralized jackpot platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
