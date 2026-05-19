import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mantre de Curățare pentru Relații | Mihaela Petrula",
  description:
    "Ritual personalizat de curățare pentru relații de cuplu și relații părinte-copil. Generează mantrele tale în câteva minute.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
