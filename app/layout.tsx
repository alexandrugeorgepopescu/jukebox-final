import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for a clean modern look
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Rewind Jukebox",
    description: "Same taste, different vibe. Your daily music drop.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ro">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
