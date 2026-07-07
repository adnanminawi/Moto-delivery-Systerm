import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Moto Taxi System</h1>

      <Link href="/about">About</Link>
      <br />
      <Link href="/contact">Contact</Link>
    </div>
  );
}