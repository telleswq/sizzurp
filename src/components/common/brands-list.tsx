import Image from "next/image";

const brands = [
  // POSIÇÃO 1 - Primeira marca (esquerda no mobile, top-left no desktop)
  { name: "Nike", logo: "/nike.png" },
  // POSIÇÃO 2 - Segunda marca
  { name: "Adidas", logo: "/adidas.png" },
  // POSIÇÃO 3 - Terceira marca (centro no mobile)
  {
    name: "Ralph Lauren",
    logo: "/ralph.png",
  },
  // POSIÇÃO 4 - Quarta marca
  {
    name: "New Balance",
    logo: "/newbalance.png",
  },
  // POSIÇÃO 5 - Quinta marca
  { name: "Puma", logo: "/puma.png" },
  // POSIÇÃO 6 - Sexta marca
  {
    name: "Converse",
    logo: "/converse.png",
  },
  // POSIÇÃO 7 - Sétima marca (direita no mobile, última no desktop)
  { name: "Zara", logo: "/zara.png" },
];

export default function BrandList() {
  return (
    <div className="space-y-6">
      {/* TÍTULO - Responsivo para mobile e desktop */}
      <h3 className="px-5 md:px-8 lg:px-12 font-semibold  md:text-2xl text-left">Marcas parceiras</h3>

      {/* LAYOUT MOBILE - Scroll horizontal */}
      <div className="block md:hidden">
        <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {brands.map((brand, index) => (
            <div key={brand.name} className="flex flex-col items-center">
              {/* Círculo da marca - Mobile */}
              <div className="flex min-h-[72px] min-w-[72px] items-center justify-center rounded-full border border-gray-200 bg-white transition-shadow hover:shadow-md">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-center text-sm font-medium">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* LAYOUT DESKTOP - Grid responsivo */}
      <div className="hidden px-8 md:block lg:px-12">
        <div className="grid grid-cols-3 justify-items-center gap-6 md:grid-cols-4 lg:grid-cols-7 lg:gap-8">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="group flex cursor-pointer flex-col items-center"
            >
              {/* Círculo da marca - Desktop */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg lg:h-24 lg:w-24">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  width={40}
                  height={40}
                  className="object-contain lg:h-12 lg:w-12"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium transition-colors group-hover:text-gray-700 lg:text-base">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
