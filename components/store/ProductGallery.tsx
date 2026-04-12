"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaExpand, FaSearchPlus, FaTimes } from "react-icons/fa";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const activeImage = images[activeIndex] ?? images[0];

  function showImage(index: number) {
    setActiveIndex(index);
    setIsZoomed(false);
  }

  function shiftImage(step: number) {
    const nextIndex = (activeIndex + step + images.length) % images.length;
    showImage(nextIndex);
  }

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
        setIsZoomed(false);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
        setIsZoomed(false);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
        setIsZoomed(false);
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [images.length, isLightboxOpen]);

  return (
    <>
      <div className="min-w-0">
        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[radial-gradient(circle_at_top,rgba(134,245,86,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_24px_60px_rgba(8,18,12,0.18)] sm:rounded-[2rem]">
          <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-[#102412]/82 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white">
            <FaExpand />
            Inspect image
          </div>
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="relative block w-full text-left"
            aria-label={`Open image gallery for ${alt}`}
          >
            <div className="relative aspect-[1.02/1] min-h-[20rem] sm:min-h-[26rem]">
              <Image
                src={activeImage}
                alt={alt}
                fill
                sizes="(min-width: 1280px) 42rem, (min-width: 1024px) 50vw, 100vw"
                quality={95}
                className="object-contain p-4 sm:p-6"
                priority
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(7,20,10,0)_0%,rgba(7,20,10,0.78)_100%)] px-5 pb-5 pt-10 text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em]">
                <FaSearchPlus />
                Tap or click to zoom
              </div>
            </div>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5 sm:mt-5 sm:grid-cols-4 sm:gap-4">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => showImage(index)}
              className={`relative overflow-hidden rounded-[1rem] border transition sm:rounded-[1.4rem] ${
                activeIndex === index
                  ? "border-[#86f556] shadow-[0_12px_30px_rgba(134,245,86,0.18)]"
                  : "border-white/10 hover:border-white/24"
              }`}
              aria-label={`Show gallery image ${index + 1}`}
            >
              <div className="relative aspect-[1/1] bg-white/6">
                <Image
                  src={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                  fill
                  sizes="(min-width: 640px) 12rem, 30vw"
                  quality={85}
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {isLightboxOpen ? (
        <div className="fixed inset-0 z-[260] bg-[#08130b]/96 p-4 sm:p-6">
          <div className="mx-auto flex h-full max-w-7xl flex-col">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#86f556]">
                  Product gallery
                </p>
                <p className="mt-2 text-sm text-white/72">
                  Image {activeIndex + 1} of {images.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomed((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2 text-sm font-bold text-white transition hover:border-[#86f556] hover:text-[#86f556]"
                >
                  <FaSearchPlus />
                  {isZoomed ? "Reset zoom" : "Zoom in"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setIsZoomed(false);
                  }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 text-white transition hover:border-[#86f556] hover:text-[#86f556]"
                  aria-label="Close image gallery"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="mt-4 grid min-h-0 flex-1 gap-4 lg:grid-cols-[5rem_minmax(0,1fr)]">
              <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
                {images.map((image, index) => (
                  <button
                    key={`${image}-lightbox`}
                    type="button"
                    onClick={() => showImage(index)}
                    className={`relative min-h-[5rem] min-w-[5rem] overflow-hidden rounded-[1.2rem] border ${
                      activeIndex === index ? "border-[#86f556]" : "border-white/12"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${alt} preview ${index + 1}`}
                      fill
                      sizes="5rem"
                      quality={80}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="order-1 flex min-h-0 items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black/28 lg:order-2">
                <div className="relative flex h-full w-full items-center justify-center overflow-auto">
                  <Image
                    src={activeImage}
                    alt={alt}
                    width={1600}
                    height={1600}
                    quality={95}
                    className={`h-auto max-h-full w-auto max-w-full object-contain transition duration-300 ${
                      isZoomed ? "scale-[1.85] cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    onClick={() => setIsZoomed((current) => !current)}
                  />
                </div>
              </div>
            </div>

            {images.length > 1 ? (
              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => shiftImage(-1)}
                  className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-3 text-sm font-bold text-white transition hover:border-[#86f556] hover:text-[#86f556]"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => shiftImage(1)}
                  className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-3 text-sm font-bold text-white transition hover:border-[#86f556] hover:text-[#86f556]"
                >
                  Next
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
