import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";

// ==== Steps MOBILE ====
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
    <ol className="mt-4 flex items-center justify-center gap-4">
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

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  return (
    <div className="flex min-h-screen flex-col">
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
      </div>

      {/* ==== MOBILE CONTENT ==== */}
      <div className="flex-1 space-y-4 px-5 md:hidden">
        <Card>
          <CardHeader>
            <CardTitle>Identificação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card>
              <CardContent>
                <p className="text-sm">{formatAddress(cart.shippingAddress)}</p>
              </CardContent>
            </Card>
            <FinishOrderButton />
          </CardContent>
        </Card>

        <CartSummary
          subtotalInCents={cartTotalInCents}
          totalInCents={cartTotalInCents}
          products={cart.items.map((item) => ({
            id: item.productVariant.id,
            name: item.productVariant.product.name,
            variantName: item.productVariant.name,
            quantity: item.quantity,
            priceInCents: item.productVariant.priceInCents,
            imageUrl: item.productVariant.imageUrl,
          }))}
        />
      </div>

      {/* ==== DESKTOP CONTENT ==== */}
      <div className="hidden flex-1 px-10 py-8 md:block">
        <div className="mx-auto grid max-w-6xl grid-cols-12 gap-8">
          {/* Coluna esquerda - Identificação */}
          <div className="col-span-7 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Identificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card>
                  <CardContent>
                    <p className="text-sm">
                      {formatAddress(cart.shippingAddress)}
                    </p>
                  </CardContent>
                </Card>
                <FinishOrderButton />
              </CardContent>
            </Card>
          </div>

          {/* Coluna direita - Resumo */}
          <div className="col-span-5">
            <CartSummary
              subtotalInCents={cartTotalInCents}
              totalInCents={cartTotalInCents}
              products={cart.items.map((item) => ({
                id: item.productVariant.id,
                name: item.productVariant.product.name,
                variantName: item.productVariant.name,
                quantity: item.quantity,
                priceInCents: item.productVariant.priceInCents,
                imageUrl: item.productVariant.imageUrl,
              }))}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConfirmationPage;
