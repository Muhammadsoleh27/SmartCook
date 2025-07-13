"use client";
import { products } from "@/stores/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Products = () => {
  const router = useRouter();

  function navigateToRecipe(id: string) {
    router.push(`/recipes/${id}`);
  }
  return (
    <div className="py-7 w-[70%]">
      <h1 className="mb-7 text-4xl font-bold">All Products</h1>
      <section className="flex gap-x-5 gap-y-8 flex-wrap">
        {products.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 group cursor-pointer w-[300px]"
            onClick={() => navigateToRecipe(item.id.toString())}
          >
            <div className="relative overflow-hidden rounded-xl w-full h-[200px]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition duration-300 transform group-hover:scale-110"
              />
            </div>
            <p className="mt-2 text-start group-hover:text-yellow-500 text-2xl font-bold">
              {item.name}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Products;
