import "@/app/globals.css";
import Head from "./components/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body>{children}</body>
    </html>
  );
}
