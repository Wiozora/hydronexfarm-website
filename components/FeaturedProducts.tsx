import { ProductCard } from "@/components/store/ProductCard";
import { getFeaturedProducts } from "@/lib/store";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section id="featured" className="bg-[#f7f8f1] py-14 sm:py-16 md:py-22 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
              Featured products
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-[#183109] sm:text-4xl md:text-5xl">
              Start with the products buyers ask for most
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#6f7988] sm:text-base sm:leading-8">
            These featured entries lead buyers straight into the right product detail page and the correct order or quote action.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
