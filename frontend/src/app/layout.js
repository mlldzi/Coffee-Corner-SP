import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coffee Corner",
  description: "haha coffee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="вкладка.jpg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}