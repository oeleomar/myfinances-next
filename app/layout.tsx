import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "./_components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Finances",
  description: "Controle e gerencie suas finanças de forma simples e fácil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} dark antialiased`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <div className="flex h-full flex-col overflow-hidden">{children}</div>
          <SpeedInsights />
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
