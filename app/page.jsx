import AnalyticsWrapper from "@/app/components/analytics";
import Content from "@/app/components/content/content";
import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <AnalyticsWrapper />
      <Content />
    </main>
  );
}
