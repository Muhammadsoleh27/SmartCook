"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logoIcon from "@/assets/Screenshot 2025-06-29 013842 1.png";
import nameLogo from "@/assets/SmartCook.png";
import menuIcon from "@/assets/image.png";
import recipeta from "@/assets/image copy.png";
import recipetaAdd from "@/assets/image copy 2.png";
import aboutIcon from "@/assets/image copy 3.png";
import cookCPT from "@/assets/ChatGPT Image Jun 30, 2025, 11_28_15 PM.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Side_Bar = () => {
  const [token, setToken] = useState<string | null | boolean>(null);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("SmartToken");
    setToken(stored || false);
  }, []);

  return (
    <div className="md:w-[21%] w-[100%] bg-white md:h-[100vh] sticky md:top-0  bottom-0 md:left-0 p-5 pl-10">
      <section className="md:flex items-center mb-8 hidden">
        <Image src={logoIcon} alt="logo"/>
        <Image src={nameLogo} alt="logo"/>
      </section>
      <section className="flex md:flex-col justify-center gap-3 mb-[20%]">
        <Link href={"/"}>
          <button
            className={`flex md:flex-row flex-col items-center gap-5 text-xl bg-[#f5f5f584] md:w-[90%] p-2 rounded-xl h-[75px] hover:bg-yellow-400 group cursor-pointer ${
              pathname === "/" ? "bg-yellow-400" : "bg-[#f5f5f584]"
            }`}
          >
            <Image src={menuIcon} alt="menu icon" className="w-[50px]" />
            Menu
          </button>
        </Link>
        <Link href={"/recipes"}>
          <button
            className={`flex md:flex-row flex-col items-center gap-6 text-xl bg-[#f5f5f584] md:w-[90%] p-2 rounded-xl h-[75px] pl-4 hover:bg-yellow-400 group cursor-pointer ${
              pathname === "/recipes" ? "bg-yellow-400" : "bg-[#f5f5f584]"
            }`}
          >
            <Image src={recipeta} alt="menu icon" className="w-[35px]" />
            Recipes
          </button>
        </Link>
        <Link href={"/addrecipes"}>
          <button
            className={`flex md:flex-row flex-col items-center gap-5 text-xl bg-[#f5f5f584] md:w-[90%] p-2 rounded-xl h-[75px] hover:bg-yellow-400 group cursor-pointer ${
              pathname === "/addrecipes" ? "bg-yellow-400" : "bg-[#f5f5f584]"
            }`}
          >
            <Image src={recipetaAdd} alt="menu icon" className="w-[40px]" />
            Add Recipes
          </button>
        </Link>
        <Link href={"/cookGPT"}>
          <button
            className={`flex md:flex-row flex-col items-center gap-4 text-xl bg-[#f5f5f584] md:w-[90%] p-2 rounded-xl h-[75px] hover:bg-yellow-400 group cursor-pointer ${
              pathname === "/cookGPT" ? "bg-yellow-400" : "bg-[#f5f5f584]"
            }`}
          >
            <Image src={cookCPT} alt="menu icon" className="w-[50px]" />
            CookGPT
          </button>
        </Link>
        <Link href={"/about"}>
          <button
            className={`flex md:flex-row flex-col items-center gap-6 text-xl bg-[#f5f5f584] md:w-[90%] p-2 rounded-xl h-[75px] pl-4 hover:bg-yellow-400 group cursor-pointer ${
              pathname === "/about" ? "bg-yellow-400" : "bg-[#f5f5f584]"
            }`}
          >
            <Image src={aboutIcon} alt="menu icon" className="w-[35px]" />
            About
          </button>
        </Link>
      </section>
      {token || (
        <section className="w-[90%] bg-yellow-400 h-[190px] rounded-2xl p-5 md:block hidden">
          <h2 className="text-xl font-bold text-white">
            Gain full access. Log in to unlock premium recipes and tools.*
          </h2>
          <div className="flex justify-end items-end h-[60px]">
            <Link href={"/login"}>
              <button className="bg-white py-2 px-5 text-xl rounded-lg font-bold cursor-pointer">
                Login
              </button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Side_Bar;
