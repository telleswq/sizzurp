"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      {/* ===== MOBILE ===== */}
      <div className="px-5 md:hidden">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col space-y-4">
          <AddToCartButton
            productVariantId={productVariantId}
            quantity={quantity}
          />
          <Button className="rounded-full" size="lg">
            <Link href="/cart/identification">Comprar agora</Link>
          </Button>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:block">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">
              Quantidade
            </h3>
            <div className="flex w-[120px] items-center justify-between rounded-md border border-gray-300 bg-white">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDecrement}
                className="h-10 w-10 hover:bg-gray-50"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <p className="text-sm font-medium">{quantity}</p>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleIncrement}
                className="h-10 w-10 hover:bg-gray-50"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex w-full gap-3">
            <AddToCartButton
              productVariantId={productVariantId}
              quantity={quantity}
              className="h-12 flex-1 rounded-md border border-gray-900 bg-white font-medium text-gray-900 hover:bg-gray-50"
            />
            <Link href="/cart/identification" className="flex-1">
              <Button className="w-full rounded-full" size="lg">
                Comprar agora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductActions;
