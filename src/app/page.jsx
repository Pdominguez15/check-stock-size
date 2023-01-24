import Form from "./form";
import styles from "./page.module.css";

export default function Home() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.select.value);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Check stock</h1>
      </div>
      <div className={styles.form}>
        <Form />
      </div>
    </main>
  );
}
