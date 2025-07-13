"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SwiperImg from "@/components/swiper/swiper";
import searchFood from "@/assets/image copy 4.png";
import { FoodCategory } from "./../stores/foodCategory";
import Link from "next/link";
import { products } from "./../stores/product";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [randomInt, setRandomInt] = useState<number | null>(null);
  const [randomInti, setRandomInti] = useState<number | null>(null);
  const [searchVal, setSearchVal] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const random = Math.floor(Math.random() * FoodCategory.length);
    const product = Math.floor(Math.random() * products.length);
    setRandomInt(random);
    setRandomInti(product);
  }, []);

  function navigateToRecipe(id: string) {
    router.push(`/recipes/${id}`);
  }

  const filterSearch = FoodCategory.filter((item) =>
    item.foodName.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="py-7 w-[70%]">
      {/* Header and Search */}
      <section className="flex justify-between mb-10">
        <div className="flex items-center gap-5">
          <div className="flex items-center bg-white py-2 px-4 rounded-xl w-[330px] gap-2">
            <Image src={searchFood} alt="search icon" width={30} height={30} />
            <input
              type="text"
              className="w-full outline-0"
              placeholder="What do you want to prepare today..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>
        </div>
        <button className="bg-yellow-400 py-2 px-5 text-white rounded-lg cursor-pointer">
          My Products
        </button>
      </section>

      {/* Swiper or Search Results */}
      {searchVal == "" ? (
        <div>
          {/* Swiper Section */}
          <section className="flex items-center justify-center py-10">
            <SwiperImg />
          </section>

          {/* Category Section */}
          <section className="my-10 pb-20">
            <div className="my-7 flex items-center justify-between">
              <h1 className="text-3xl font-bold">Категория</h1>
              <button className="text-xl hover:text-yellow-500 cursor-pointer">
                <Link href={"products"}>{`бештар -> `}</Link>
              </button>
            </div>
            <section className="flex justify-between gap-4">
              {randomInt !== null &&
                products
                  .slice(randomInt, Math.min(randomInt + 5, products.length))
                  ?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 group cursor-pointer w-[240px]"
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
          </section>

          {/* Popular Foods Section */}
          <section className="my-10">
            <div className="my-7 flex items-center justify-between">
              <h1 className="text-3xl font-bold">Таомҳои машҳур</h1>
              <button className="text-xl hover:text-yellow-500 cursor-pointer">
                <Link href={"recipes"}>{`бештар -> `}</Link>
              </button>
            </div>
            <section className="flex justify-between gap-4">
              {randomInti !== null &&
                FoodCategory.slice(
                  randomInti,
                  Math.min(randomInti + 5, FoodCategory.length)
                ).map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 group cursor-pointer w-[240px]"
                    onClick={() => navigateToRecipe(item.id)}
                  >
                    <div className="relative overflow-hidden rounded-xl w-full h-[200px]">
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
                    <p
                      className={`py-0.5 px-2 rounded-lg ${
                        item.status
                          ? "group-hover:bg-green-600 text-green-700 group-hover:text-white"
                          : "group-hover:bg-red-600 text-red-700 group-hover:text-white"
                      }`}
                    >
                      {item.status
                        ? "it is allowed for muslim"
                        : "it is not allowed for muslim"}
                    </p>
                  </div>
                ))}
            </section>
          </section>
        </div>
      ) : (
        <section className="flex items-center gap-8 flex-wrap">
          {filterSearch?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 group cursor-pointer w-[240px]"
              onClick={() => navigateToRecipe(item.id)}
            >
              <div className="overflow-hidden rounded-xl w-full">
                <img
                  src={item.imageSearchUrl}
                  alt={item.foodName}
                  className="w-full h-[200px] transition duration-300 transform group-hover:scale-110"
                />
              </div>
              <p className="mt-2 text-start group-hover:text-yellow-500 text-2xl font-bold">
                {item.foodName}
              </p>
              <p
                className={`py-0.5 px-2 rounded-lg ${
                  item.status
                    ? "group-hover:bg-green-600 text-green-700 group-hover:text-white"
                    : "group-hover:bg-red-600 text-red-700 group-hover:text-white"
                }`}
              >
                {item.status
                  ? "it is allowed for muslim"
                  : "it is not allowed for muslim"}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Page;
