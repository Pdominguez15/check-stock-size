import Image from "next/image";

import CustomStepper from "@/app/components/stepper/stepper";

import inStock from "@/public/in-stock.png";

import styles from "@/app/components/content/content.module.css";

export default function Content() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image src={inStock} alt="stock" />
          </div>
          <h1>Kass APP</h1>
        </div>

        <main className={styles.main}>
          <div className={styles.text}>
            <h2>
              Sé el primero en saber cuando tu producto esté disponible.
              Registra tu producto hoy mismo en el siguiente formulario.
            </h2>
            <p>
              Tiendas actuales: Zara, Stradivarius, Bershka, Stradivarius y Pull
              and Bear.
            </p>
          </div>

          <div className={styles.form}>
            <CustomStepper />
          </div>
        </main>
      </div>
    </div>
  );
}
