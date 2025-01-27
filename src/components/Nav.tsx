"use client"
import Image from "next/image";
import { Montserrat, Poppins } from "next/font/google";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import CartPopup from "./CartPopup";
import MobileMenuBar from "./navLink";
import Search from "./Search";
import LikedProducts from "./LikedProduct";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"


const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const categories = [
  {
    title: "Home Furniture",
    href: "/home_furniture",
    description: "Comfortable and stylish furniture for your home.",
    subcategories: [
      {
        title: "Bed",
        href: "/home_furniture/bed",
        description: "Find the perfect bed for a restful sleep.",
      },
      {
        title: "Sofa",
        href: "/home_furniture/sofa",
        description: "Cozy and modern sofas for your living space.",
      },
      {
        title: "Dining Table",
        href: "/home_furniture/dining_table",
        description: "Elegant dining tables for every home.",
      },
    ],
  },
  {
    title: "Office",
    href: "/office",
    description: "Efficient and ergonomic furniture for your workspace.",
    subcategories: [
      {
        title: "Office Chair",
        href: "/office/office_chair",
        description: "Chairs designed for comfort and productivity.",
      },
      {
        title: "Meeting Table",
        href: "/office/meeting_table",
        description: "Tables to foster collaboration and discussion.",
      },
      {
        title: "Bookshelves",
        href: "/office/bookshelves",
        description: "Organize your books and files stylishly.",
      },
    ],
  },
  {
    title: "Outdoor",
    href: "/outdoor",
    description: "Durable and stylish furniture for your outdoor spaces.",
    subcategories: [
      {
        title: "Outdoor Chair",
        href: "/outdoor/outdoor_chair",
        description: "Comfortable seating for your garden or patio.",
      },
      {
        title: "Coffee Table",
        href: "/outdoor/coffee_table",
        description: "Perfect tables for outdoor gatherings.",
      },
      {
        title: "Swings",
        href: "/outdoor/swings",
        description: "Relax and unwind with our sturdy swings.",
      },
    ],
  },
];
const Navbar = () => {
  return (
    <nav
      className={`${poppins.className} overflow md:h-[100px] h-[60px] bg-maincolor text-black flex items-center justify-between lg:px-[65px] md:px-[3vw] px-3`}
    >
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-1">
          <Image
            src={"/svg/svgLogo.svg"}
            alt="Main Logo"
            width={100}
            height={22}
            className="w-[52px] h-[30px]"
          />
          <h1
            className={`${montserrat.className} text-black sm:text-[34px] text-[30px] font-bold`}
          >
            Furniro
          </h1>
        </div>
      </Link>

      <ul className={`${poppins.className} text-[16px] font-medium hidden lg:gap-[48px] gap-6 md:flex`}>
        <Link href='/'>
          <li className="relative cursor-pointer group">
            <span className="group-hover:text-[#B88E2F] transition-all duration-300 inline-block relative">
              Home
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#B88E2F] transition-all duration-300"></div>
            </span>
          </li>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="p-0 font-medium text-[16px]">Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex p-6 gap-5 max-h-[80vh] w-[45vw] overflow-hidden">
                  {categories.map((category) => (
                    <div key={category.title} className="flex-1 space-y-1">
                      {/* Main Category */}
                      <Link href={category.href}>
                        <h3 className="text-lg font-semibold text-black hover:underline">
                          {category.title}
                        </h3>
                      </Link>
                      <p className="text-[12px] text-gray-400">{category.description}</p>
                      {/* Subcategories */}
                      <ul className="space-y-2 mt-10">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory.title}>
                            <Link href={subcategory.href}>
                              <div className="block space-y-1 rounded-md p-2 leading-none no-underline hover:bg-gray-100">
                                <div className="text-sm font-medium text-black">
                                  {subcategory.title}
                                </div>
                                <p className="text-[10px] text-gray-400">
                                  {subcategory.description}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>


        <Link href='/blog'>
          <li className="relative cursor-pointer group">
            <span className="group-hover:text-[#B88E2F] transition-all duration-300 inline-block relative">
              Blog
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#B88E2F] transition-all duration-300"></div>
            </span>
          </li>
        </Link>
        <Link href='/contact'>
          <li className="relative cursor-pointer group">
            <span className="group-hover:text-[#B88E2F] transition-all duration-300 inline-block relative">
              Contact
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#B88E2F] transition-all duration-300"></div>
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
