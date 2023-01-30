import Form from "./form/form";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Comprobar stock</h1>
      </div>
      <div className={styles.container}>
        <Form />
      </div>
    </main>
  );
}
