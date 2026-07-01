import DriverClient from "./DriverClient";
import styles from "./page.module.css";

export default function DriverPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        Moto Delivery System
      </header>

      <DriverClient />
    </div>
  );
}