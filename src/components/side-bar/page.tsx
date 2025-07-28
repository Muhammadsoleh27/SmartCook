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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("SmartToken");
    setToken(stored || false);
  }, []);

  const navItems = [
    { href: "/", icon: menuIcon, label: "Menu", shortLabel: "Menu" },
    { href: "/recipes", icon: recipeta, label: "Recipes", shortLabel: "Recipes" },
    { href: "/addrecipes", icon: recipetaAdd, label: "Add Recipes", shortLabel: "Add" },
    { href: "/cookGPT", icon: cookCPT, label: "CookGPT", shortLabel: "GPT" },
    { href: "/about", icon: aboutIcon, label: "About", shortLabel: "About" }
  ];

  return (
    <>      
      <div className={`
        ${isCollapsed ? 'md:w-[100px]' : 'md:w-[300px]'} 
        w-full md:h-screen h-[80px]
        bg-gradient-to-br from-white via-gray-50 to-gray-100
        backdrop-blur-xl
        border-r md:border-r border-t md:border-t-0 border-gray-200/60
        shadow-2xl shadow-gray-900/10
        md:fixed md:left-0 md:top-0
        fixed bottom-0 left-0 right-0 md:bottom-auto
        z-50 md:z-30
        transition-all duration-500 ease-in-out
        md:p-6 p-2
        md:mr-8
      `}>
        
        {/* Header - Desktop Only */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between mb-8 group">
            <div className={`flex items-center space-x-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="relative">
                <Image 
                  src={logoIcon} 
                  alt="SmartCook Logo" 
                  className="w-10 h-10 drop-shadow-lg"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <Image 
                src={nameLogo} 
                alt="SmartCook" 
                className="h-8 drop-shadow-sm"
              />
            </div>
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-xl bg-white/60 hover:bg-white/80 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex md:flex-col md:space-y-2 justify-evenly md:justify-start md:mb-8 h-full md:h-auto items-center md:items-stretch">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href} className="flex-1 md:flex-none">
                <div
                  className={`
                    group relative flex md:flex-row flex-col items-center justify-center
                    ${isCollapsed ? 'md:justify-center md:px-3' : 'md:px-4 md:space-x-4'} 
                    md:py-3 py-1
                    w-full md:w-auto
                    rounded-2xl cursor-pointer
                    transition-all duration-300 ease-out
                    hover:scale-[1.02] active:scale-[0.98]
                    ${isActive 
                      ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 text-white shadow-lg shadow-yellow-400/25' 
                      : 'bg-white/40 hover:bg-white/70 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-lg'
                    }
                    md:h-14 h-16
                  `}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'slideInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg hidden md:block" />
                  )}
                  
                  {/* Icon container */}
                  <div className={`
                    relative flex items-center justify-center
                    ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                    transition-transform duration-300
                  `}>
                    <Image 
                      src={item.icon} 
                      alt={item.label}
                      className={`
                        ${isCollapsed ? 'md:w-7 md:h-7' : 'md:w-8 md:h-8'} 
                        w-6 h-6
                        drop-shadow-sm
                        ${isActive ? 'brightness-0 invert' : 'group-hover:brightness-110'}
                        transition-all duration-300
                      `}
                    />
                    
                    {/* Glow effect */}
                    {isActive && (
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-sm scale-150" />
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`
                    font-medium transition-all duration-300
                    ${isCollapsed 
                      ? 'md:hidden text-[10px] mt-0.5' 
                      : 'md:text-base md:block text-[10px] mt-0.5'
                    }
                    ${isActive ? 'text-white font-semibold' : ''}
                    text-center leading-tight
                  `}>
                    {isCollapsed ? item.shortLabel : item.label}
                  </span>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 hidden md:block">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                    </div>
                  )}
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-active:opacity-20 bg-radial-gradient from-white to-transparent transition-opacity duration-150" />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Premium CTA - Desktop Only */}
        {!token && (
          <div className={`
            hidden md:block relative overflow-hidden
            ${isCollapsed ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
            transition-all duration-500 delay-100
          `}>
            <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-6 rounded-3xl shadow-2xl shadow-yellow-400/25 border border-yellow-300/20">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
              
              <div className="relative z-10">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                      Unlock Premium Features
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Access exclusive recipes, advanced tools, and personalized cooking assistance.
                    </p>
                  </div>
                </div>
                
                <Link href="/login">
                  <button className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group">
                    <span className="flex items-center justify-center space-x-2">
                      <span>Get Started</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.6);
          }
        }
        
        /* Global styles for main content spacing */
        :global(body) {
          padding-left: 0;
        }
        
        :global(.main-content) {
          margin-left: 340px !important;
          margin-bottom: 100px !important;
          padding: 30px !important;
          min-height: calc(100vh - 100px);
          transition: margin-left 0.5s ease-in-out;
        }
        
        :global(.main-content.collapsed) {
          margin-left: 140px !important;
        }
        
        /* Alternative class for manual application */
        :global(.page-content) {
          margin-left: 340px !important;
          margin-bottom: 100px !important;
          padding: 30px !important;
          min-height: calc(100vh - 100px);
          transition: margin-left 0.5s ease-in-out;
        }
        
        :global(.page-content.collapsed) {
          margin-left: 140px !important;
        }
        
        @media (max-width: 768px) {
          :global(.main-content),
          :global(.main-content.collapsed),
          :global(.page-content),
          :global(.page-content.collapsed) {
            margin-left: 10px !important;
            margin-bottom: 100px !important;
            padding: 20px !important;
            padding-top: 30px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Side_Bar;