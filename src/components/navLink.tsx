"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import { SlMenu } from "react-icons/sl";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { CiLogin } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi2";

const montserrat = Montserrat({ subsets: ["latin"] });

const MobileMenuBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 400,
        });
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) setActiveSubMenu(null);
    };

    return (
        <div className={`${montserrat.className} md:hidden`}>
            {/* Menu Button / Close Button */}
            <div onClick={toggleMenu} className="cursor-pointer">
                {isMenuOpen ? (
                    <AiOutlineClose className="h-[22px] w-[22px]" />
                ) : (
                    <SlMenu className="h-[22px] w-[22px]" />
                )}
            </div>

            {/* Main Menu Drawer */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 h-[90%] w-full mt-14 text-black">
                    <div
                        className={`relative bg-white p-4 h-full flex flex-col items-start overflow-hidden transition-transform duration-500 ${activeSubMenu ? "-translate-x-full" : "translate-x-0"
                            }`}
                    >
                        {/* Main Menu */}
                        <div
                            data-aos="fade-up"
                            data-aos-duration="600"
                            onClick={() => setActiveSubMenu("SHOP")}
                            className="flex items-center justify-between w-full"
                        >
                            <Link href="#" className="text-[16px] font-medium py-[10px]">
                                SHOP
                            </Link>
                            <Image
                                src="/svg/arrow-right.svg"
                                alt="arrow"
                                width={100}
                                height={100}
                                className="w-[18px] h-[18px] font-extralight"
                            />
                        </div>
                        <div data-aos="fade-up"
                            data-aos-duration="600" className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>

                        <div
                            data-aos="fade-up"
                            data-aos-duration="600"
                            onClick={() => setActiveSubMenu("CATEGORY")}
                            className="flex items-center justify-between w-full"
                        >
                            <Link href="#" className="text-[16px] font-medium py-[10px]">
                                CATEGORY
                            </Link>
                            <Image
                                src="/svg/arrow-right.svg"
                                alt="arrow"
                                width={100}
                                height={100}
                                className="w-[18px] h-[18px] font-extralight"
                            />
                        </div>
                        <div data-aos="fade-up"
                            data-aos-duration="600" className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>

                        <div
                            data-aos="fade-up"
                            data-aos-duration="600"
                            onClick={() => setActiveSubMenu("ACCOUNT")}
                            className="flex items-center justify-between w-full"
                        >
                            <Link href="#" className="text-[16px] font-medium py-[10px]">
                                ACCOUNT
                            </Link>
                            <Image
                                src="/svg/arrow-right.svg"
                                alt="arrow"
                                width={100}
                                height={100}
                                className="w-[18px] h-[18px] font-extralight"
                            />
                        </div>
                        <div data-aos="fade-up"
                            data-aos-duration="600" className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>

                        <div
                            data-aos="fade-up"
                            data-aos-duration="600"
                            onClick={() => setActiveSubMenu("ABOUT_ROBIZ")}
                            className="flex items-center justify-between w-full"
                        >
                            <Link href="#" className="text-[16px] font-medium py-[10px]">
                                ABOUT FURNIRO
                            </Link>
                            <Image
                                src="/svg/arrow-right.svg"
                                alt="arrow"
                                width={100}
                                height={100}
                                className="w-[18px] h-[18px] font-extralight"
                            />
                        </div>
                    </div>

                    {/* Submenu Drawer */}
                    <div
                        className={`absolute inset-0 bg-white p-4 h-full flex flex-col items-start overflow-hidden transition-transform duration-500 ${activeSubMenu ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        <div className="flex items-center cursor-pointer mb-4" onClick={() => setActiveSubMenu(null)}>
                            <Image
                                src="/svg/arrow-back.svg"
                                alt="arrow"
                                width={100}
                                height={100}
                                className="w-[22px] h-[22px] font-extralight"
                            />
                        </div>
                        {activeSubMenu === "SHOP" && (
                            <>
                                <h1 className="py-4 text-[19px] font-semibold uppercase">SHOP</h1>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>
                                <Link href="/home_furniture" className="text-[16px] font-medium  py-2">
                                    Home Furniture
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>
                                <Link href="/office" className="text-[16px] font-medium  py-2">
                                    Office
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>
                                <Link href="/outdoor" className="text-[16px] font-medium  py-2">
                                    Outdoor
                                </Link>
                            </>
                        )}
                        {activeSubMenu === "CATEGORY" && (
                            <div className="h-[90vh] overflow-auto w-full">
                                {/* <h1 className="py-4 text-[19px] font-semibold uppercase">CATEGORY</h1> */}

                                <h3 className="font-semibold text-black py-2 flex justify-center text-[18px]">Home Furniture</h3>
                                <Link href={"/home_furniture/bed"} className="text-[16px] font-medium py-2">
                                    Bed
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-4"></div>
                                <Link href={"/home_furniture/sofa"} className="text-[16px] font-medium py-3">
                                    Sofa
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-4"></div>
                                <Link href={"/home_furniture/dining_table"} className="text-[16px] font-medium py-3">
                                    Dinning Table
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-4"></div>

                                <h3 className="font-semibold text-black py-2 flex justify-center text-[18px]">Office</h3>
                                <Link href={"/office/office_chair"} className="text-[16px] font-medium  py-3">
                                    Office Chair
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-4"></div>
                                <Link href={"/office/meeting_table"} className="text-[16px] font-medium  py-3">
                                    Meeting Table
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-4"></div>
                                <Link href={"/office/bookshelves"} className="text-[16px] font-medium py-3">
                                    Bookshelves
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-4"></div>

                                <h3 className="font-semibold text-black py-2 flex justify-center text-[18px]">Outdoor</h3>

                                <Link href={"/outdoor/outdoor_chair"} className="text-[16px] font-medium py-3">
                                    Outdoor Chair
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-4"></div>
                                <Link href={"/outdoor/coffe_table"} className="text-[16px] font-medium py-3">
                                    Coffe Table
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-4"></div>
                                <Link href={"/outdoor/swings"} className="text-[16px] font-medium py-3">
                                    Swings
                                </Link>
                            </div>
                        )}
                        {activeSubMenu === "ACCOUNT" && (
                            <>
                                <h1 className="py-4 text-[19px] font-semibold uppercase">ACCOUNT</h1>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>
                                <Link href="/account/login" className="text-[16px] font-medium flex items-center gap-1 py-2">
                                    <CiLogin /> Login
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>
                                <Link href="/account/signup" className="text-[16px] font-medium flex items-center gap-1 py-2">
                                    <FiUser /> Signup
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>
                                <Link href="/account/profile" className="text-[16px] font-medium  py-2">
                                    <HiOutlineUserCircle /> Your Profile
                                </Link>

                            </>
                        )}
                        {activeSubMenu === "ABOUT_ROBIZ" && (
                            <>
                                <h1 className="py-4 text-[19px] font-semibold uppercase">ABOUT FURNIRO</h1>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>
                                <Link href="/press" className="text-[16px] font-medium  py-2">
                                    PRESS
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>
                                <Link href="/lookbook" className="text-[16px] font-medium  py-2">
                                    LOOKBOOK
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>
                                <Link href="/about" className="text-[16px] font-medium  py-2">
                                    ABOUT US
                                </Link>
                                <div className="w-full h-[0.1px] bg-[#7B7B7B] my-2"></div>
                                <Link href="/contact" className="text-[16px] font-medium  py-2">
                                    CONTACT US
                                </Link>
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileMenuBar;