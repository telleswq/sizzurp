import { desc } from "drizzle-orm";
import Image from "next/image";

import BrandList from "@/components/common/brands-list";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6 md:space-y-12">
        <div className="mx-auto mt-6 max-w-[1900px] px-5 md:px-8 lg:px-12">
          {/* IMAGEM MOBILE - Banner principal */}
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={200}
            width={400}
            className="block h-auto w-full rounded-lg md:hidden"
          />
          {/* IMAGEM DESKTOP - Banner principal */}
          <Image
            src="/banner.svg"
            alt="Leve uma vida com estilo"
            height={800}
            width={1500}
            className="hidden h-[800px] w-full rounded-[24px] object-cover md:block"
          />
        </div>

        <div className="mx-auto max-w-7xl">
          <BrandList />
        </div>

        <div className="mx-auto max-w-7xl">
          <ProductList products={products} title="Mais vendidos" />
        </div>

        <div className="mx-auto block max-w-7xl px-5 md:hidden md:px-8 lg:px-12">
          <CategorySelector categories={categories} />
        </div>

        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          {/* IMAGEM MOBILE - Coleção de verão */}
          <Image
            src="/banner-02.png"
            alt="Coleção de verão"
            height={150}
            width={400}
            className="block h-auto w-full rounded-lg md:hidden"
          />
          {/* GRID DESKTOP - Coleção de verão */}
          <div className="hidden grid-cols-[513px_815px] gap-6 md:grid">
            {/* Coluna Esquerda */}
            <div className="flex h-[638px] flex-col gap-6">
              {/* Produto 1 */}
              <div className="relative h-[307px] overflow-hidden rounded-2xl">
                <Image
                  src="/banner-03.png"
                  alt="Nike Therma FIT Headed"
                  width={513}
                  height={307}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Produto 2 */}
              <div className="relative h-[307px] overflow-hidden rounded-2xl">
                <Image
                  src="/banner-05.png"
                  alt="Nike Therma FIT Headed"
                  width={513}
                  height={307}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="relative h-[638px] w-[815px] overflow-hidden rounded-[15px]">
              <Image
                src="/banner-04.png"
                alt="Nike Therma FIT Headed"
                width={815}
                height={638}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto block max-w-7xl md:hidden">
          <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
