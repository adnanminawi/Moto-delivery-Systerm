import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const roles = [
    {
      label: "Customer",
      desc: "Book a ride and track your driver in real time.",
      href: "/customer",
      icon: "🧑",
    },
    {
      label: "Driver",
      desc: "Go online, receive ride requests, and start earning.",
     href: "/driver/login",
      icon: "🏍️",
    },
    {
      label: "Admin",
      desc: "Monitor drivers, rides, and live activity.",
      href: "/admin",
      icon: "📊",
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>Moto Taxi System</header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.brandAccent}>Moto</span>Taxi
          </h1>
          <p className={styles.tagline}>
            Fast, safe rides connecting you with the nearest driver. Choose how
            you want to continue.
          </p>
        </section>

        <section className={styles.roles}>
          {roles.map((role) => (
            <Link key={role.href} href={role.href} className={styles.card}>
              <div className={styles.icon}>{role.icon}</div>
              <h2 className={styles.cardTitle}>{role.label}</h2>
              <p className={styles.cardDesc}>{role.desc}</p>
              <span className={styles.enter}>Continue →</span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}