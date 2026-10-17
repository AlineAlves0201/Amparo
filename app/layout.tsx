import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Amparo | Ajuda digital, com cuidado",
  description: "Assistência digital com autonomia, segurança e acolhimento.",
  manifest: "/manifest.webmanifest",
};
export const viewport: Viewport = { themeColor: "#185b48" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip" href="#main">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
