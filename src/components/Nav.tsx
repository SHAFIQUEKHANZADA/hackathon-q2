"use client"
import Image from "next/image";
import { Montserrat, Poppins } from "next/font/google";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import CartPopup from "./CartPopup";
import MobileMenuBar from "./navLink";
import Search from "./Search";
import LikedProducts from "./LikedProduct";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const Navbar = () => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav
      className={`${poppins.className} overflow md:h-[100px] h-[60px] bg-maincolor text-black flex items-center justify-between lg:px-[65px] md:px-[3vw] px-3`}
    >
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-1">
          <Image
            src={"/images/logo.png"}
            alt="Main Logo"
            width={100}
            height={22}
            className="w-[52px] h-[30px]"
          />
          <h1
            className={`${montserrat.className} text-black text-[34px] font-bold`}
          >
            Furniro
          </h1>
        </div>
      </Link>

      <ul className={`${poppins.className} text-[16px] font-medium hidden lg:gap-[48px] gap-6 md:flex`}>
        <Link href='/'>
          <li className="relative cursor-pointer group">
            <span className="group-hover:text-orange-500 transition-all duration-300 inline-block relative">
              Home
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-orange-500 transition-all duration-300"></div>
            </span>
          </li>
        </Link>
        <div className="relative z-50">
          {/* Main Category */}
          <button
            className="flex items-center gap-[6px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered((prev) => !prev)}
          >
            Category
            <FaChevronDown
              className={`font-light text-[10px] transform transition-transform duration-300 ${isHovered ? "rotate-180" : "rotate-0"
                }`}
            />
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute left-0 mt-1 px-5 lg:w-[470px] flex justify-between bg-white shadow-lg border border-gray-200 transform transition-all duration-300 pointer-events-none ${isHovered ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0"
              }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Home Furniture */}
            <div className="p-4">
              <Link href={"/home_furniture"}><h3 className="font-semibold text-black">Home Furniture</h3></Link>
              <div className="mt-2 space-y-1 flex flex-col">
                <Link href={"/home_furniture/bed"}>
                  <span className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
                    Bed
                  </span>
                </Link>
                <Link href={"/home_furniture/sofa"}>
                  <span className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
                    Sofa
                  </span>
                </Link>
                <Link href={"/home_furniture/dining_table"}>
                  <span className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
                    Dinning Table
                  </span>
                </Link>
              </div>
            </div>

            {/* Office */}
            <div className="p-4">
              <Link href={"/office"}><h3 className="font-semibold text-black">Office</h3></Link>
              <div className="mt-2 space-y-1 flex flex-col">
                <Link href={"/office/office_chair"}>
                  <span className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
                    Office Chair
                  </span>
                </Link>
                <Link href={"/office/meeting_table"}>
                  <span className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
                    Meeting Table
                  </span>
                </Link>
                <Link href={"/office/bookshelves"}>
                  <span className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
                    Bookshelves
                  </span>
                </Link>
              </div>
            </div>

            {/* Outdoor */}
            <div className="p-4">
              <Link href={"/outdoor"}><h3 className="font-semibold text-black">Outdoor</h3></Link>
              <div className="mt-2 space-y-1 flex flex-col">
                <Link href={"/outdoor/outdoor_chair"}>
                  <span className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
                    Outdoor Chair
                  </span>
                </Link>
                <Link href={"/outdoor/coffe_table"}>
                  <span className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
                    Coffe Table
                  </span>
                </Link>
                <Link href={"/outdoor/swings"}>
                  <span className="text-sm text-gray-700 hover:text-orange-500 cursor-pointer">
                    Swings
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        <Link href='/blog'>
          <li className="relative cursor-pointer group">
            <span className="group-hover:text-orange-500 transition-all duration-300 inline-block relative">
              Blog
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-orange-500 transition-all duration-300"></div>
            </span>
          </li>
        </Link>
        <Link href='/contact'>
          <li className="relative cursor-pointer group">
            <span className="group-hover:text-orange-500 transition-all duration-300 inline-block relative">
              Contact
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-orange-500 transition-all duration-300"></div>
            </span>
          </li>
        </Link>
      </ul>


      {/* Desktop Icons */}
      <div className="hidden md:flex lg:gap-8 md:gap-4">
        <Link href={"/account/login"}><FiUser className="text-[24px]" /></Link>
        <Search />
        <LikedProducts />
        <CartPopup />
      </div>


      <div className="flex md:hidden items-center gap-4">
        <Search />
        <CartPopup />
        <MobileMenuBar />
      </div>
    </nav>
  );
};

export default Navbar;
