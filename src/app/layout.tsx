import type { Metadata } from "next";
import "@/app/globals.css";
import { PrivyWeb3Provider } from "@/lib/web3/privy-provider";

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
        <PrivyWeb3Provider>{children}</PrivyWeb3Provider>
      </body>
    </html>
  );
}
