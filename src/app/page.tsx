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
    <div className="py-7 w-[90%] md:ml-[20%] m-auto md:w-[70%] mb-10 md:mb-0">
      {/* Header and Search Section */}
      <section className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex items-center bg-white py-3 px-5 rounded-full shadow-md md:w-[400px] w-full border border-gray-200 focus-within:ring-2 focus-within:ring-yellow-400">
          <Image src={searchFood} alt="Search Icon" width={24} height={24} className="mr-3 opacity-70" />
          <input
            type="text"
            className="w-full outline-none text-gray-700 placeholder-gray-400 text-lg"
            placeholder="What do you want to prepare today?"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto">
          My Products
        </button>
      </section>

      {/* Main Content Area: Swiper or Search Results */}
      {searchVal === "" ? (
        <>
          {/* Swiper Section */}
          <section className="py-10">
            <SwiperImg />
          </section>

          {/* Category Section */}
          <section className="my-10 pb-20">
            <div className="flex items-center justify-between mb-7">
              <h1 className="text-4xl font-extrabold text-gray-800">Категория</h1>
              <Link href="/products">
                <span className="text-xl text-yellow-600 hover:text-yellow-700 font-semibold transition duration-200 cursor-pointer">
                  бештар &rarr;
                </span>
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto custom-scroll-bar pb-4 -mx-4 px-4">
              {randomInt !== null &&
                products
                  .slice(randomInt, Math.min(randomInt + 5, products.length))
                  ?.map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 flex flex-col gap-3 group cursor-pointer w-[280px] bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 p-3"
                    >
                      <div className="relative overflow-hidden rounded-lg w-full h-[200px]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition duration-300 transform group-hover:scale-110"
                        />
                      </div>
                      <p className="mt-2 text-start text-2xl font-bold text-gray-800 group-hover:text-yellow-600">
                        {item.name}
                      </p>
                    </div>
                  ))}
            </div>
          </section>
          <hr className="my-10 border-t-2 border-gray-100" />

          {/* Popular Foods Section */}
          <section className="my-10">
            <div className="flex items-center justify-between mb-7">
              <h1 className="text-4xl font-extrabold text-gray-800">
                Таомҳои <br className="md:hidden block" /> машҳур
              </h1>
              <Link href="/recipes">
                <span className="text-xl text-yellow-600 hover:text-yellow-700 font-semibold transition duration-200 cursor-pointer">
                  бештар &rarr;
                </span>
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto custom-scroll-bar pb-4 -mx-4 px-4">
              {randomInti !== null &&
                FoodCategory.slice(
                  randomInti,
                  Math.min(randomInti + 5, FoodCategory.length)
                ).map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 flex flex-col gap-3 group cursor-pointer w-[280px] bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 p-3"
                    onClick={() => navigateToRecipe(item.id)}
                  >
                    <div className="relative overflow-hidden rounded-lg w-full h-[200px]">
                      <Image
                        src={item.imageSearchUrl}
                        alt={item.foodName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition duration-300 transform group-hover:scale-110"
                      />
                    </div>
                    <p className="mt-2 text-start text-2xl font-bold text-gray-800 group-hover:text-yellow-600">
                      {item.foodName}
                    </p>
                    <p
                      className={`py-1 px-3 rounded-full w-fit text-sm font-medium transition duration-300 ease-in-out
                        ${
                          item.status
                            ? "bg-green-100 text-green-700 group-hover:bg-green-600 group-hover:text-white"
                            : "bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white"
                        }`}
                    >
                      {item.status ? "Halal" : "May Not Halal"}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-5">
          {filterSearch.length > 0 ? (
            filterSearch.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 p-4"
                onClick={() => navigateToRecipe(item.id)}
              >
                <div className="relative overflow-hidden rounded-lg w-full h-[220px]">
                  <Image
                    src={item.imageSearchUrl}
                    alt={item.foodName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-300 transform group-hover:scale-110"
                  />
                </div>
                <p className="mt-2 text-start text-xl font-bold text-gray-800 group-hover:text-yellow-600">
                  {item.foodName}
                </p>
                <p
                  className={`py-1 px-3 rounded-full w-fit text-sm font-medium transition duration-300 ease-in-out
                    ${
                      item.status
                        ? "bg-green-100 text-green-700 group-hover:bg-green-600 group-hover:text-white"
                        : "bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white"
                    }`}
                >
                  {item.status ? "Allowed for Muslims" : "Not Allowed for Muslims"}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500 text-2xl">
              `No results found for {searchVal}, Try a different search!`
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Page;