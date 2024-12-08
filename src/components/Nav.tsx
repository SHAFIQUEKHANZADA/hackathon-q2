"use client"
import Image from "next/image";
import { Montserrat, Poppins } from "next/font/google";
import Link from "next/link";
import { PiShoppingCart } from "react-icons/pi";
import { FiHeart } from "react-icons/fi";
import { BsPersonExclamation } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import {  HiX } from "react-icons/hi";
import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";

const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={`${poppins.className} md:h-[100px] h-[60px] bg-maincolor flex items-center justify-between md:px-[65px] px-3`}
    >
      {/* Logo */}
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

      <ul className={`${poppins.className} text-[16px] font-medium hidden gap-[48px] md:flex`}>
        <Link href='/'>
          <li className="relative cursor-pointer group">
            <span className="group-hover:text-orange-500 transition-all duration-300 inline-block relative">
              Home
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-orange-500 transition-all duration-300"></div>
            </span>
          </li>
        </Link>
        <Link href='/shop'>
          <li className="relative cursor-pointer group">
            <span className="group-hover:text-orange-500 transition-all duration-300 inline-block relative">
              Shop
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-orange-500 transition-all duration-300"></div>
            </span>
          </li>
        </Link>
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
      <div className="hidden md:flex gap-10">
        <Link href={"/"}>
          <BsPersonExclamation className="text-[24px]" />
        </Link>
        <Link href={"/"}>
          <CiSearch className="text-[28px]" />
        </Link>
        <Link href={"/"}>
          <FiHeart className="text-[24px]" />
        </Link>
        <Link href={"/"}>
          <PiShoppingCart className="text-[24px]" />
        </Link>
      </div>
      

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center gap-4">
      <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <PiShoppingCart className="text-[24px]" />
            </Link>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <HiX className="text-[28px]" />
          ) : (
            <RiMenu3Fill className="text-[30px]" />
          )}
        </button>
       
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full h-screen bg-maincolor flex flex-col items-start px-5 py-3 space-y-5 shadow-lg z-50 md:hidden">
          <Link
            href="/"
            className="text-[16px] font-medium"
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-[16px] font-medium"
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-[16px] font-medium"
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-[16px] font-medium"
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Contact
          </Link>
          <div className="flex gap-5 mt-5">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <BsPersonExclamation className="text-[24px]" />
            </Link>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <CiSearch className="text-[28px]" />
            </Link>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <FiHeart className="text-[24px]" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
