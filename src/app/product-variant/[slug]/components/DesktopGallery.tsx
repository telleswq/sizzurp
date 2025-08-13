// app/product/[slug]/components/DesktopGallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function DesktopGallery({ variants, initialVariant }) {
  const [selected, setSelected] = useState(initialVariant);

  return (
     <div className="flex gap-6">
      {/* Miniaturas */}
      <div className="flex flex-col gap-3 mt-10">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => setSelected(variant)}
            className={`rounded-lg border-2 transition-all duration-200 ${
              selected.id === variant.id ? "border-black shadow-md" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Image
              src={variant.imageUrl || "/placeholder.svg"}
              alt={variant.name}
              width={90}
              height={90}
              className="rounded-md object-cover"
            />
          </button>
        ))}
      </div>

      {/* Imagem principal */}
      <div className="flex items-center justify-center rounded-lg p-8">
        <Image
          src={selected.imageUrl || "/placeholder.svg"}
          alt={selected.name}
          width={500}
          height={600}
          className="max-h-[600px] w-auto object-contain"
          priority
        />
      </div>
    </div>

    
  );
}
