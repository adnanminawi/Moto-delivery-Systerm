import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Moto Taxi</h1>
      <h2><Link href="/customer">Customer</Link></h2>
      <h2><Link href="/driver">Driver</Link></h2>
    </main>
  );
}