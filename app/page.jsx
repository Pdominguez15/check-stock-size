import AnalyticsWrapper from "@/app/components/analytics";
import CustomStepper from "@/app/components/stepper/stepper";

import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <AnalyticsWrapper />
      <div>
        <h1>Comprobar stock</h1>
      </div>
      <div className={styles.container}>
        <CustomStepper />
      </div>
    </main>
  );
}
