import AnalyticsWrapper from "@/app/components/analytics";
import Content from "@/app/components/content/content";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={roboto.className}>
      <AnalyticsWrapper />
      <Content />
    </main>
  );
}
