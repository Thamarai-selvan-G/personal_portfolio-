import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thamarai Selvan | Fullstack Developer",
  description: "Professional portfolio of Thamarai Selvan, a Fullstack Web & Mobile App Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
