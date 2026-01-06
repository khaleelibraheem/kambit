import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

// Components & Providers
import { ThemeProvider } from "@/components/theme-provider";
import { BankingProvider } from "@/contexts/BankingContext";
import { RootWrapper } from "@/components/layout/root-wrapper";
import Navbar from "@/components/layout/navbar";
import Providers from "./providers";

// Styles
import "./globals.css";

// Configure Body Font
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

// Configure Heading Font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: 'swap',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#4F46E5",
};

export const metadata = {
  metadataBase: new URL("https://abujabureaudechange.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | Kambit",
    default: "Kambit - Buy, Sell & Trade Crypto for Naira Instantly",
  },
  description:
    "Kambit is Nigeria's premier fintech for trading BTC, USDT, ETH, and SOL. Buy and sell crypto instantly with the best market rates and secure Naira settlements.",
  keywords: [
    "Kambit",
    "Buy Bitcoin Nigeria",
    "Sell USDT for Naira",
    "Trade Solana Nigeria",
    "Ethereum to Naira",
    "Crypto trading app Nigeria",
    "Buy USDT with Naira",
  ],
  applicationName: "Kambit",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Kambit",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abujabureaudechange.vercel.app",
    title: "Kambit - Instant Crypto Trading",
    description: "Securely buy and sell BTC, USDT, and other assets with Naira.",
    siteName: "Kambit",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kambit Crypto Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kambit | Crypto Trading Nigeria",
    description: "The fastest way to buy and sell crypto for Naira.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html 
        lang="en" 
        suppressHydrationWarning 
        className={`${inter.variable} ${jakarta.variable}`}
      >
        <body className="font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <BankingProvider>
                <RootWrapper>
                  <Navbar />
                  <main className="min-h-screen">{children}</main>
                  <Toaster position="top-center" richColors closeButton />
                </RootWrapper>
              </BankingProvider>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}