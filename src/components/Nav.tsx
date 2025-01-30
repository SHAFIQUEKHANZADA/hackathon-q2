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
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "./LanguageSwitcher";


const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });


const Navbar = () => {
  const t = useTranslations('navbar');
  const categories = [
    {
      title: `${t("mainTitleOne")}`,
      href: "/home_furniture",
      description: `${t("descOne")}`,
      subcategories: [
        {
          title: `${t("subTone")}`,
          href: "/home_furniture/bed",
          description: `${t("subDesc1one")}`,
        },
        {
          title: `${t("subTTwo")}`,
          href: "/home_furniture/sofa",
          description: `${t("subDesc1Two")}`,
        },
        {
          title: `${t("subTThree")}`,
          href: "/home_furniture/dining_table",
          description: `${t("subDesc1Three")}`,
        },
      ],
    },
    {
      title: `${t("mainTitleTwo")}`,
      href: "/office",
      description: `${t("descTwo")}`,
      subcategories: [
        {
          title: `${t("subT2One")}`,
          href: "/office/office_chair",
          description: `${t("subDesc2one")}`,
        },
        {
          title: `${t("subT2Two")}`,
          href: "/office/meeting_table",
          description: `${t("subDesc2Two")}`,
        },
        {
          title: `${t("subT2Three")}`,
          href: "/office/bookshelves",
          description: `${t("subDesc2Three")}`,
        },
      ],
    },
    {
      title: `${t("mainTitleThree")}`,
      href: "/outdoor",
      description: `${t("descThree")}`,
      subcategories: [
        {
          title: `${t("subT3one")}`,
          href: "/outdoor/outdoor_chair",
          description: `${t("subDesc3one")}`,
        },
        {
          title: `${t("subT3Two")}`,
          href: "/outdoor/coffee_table",
          description: `${t("subDesc3Two")}`,
        },
        {
          title: `${t("subT3Three")}`,
          href: "/outdoor/swings",
          description: `${t("subDesc3Three")}`,
        },
      ],
    },
  ];
 
  return (
    <nav
      className={`${poppins.className} overflow md:h-[100px] h-[60px] bg-maincolor text-black flex items-center justify-between lg:px-[65px] md:px-[2.8vw] px-3`}
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
            {t('Furniro')}
          </h1>
        </div>
      </Link>

      <ul className={`${poppins.className} text-[16px] font-medium hidden lg:gap-[48px] gap-4 md:flex`}>
        <Link href='/'>
          <li className="relative cursor-pointer group">
            <span className="group-hover:text-[#B88E2F] transition-all duration-300 inline-block relative">
              {t('home')}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#B88E2F] transition-all duration-300"></div>
            </span>
          </li>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="p-0 font-medium text-[16px]"> {t('categories')}</NavigationMenuTrigger>
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
              {t('blog')}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#B88E2F] transition-all duration-300"></div>
            </span>
          </li>
        </Link>
        <Link href='/contact'>
          <li className="relative cursor-pointer group">
            <span className="group-hover:text-[#B88E2F] transition-all duration-300 inline-block relative">
              {t('contact')}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#B88E2F] transition-all duration-300"></div>
            </span>
          </li>
        </Link>
      </ul>


      {/* Desktop Icons */}
      <div className="hidden md:flex lg:gap-8 md:gap-3 items-center">
        <Link href={"/account/login"}><FiUser className="text-[24px]" /></Link>
        <Search />
        <LikedProducts />
        <CartPopup />
       <LanguageSwitcher /> 
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
