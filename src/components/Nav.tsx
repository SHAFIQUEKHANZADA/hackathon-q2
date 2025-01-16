import Image from "next/image";
import { Montserrat, Poppins } from "next/font/google";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import CartPopup from "./CartPopup";
import MobileMenuBar from "./navLink";
import Search from "./Search";
import LikedProducts from "./LikedProduct";

const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const Navbar = () => {

  return (
    <nav
      className={`${poppins.className} md:h-[100px] h-[60px] bg-maincolor text-black flex items-center justify-between lg:px-[65px] md:px-[3vw] px-3`}
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
