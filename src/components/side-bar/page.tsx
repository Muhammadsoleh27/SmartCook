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
    <div className="md:w-[21%] w-[100%] bg-white md:h-[100vh] z-20 sticky md:top-0  bottom-0 md:left-0 p-5 md:pl-10">
      <section className="md:flex items-center mb-8 hidden">
        <Image src={logoIcon} alt="logo"/>
        <Image src={nameLogo} alt="logo"/>
      </section>
      <section className="flex md:flex-col md:justify-center md:gap-3 justify-evenly md:mb-[20%]">
        <Link href={"/"}>
          <button
            className={`flex md:flex-row flex-col items-center md:gap-5 md:text-xl md:bg-[#f5f5f584] md:w-[90%] p-2 rounded-xl h-[75px] hover:border-yellow-400 border-b-1 md:hover:bg-yellow-400 group cursor-pointer ${
              pathname === "/" ? "bg-yellow-400" : "md:bg-[#f5f5f584]"
            }`}
          >
            <Image src={menuIcon} alt="menu icon" className="md:w-[50px] w-[30px]" />
            Menu
          </button>
        </Link>
        <Link href={"/recipes"}>
          <button
            className={`flex md:flex-row flex-col items-center md:gap-6 md:text-xl md:bg-[#f5f5f584] md:w-[90%] p-2 rounded-xl h-[75px] pl-4 hover:border-yellow-400 border-b-1 md:hover:bg-yellow-400 group cursor-pointer ${
              pathname === "/recipes" ? "bg-yellow-400" : "md:bg-[#f5f5f584]"
            }`}
          >
            <Image src={recipeta} alt="menu icon" className="md:w-[35px] w-[30px]" />
            Recipes
          </button>
        </Link>
        <Link href={"/addrecipes"}>
          <button
            className={`flex md:flex-row flex-col items-center md:gap-5 md:text-xl md:bg-[#f5f5f584] md:w-[90%] p-2 rounded-xl h-[75px] hover:border-yellow-400 border-b-1 md:hover:bg-yellow-400 group cursor-pointer ${
              pathname === "/addrecipes" ? "bg-yellow-400" : "md:bg-[#f5f5f584]"
            }`}
          >
            <Image src={recipetaAdd} alt="menu icon" className="md:w-[40px] w-[30px]" />
            <span>Add </span><span className="md:inline-block hidden">Recipes</span>
          </button>
        </Link>
        <Link href={"/cookGPT"}>
          <button
            className={`flex md:flex-row flex-col items-center md:gap-4 md:text-xl md:bg-[#f5f5f584] md:w-[90%] p-2 rounded-xl h-[75px] hover:border-yellow-400 border-b-1 md:hover:bg-yellow-400 group cursor-pointer ${
              pathname === "/cookGPT" ? "bg-yellow-400" : "md:bg-[#f5f5f584]"
            }`}
          >
            <Image src={cookCPT} alt="menu icon" className="md:w-[50px] w-[30px]" />
            CookGPT
          </button>
        </Link>
        <Link href={"/about"}>
          <button
            className={`flex md:flex-row flex-col items-center md:gap-6 text-xl md:bg-[#f5f5f584] md:w-[90%] p-2 rounded-xl h-[75px] pl-4 hover:border-yellow-400 border-b-1 md:hover:bg-yellow-400 group cursor-pointer ${
              pathname === "/about" ? "bg-yellow-400" : "md:bg-[#f5f5f584]"
            }`}
          >
            <Image src={aboutIcon} alt="menu icon" className="md:w-[35px] w-[30px]" />
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
