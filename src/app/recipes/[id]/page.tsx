"use client";

import React from "react";
import { FoodRecept } from "../../../stores/foodStore";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FoodCategory } from "@/stores/foodCategory";
import Image from "next/image";

// Define the structure of your food item object
interface FoodItem {
  id: string;
  name: string;
  country: string;
  time: string;
  recipes: string[]; // Ingredients
  description: string;
  linkFood: string; // YouTube link
  recipesBook: string[]; // Preparation steps
}

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function FoodDetailPage() {
  const pathname = usePathname(); // e.g. "/recipes/123"

  // Extract the ID from the pathname (assuming URL structure is "/recipes/[id]")
  // Split by '/' and take last part
  const id = pathname?.split("/").pop() || "";

  // Find the food item by id
  const arancini: FoodItem | undefined = FoodRecept.find((e) => e.id === id);
  const forImage = FoodCategory.find((e) => e.id === id);

  if (!arancini) {
    return (
      <div className="text-2xl flex items-center justify-center w-[70%] h-[100vh]">
        Таом ёфта нашуд.
      </div>
    ); // "Recipe not found" in Tajik
  }

  const videoId = getYouTubeVideoId(arancini.linkFood);

  return (
    <div className="min-h-screen md:ml-[20%] m-auto mb-10 md:mb-0 md:w-[70%] w-[100%] bg-gray-50 font-inter text-gray-800 antialiased">
      {/* Hero Section */}
      <section className="relative h-96 w-full overflow-hidden rounded-b-3xl shadow-lg">
        <Image
          src={forImage?.imageSearchUrl || "/fallback.jpg"}
          alt={forImage?.foodName || "Food image"}
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white md:p-10">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">
            {arancini.name}
          </h1>
          <div className="flex items-center space-x-4 text-lg md:text-xl">
            <span className="flex items-center">{arancini.country}</span>
            <span className="flex items-center">
              <span className="mr-2 text-2xl">🕒</span>
              {arancini.time}
            </span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <section className="mb-10 rounded-xl bg-white p-6 shadow-md md:p-8">
          <h2 className="mb-4 text-2xl font-semibold text-orange-600">
            Тавсифи таом
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            {arancini.description}
          </p>
        </section>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <section className="rounded-xl bg-white p-6 shadow-md md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-green-700">
              Маҳсулот
            </h2>
            <ul className="list-none space-y-3 pl-0">
              {arancini.recipes.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center text-lg text-gray-700"
                >
                  <span className="mr-3 text-xl text-green-500">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-md md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-blue-700">
              Тарзи тайёр кардан
            </h2>
            <ol className="list-decimal space-y-3 pl-5">
              {arancini.recipesBook.map((step, index) => (
                <li
                  key={index}
                  className="text-lg leading-relaxed text-gray-700"
                >
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </div>

        {videoId && (
          <section className="mt-10 rounded-xl bg-white p-6 shadow-md md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-red-600">
              Видеои тайёрӣ
            </h2>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <a
              href={arancini.linkFood}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block w-full rounded-lg bg-red-600 px-6 py-3 text-center text-xl font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Видеоро дар YouTube тамошо кунед
            </a>
          </section>
        )}

        <div className="mt-10 flex justify-center space-x-4">
          <Link href={"/recipes"}>
            <button className="rounded-lg bg-gray-200 px-6 py-3 text-lg font-semibold text-gray-700 shadow-md transition-all duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
              &larr; Ба рӯйхати таомҳо баргардед
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
