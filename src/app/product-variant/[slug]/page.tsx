import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import DesktopGallery from "./components/DesktopGallery";
import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      {/* ===== MOBILE ===== */}
      <div className="flex min-h-screen flex-col lg:hidden">
        <div className="flex flex-col space-y-6">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            sizes="100vw"
            height={0}
            width={0}
            className="h-auto w-full object-cover"
          />

          <div className="px-5">
            <VariantSelector
              selectedVariantSlug={productVariant.slug}
              variants={productVariant.product.variants}
            />
          </div>

          <div className="px-5">
            <h2 className="text-lg font-semibold">
              {productVariant.product.name}
            </h2>
            <h3 className="text-muted-foreground text-sm">
              {productVariant.name}
            </h3>
            <h3 className="text-lg font-semibold">
              {formatCentsToBRL(productVariant.priceInCents)}
            </h3>
          </div>

          <ProductActions productVariantId={productVariant.id} />

          <div className="px-5">
            <p className="text-shadow-amber-600">
              {productVariant.product.description}
            </p>
          </div>

          <ProductList
            title="Você também pode gostar"
            products={likelyProducts}
          />
        </div>
        <Footer />
      </div>
      {/* ===== DESKTOP ===== */}
      {/* ===== DESKTOP ===== */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Coluna esquerda + Imagem principal */}
        <div className="hidden lg:block">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Galeria de imagens - 8 colunas */}
              <div className="col-span-8">
                <DesktopGallery
                  variants={productVariant.product.variants}
                  initialVariant={productVariant}
                />
              </div>

              {/* Informações do produto - 4 colunas */}
              <div className="col-span-4">
                <div className="space-y-6">
                  {/* Título e preço */}
                  <div className="mt-10">
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {productVariant.product.name}
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                      {productVariant.name}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {formatCentsToBRL(productVariant.priceInCents)}
                    </p>
                  </div>

                  {/* Seletor de variantes */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      Selecionar tamanho
                    </h3>
                    <div className="flex gap-2">
                      {["P", "M", "G", "GG"].map((size) => (
                        <button
                          key={size}
                          className="flex h-10 w-10 items-center justify-center border border-gray-300 text-sm font-medium hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Ações do produto */}
                  <ProductActions productVariantId={productVariant.id} />

                  {/* Descrição */}
                  <div>
                    <p className="text-sm text-gray-600">
                      {productVariant.product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Produtos relacionados */}
            <div className="mt-16">
              <ProductList
                title="Você também pode gostar"
                products={likelyProducts}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductVariantPage;
