import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://thamaraiselvan-dev.web.app'), 
  title: {
    default: "Thamarai Selvan | Fullstack Developer",
    template: "%s | Thamarai Selvan"
  },
  description: "Professional portfolio of Thamarai Selvan, a Fullstack Web & Mobile App Developer specializing in React, Next.js, and modern web technologies.",
  keywords: ["Thamarai Selvan", "Fullstack Developer", "Web Developer", "React Developer", "Next.js Developer", "Portfolio", "Frontend", "Backend"],
  authors: [{ name: "Thamarai Selvan G" }],
  creator: "Thamarai Selvan G",
  publisher: "Thamarai Selvan G",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Thamarai Selvan | Fullstack Developer",
    description: "Explore the portfolio of Thamarai Selvan, featuring innovative web and mobile applications.",
    url: 'https://thamaraiselvan-dev.web.app', 
    siteName: 'Thamarai Selvan Portfolio',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Thamarai Selvan Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Thamarai Selvan | Fullstack Developer",
    description: "Professional portfolio of Thamarai Selvan, a Fullstack Web & Mobile App Developer.",
    images: ['/og-image.png'], 
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Thamarai Selvan',
  url: 'https://thamaraiselvan-dev.web.app', 
  jobTitle: 'Fullstack Developer - Web & Mobile App Developer',
  sameAs: [
    'https://github.com/Thamarai-selvan-G',
    'www.linkedin.com/in/thamaraiselvan08',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StyledComponentsRegistry>
          <GlobalStyles />
          <ParticleBackground />
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
            {children}
          </main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
