import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';

import NextAuthProvider from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SESE | Society of Environmental Science & Engineering",
  description: "IIT ISM Dhanbad Department of ESE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <NextAuthProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
