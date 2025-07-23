"use client";

import Link from "next/link";
import React from "react";

export default function SmartCookHomePage() {
  return (
    <div className="min-h-screen md:w-[70%] w-[100%] bg-gradient-to-br from-blue-50 to-green-50 font-inter text-gray-800 antialiased">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center md:py-32 bg-white shadow-md rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-green-100 opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 leading-tight">
            SmartCook <br /> Ошпази шахсии шумо
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Роҳи осонтарин барои пайдо кардани таомҳои нав ва пухтани лазизтарин
            хӯрокҳо. Бигзор CookGPT ба шумо дар ошпазӣ ёрӣ диҳад!
          </p>
          <div className="flex justify-center space-x-4">
            <Link href={"recipes"}>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">
                Таом ёбед
              </button>
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* About Smart Cook Section */}
        <section className="mb-16 rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-4xl font-bold text-center text-blue-700">
            Дар бораи SmartCook
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 text-center max-w-3xl mx-auto">
            Smart Cook як платформаи инноватсионӣ мебошад, ки барои содда
            кардани раванди ошпазӣ ва илҳом бахшидан ба шумо барои таҷрибаҳои
            нави кулинарӣ пешбинӣ шудааст. Новобаста аз он ки шумо ошпази
            ботаҷрибаед ё навкор, барномаи мо ба шумо кӯмак мекунад, ки таомҳои
            болаззат омода кунед.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="mb-16">
          <h2 className="mb-10 text-4xl font-bold text-center text-green-700">
            Хусусиятҳои асосӣ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: AI-Powered Recommendations */}
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105">
              <div className="mb-4 text-6xl text-purple-600">✨</div>
              <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                Ёрдамчии ошпазии AI
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Бо истифода аз зеҳни сунъӣ, Smart Cook метавонад ба шумо дар
                пайдо кардани таомҳо мувофиқи завқ, маҳсулоти мавҷуда ё ҳатто
                ҳолати рӯҳияи шумо кӯмак расонад. Савол диҳед ва бигзор AI ба
                шумо роҳнамоӣ кунад!
              </p>
            </div>

            {/* Feature 2: Top Foods */}
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105">
              <div className="mb-4 text-6xl text-yellow-600">🏆</div>
              <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                Таомҳои беҳтарин
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Рӯйхати таомҳои маъмултарин ва баландтаринро аз ҷомеаи мо кашф
                кунед. Ҳамеша аз тамоюлҳои кулинарӣ огоҳ бошед ва таомҳои навро
                санҷед.
              </p>
            </div>

            {/* Feature 3: Find by Product */}
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105">
              <div className="mb-4 text-6xl text-red-600">🔍</div>
              <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                Бо маҳсулот пайдо кунед
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Дар яхдонатон чӣ доред? Маҳсулоти мавҷудаи худро ворид кунед ва
                Smart Cook ба шумо таомҳоеро пешниҳод мекунад, ки шумо метавонед
                бо онҳо тайёр кунед. Ҳеҷ гоҳ маҳсулот бекор намемонад!
              </p>
            </div>
          </div>
        </section>

        {/* Future of Smart Cook Section */}
        <section className="rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-4xl font-bold text-center text-orange-600">
            Ояндаи Smart Cook
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 text-center max-w-3xl mx-auto">
            Мо пайваста барои такмил додани Smart Cook кор карда истодаем. Дар
            оянда, мо нақша дорем, ки хусусиятҳои бештарро илова кунем, аз
            ҷумла: банақшагирии хӯрок, рӯйхати харид, имконияти мубодилаи
            рецептҳои худ ва ҷомеаи интерактивӣ барои ошпазон. Ҳадафи мо ин аст,
            ки Smart Cook ҳамсафари ниҳоии шумо дар ошпазӣ гардад.
          </p>
        </section>
      </main>

      {/* Footer (Optional, but good practice) */}
      <footer className="bg-gray-800 text-white text-center py-8 mt-12 rounded-t-3xl">
        <p>
          &copy; {new Date().getFullYear()} SmartCook. Ҳамаи ҳуқуқҳо ҳифз
          шудаанд.
        </p>
      </footer>
    </div>
  );
}
