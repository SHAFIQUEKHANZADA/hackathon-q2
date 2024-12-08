"use client"
import PreFooter from '@/components/PreFooter'
import { Products } from '@/components/productArray'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import { IoMdHeartEmpty, IoMdShare } from 'react-icons/io'

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const ShopPage = () => {
    // Example state for pagination
    const [currentPage] = React.useState(1);
    const itemsPerPage = 16;
    const totalItems = Products.length;
 

    // Calculate displayed products
    const displayedProducts = Products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className={`${poppins.className}`}>
            {/* Main Banner */}
            <div className="relative">
                <div className="w-full">
                    <Image
                        src="/images/bgmain.png"
                        alt="Main Banner"
                        width={1920}
                        height={1080}
                        className="w-full h-[150px] md:h-auto object-cover"
                    />
                </div>
                {/* Centered Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <Image
                        src={"/images/logo.png"}
                        alt="Main Logo"
                        width={100}
                        height={22}
                        className="w-[48px] h-[30px]"
                    />
                    <h1 className="md:text-[48px] text-[38px] font-medium">Shop</h1>
                    <div className="flex items-center gap-2">
                        <Link href={"/"}>
                            <h1 className="text-[16px] font-bold">Home</h1>
                        </Link>
                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />
                        <h1 className="text-[16px] font-light">Shop</h1>
                    </div>
                </div>
            </div>

            {/* Filter and Pagination Section */}
            <div className="flex justify-between items-center mb-8 md:px-[45px] h-[100px] bg-[#F9F1E7]">
                <div className="text-[16px]">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
                </div>
                <div className="flex items-center gap-4">
                    <span>Show 16</span>
                    {/* Add a dropdown or select for "Show X results" here */}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-4 md:px-[45px] px-5 mt-20">
                {displayedProducts.map((product) => {
                    // Calculate discount percentage
                    const discountPercentage =
                        product.salePrice > 0
                            ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
                            : null;

                    return (
                        <Link key={product.id} href={`/product/${product.slug}`} passHref>
                            <div className="relative bg-[#F4F5F7] flex flex-col justify-between md:w-[285px] md:h-[446px] h-[350px] group">
                                {/* New Arrival Badge */}
                                {product.newArrival && (
                                    <div className="absolute top-4 right-4 h-[48px] w-[48px] bg-[#2EC1AC] flex justify-center items-center text-white text-[16px] font-medium px-2 py-1 rounded-full">
                                        New
                                    </div>
                                )}

                                {/* Discount Percentage */}
                                {discountPercentage && (
                                    <div className="absolute top-4 right-4 h-[48px] w-[48px] bg-[#E97171] flex justify-center items-center text-white text-[16px] font-medium px-2 py-1 rounded-full">
                                        -{discountPercentage}%
                                    </div>
                                )}

                                {/* Product Image */}
                                <div className="md:w-[285px] h-[145px]">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={300}
                                        height={200}
                                        className="object-cover"
                                    />
                                </div>

                                <div className="my-4 md:px-4 px-2">
                                    {/* Product Title */}
                                    <h1 className="text-[#3A3A3A] font-semibold text-[24px] mb-2">{product.title}</h1>

                                    {/* Product Slogan */}
                                    <p className="text-[#898989] font-medium text-[16px]">{product.slogn}</p>

                                    {/* Product Price */}
                                    <div className="flex items-center gap-2 mt-4">
                                        {product.salePrice > 0 ? (
                                            <>
                                                <span className="text-[#3A3A3A] font-semibold md:text-[20px] text-[16px]">
                                                    ${product.salePrice.toFixed(2)}
                                                </span>
                                                <span className="line-through text-[#B0B0B0] text-[16px]">
                                                    ${product.originalPrice.toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-[#3A3A3A] font-semibold text-[20px]">
                                                ${product.originalPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* "Add to Cart" Button on Hover */}
                                <div className="absolute flex flex-col space-y-4 justify-center items-center bg-black/50 md:w-[285px] md:h-[446px] h-[350px]  left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="bg-white text-[#C19C49] md:w-[202px] w-[180px] h-[48px]">Add to Cart</button>
                                    <div className="flex items-center md:gap-3 gap-1 text-white md:text-[16px] text-[12px] font-medium">
                                        <span className="flex items-center gap-1"><IoMdShare /> Share</span>
                                        <span className="flex items-center gap-1"><FaExchangeAlt /> Compare</span>
                                        <span className="flex items-center gap-1"><IoMdHeartEmpty /> Like</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className='flex md:gap-10 gap-4 justify-center my-14'>
                <div className='md:w-[60px] w-[45px] md:h-[60px] h-[45px] rounded-[10px] bg-[#B88E2F] text-white flex justify-center items-center'>1</div>
                <div className='md:w-[60px] w-[45px] md:h-[60px] h-[45px] rounded-[10px] bg-[#F9F1E7] text-black flex justify-center items-center'>2</div>
                <div className='md:w-[60px] w-[45px] md:h-[60px] h-[45px] rounded-[10px] bg-[#F9F1E7] text-black flex justify-center items-center'>3</div>
                <div className='md:w-[98px] w-[45px] md:h-[60px] h-[45px] rounded-[10px] bg-[#F9F1E7] text-black flex justify-center items-center'>Next</div>
            </div>

            <PreFooter/>
        </div>
    )
}

export default ShopPage
