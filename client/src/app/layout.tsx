import { config } from "@fortawesome/fontawesome-svg-core";

import { Inter } from "next/font/google";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reimbursement App",
  description: "Awesome Reimbursement Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
