import Image from "next/image";

const brands = [
  { name: "Nike", logo: "/nike.png" },
  { name: "Adidas", logo: "/adidas.png" },
  { name: "Ralph Lauren", logo: "/ralph.png" },
  { name: "New Balance", logo: "/newbalance.png" },
  { name: "Puma", logo: "/puma.png" },
  { name: "Converse", logo: "/Converse.png" },
  { name: "Zara", logo: "/zara.png" },
];

export default function BrandList() {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">Marcas parceiras</h3>

      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <div key={brand.name} className="flex flex-col items-center">
            <div className="flex min-h-[72px] min-w-[72px] items-center justify-center rounded-full border border-gray-200 bg-white">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <p className="mt-2 text-center text-sm font-medium">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
