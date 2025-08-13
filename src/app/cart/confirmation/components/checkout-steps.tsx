"use client";

import Link from "next/link";

type StepKey = "bag" | "identification" | "payment";
interface Props {
  current: StepKey;
}

export default function CheckoutSteps({ current }: Props) {
  const steps = [
    { key: "bag" as const, label: "Sacola", href: "/cart" },
    {
      key: "identification" as const,
      label: "Identificação",
      href: "/cart/identification",
    },
    { key: "payment" as const, label: "Pagamento", href: "/cart/confirmation" },
  ];

  const activeIndex = steps.findIndex((s) => s.key === current);

  return (
    <nav aria-label="Progresso" className="w-full">
      <ol className="grid grid-cols-3 items-center gap-2">
        {steps.map((step, i) => {
          const status =
            i < activeIndex ? "done" : i === activeIndex ? "current" : "todo";

          return (
            <li key={step.key} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    status === "done" && "bg-purple-600 text-white",
                    status === "current" &&
                      "border-2 border-purple-600 text-purple-600",
                    status === "todo" &&
                      "border-muted-foreground/30 text-muted-foreground border-2",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {i + 1}
                </div>

                <Link
                  href={step.href}
                  className={[
                    "ml-3 text-sm font-medium",
                    status === "done" && "text-purple-600",
                    status === "current" && "text-foreground",
                    status === "todo" && "text-muted-foreground",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {step.label}
                </Link>
              </div>

              {i !== steps.length - 1 && (
                <div
                  className={[
                    "mx-2 h-[2px] flex-1",
                    i < activeIndex
                      ? "bg-purple-600"
                      : "bg-muted-foreground/20",
                  ].join(" ")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
