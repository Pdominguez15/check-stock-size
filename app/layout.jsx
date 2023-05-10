import "@/app/globals.css";
import Head from "@/app/components/head";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head />
      <body>{children}</body>
    </html>
  );
}
