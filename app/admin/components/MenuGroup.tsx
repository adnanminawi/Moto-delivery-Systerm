import type { ReactNode } from "react";

type MenuGroupProps = {
  children: ReactNode;
  title: string;
};

export default function MenuGroup({ children, title }: MenuGroupProps) {
  return (
    <div className="mb-6">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {title}
      </p>
      <div className="grid gap-2">{children}</div>
    </div>
  );
}
