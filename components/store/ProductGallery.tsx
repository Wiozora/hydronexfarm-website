"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="min-w-0">
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/6 shadow-[0_24px_60px_rgba(8,18,12,0.18)] sm:rounded-[2rem]">
        <div className="relative aspect-[1.02/1] min-h-[18rem] sm:min-h-[24rem]">
          <Image
            src={activeImage}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={100}
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5 sm:mt-5 sm:gap-4">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`relative overflow-hidden rounded-[1rem] border transition sm:rounded-[1.4rem] ${
              activeImage === image
                ? "border-[#86f556] shadow-[0_12px_30px_rgba(134,245,86,0.18)]"
                : "border-white/10"
            }`}
          >
            <div className="relative aspect-[1/1]">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 640px) 12rem, 30vw"
                quality={90}
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
