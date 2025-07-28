"use client";
import { FoodCategory } from "@/stores/foodCategory";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Recipes = () => {
  const router = useRouter();

  function navigateToRecipe(id: string) {
    router.push(`/recipes/${id}`);
  }
  return (
    <div className="py-7 w-[90%] md:ml-[20%] m-auto md:w-[70%] mb-10 md:mb-0">
      <h1 className="mb-7 text-4xl font-bold">All Recipes</h1>
      <section className="flex gap-x-5 gap-y-8 flex-wrap">
        {FoodCategory.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 group cursor-pointer w-[45%] md:w-[300px]"
            onClick={() => navigateToRecipe(item.id)}
          >
            <div className="relative overflow-hidden rounded-xl w-full md:h-[200px] h-[20vh]">
              <Image
                src={item.imageSearchUrl}
                alt={item.foodName}
                fill
                className="object-cover transition duration-300 transform group-hover:scale-110"
              />
            </div>
            <p className="mt-2 text-start group-hover:text-yellow-500 text-2xl font-bold">
              {item.foodName}
            </p>
            {item.status ? (
              <p className="group-hover:bg-green-600 py-0.5 group-hover:px-2 group-hover:text-white rounded-lg">
                it is allowed for muslim
              </p>
            ) : (
              <p className="group-hover:bg-red-600 py-0.5 group-hover:px-2 group-hover:text-white rounded-lg">
                it is not allowed for muslim
              </p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Recipes;
