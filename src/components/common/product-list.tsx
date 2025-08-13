"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect,useRef, useState } from "react";

import type { productTable, productVariantTable } from "@/lib/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  useEffect(() => {
    updateScrollButtons();
  }, [products]);

  return (
    <>
      {/* ========== VERSÃO MOBILE ========== */}
      <div className="block space-y-6 md:hidden">
        <h3 className="px-5 font-semibold">{title}</h3>
        <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ========== VERSÃO DESKTOP ========== */}
      <div className="hidden space-y-6 md:block">
        <div className="flex items-center justify-between px-5 md:px-8 lg:px-12">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className="rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className="rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex gap-6 overflow-x-auto scroll-smooth px-5 md:px-8 lg:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <div key={product.id} className="w-[329px] flex-shrink-0">
              <Link
                href={`/product-variant/${product.variants[0]?.slug || product.slug}`}
              >
                <div className="group cursor-pointer overflow-hidden rounded-lg bg-white">
                  <div className="aspect-[329/400] overflow-hidden bg-gray-100">
                    <img
                      src={
                        product.variants[0]?.imageUrl ||
                        `/placeholder.svg?height=400&width=329&query=${product.name}`
                      }
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <h4 className="line-clamp-1 text-lg font-semibold">
                      {product.name}
                    </h4>
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold">
                      R$
                      {product.variants[0]?.priceInCents
                        ? (product.variants[0].priceInCents / 100).toFixed(2)
                        : "0,00"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
