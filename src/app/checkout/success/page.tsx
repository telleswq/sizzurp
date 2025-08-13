"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutStepsMobile = ({
  current,
}: {
  current: "bag" | "identification" | "payment";
}) => {
  const steps = [
    { key: "bag", label: "Sacola" },
    { key: "identification", label: "Identificação" },
    { key: "payment", label: "Pagamento" },
  ];
  const activeIndex = steps.findIndex((s) => s.key === current);

  return (
    <ol className="mt-2 flex items-center justify-center gap-4">
      {steps.map((step, i) => {
        const status =
          i < activeIndex ? "done" : i === activeIndex ? "current" : "todo";

        return (
          <li key={step.key} className="flex items-center gap-2">
            <div
              className={[
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                status === "done" && "bg-green-600 text-white",
                status === "current" &&
                  "border-2 border-green-600 text-green-600",
                status === "todo" &&
                  "border-muted-foreground/30 text-muted-foreground border-2",
              ].join(" ")}
            >
              {i + 1}
            </div>
            <span
              className={
                status === "done" || status === "current"
                  ? "text-foreground text-xs"
                  : "text-muted-foreground text-xs"
              }
            >
              {step.label}
            </span>
            {i !== steps.length - 1 && (
              <div
                className={`h-[1px] w-6 ${
                  i < activeIndex ? "bg-green-600" : "bg-muted-foreground/20"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};



// ==== Steps DESKTOP ====
const CheckoutStepsDesktop = ({
  current,
}: {
  current: "bag" | "identification" | "payment";
}) => {
  const steps = [
    { key: "bag", label: "Sacola" },
    { key: "identification", label: "Identificação" },
    { key: "payment", label: "Pagamento" },
  ];
  const activeIndex = steps.findIndex((s) => s.key === current);

  return (
    <ol className="mt-10 flex items-center justify-center gap-6">
      {steps.map((step, i) => {
        const status =
          i < activeIndex ? "done" : i === activeIndex ? "current" : "todo";

        return (
          <li key={step.key} className="flex items-center gap-2">
            <div
              className={[
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                status === "done" && "bg-green-600 text-white",
                status === "current" &&
                  "border-2 border-green-600 text-green-600",
                status === "todo" && "border-2 border-green-600 text-green-600",
              ].join(" ")}
            >
              {i + 1}
            </div>
            <span className="text-green-600">{step.label}</span>
            {i !== steps.length - 1 && (
              <div className="h-[2px] w-10 bg-green-600" />
            )}
          </li>
        );
      })}
    </ol>
  );
};



const CheckoutSuccessPage = () => {
  return (
    <>
      <Header />
      {/* ==== STEPS ==== */}
      <div className="px-5 py-4 md:px-10">
        {/* MOBILE */}
        <div className="block md:hidden">
          <CheckoutStepsMobile current="payment" />
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block">
          <CheckoutStepsDesktop current="payment" />
        </div>
      </div>{" "}
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Success"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">Pedido efetuado!</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>

          <DialogFooter className="mt-2 w-full">
            <div className="flex w-full gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 rounded-full"
                asChild
              >
                <Link href="/">Página inicial</Link>
              </Button>
              <Button size="lg" className="flex-1 rounded-full" asChild>
                <Link href="/my-orders">Ver meu pedido</Link>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutSuccessPage;
