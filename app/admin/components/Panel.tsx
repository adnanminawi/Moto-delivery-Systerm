import type { ReactNode } from "react";
import { adminStyles } from "./admin-styles";

type PanelProps = {
  children: ReactNode;
  title: string;
};

export default function Panel({ children, title }: PanelProps) {
  return (
    <section className={`${adminStyles.card} mb-6`}>
      <h2 className={adminStyles.cardTitle}>{title}</h2>
      <div className="p-5">{children}</div>
    </section>
  );
}
