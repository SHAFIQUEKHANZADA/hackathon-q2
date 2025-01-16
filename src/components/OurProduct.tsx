"use client"
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Products } from "./productArray";
import { IoMdHeartEmpty, IoMdShare } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

type Product = {
  id: number;
  title: string;
  slug: string;
  image: string;
  slogn: string,
  newArrival?: boolean,
  salePrice: number;
  originalPrice: number;
  rating: number;
  ratedBy: number;
  description: string;
  size: string[];
  color: string[];
  category?: string;
};

const OurProduct = () => {
  const handleAddToCart = (product: Product) => {
    console.log("Add to Cart:", product);
  };

  return (
    <div className={`${poppins.className} px-5 flex flex-col gap-10 py-10 bg-white`}>
      <h1 className="text-[40px] font-bold text-center py-5 text-[#3A3A3A]">Our Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-4 lg:px-[45px]">
        {Products.map((product) => {
          const discountPercentage =
            product.salePrice > 0
              ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
              : null;

          return (
            <Link key={product.id} href={`/product/${product.slug}`} passHref>
              <div className="relative bg-[#F4F5F7] flex flex-col justify-between lg:w-[285px] lg:h-[446px] md:h-[36vw] h-[70vw] group">
                {product.newArrival && (
                  <div className="absolute top-4 right-4 h-[48px] w-[48px] bg-[#2EC1AC] flex justify-center items-center text-white text-[16px] font-medium px-2 py-1 rounded-full">
                    New
                  </div>
                )}

                {discountPercentage && (
                  <div className="absolute top-4 right-4 h-[48px] w-[48px] bg-[#E97171] flex justify-center items-center text-white text-[16px] font-medium px-2 py-1 rounded-full">
                    -{discountPercentage}%
                  </div>
                )}

                <div className="lg:w-[285px] h-[145px]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="object-cover"
                  />
                </div>

                <div className="md:my-4 my-3 sm:px-4 px-2">
                  <h1 className="text-[#3A3A3A] font-semibold sm:text-[24px] text-[18px] lg:mb-2">{product.title}</h1>
                  <p className="text-[#898989] font-medium md:text-[16px] text-[14px] line-clamp-1">{product.slogn}</p>
                  <div className="flex items-center gap-2 lg:mt-4">
                    {product.salePrice > 0 ? (
                      <>
                        <span className="text-[#3A3A3A] font-semibold sm:text-[20px] text-[12px]">
                          ${product.salePrice.toFixed(2)}
                        </span>
                        <span className="line-through text-[#B0B0B0] sm:text-[16px] text-[12px]">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#3A3A3A] font-semibold sm:text-[20px] text-[12px]">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute flex flex-col space-y-4 justify-center items-center bg-black/50 lg:w-[285px] w-full h-full lg:h-[446px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <AddToCartButton onClick={() => handleAddToCart(product)} />
                  <div className="flex md:flex-row flex-col items-center gap-3 text-white text-[16px] font-medium">
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

      <div className="flex justify-center">
        <button className="bg-white text-[#B88E2F] border border-[#B88E2F] hover:border-transparent hover:bg-[#B88E2F] hover:text-white duration-300 text-[16px] font-semibold px-[44px] py-[12px]">
          Show More
        </button>
      </div>
    </div>
  );
};

export default OurProduct;
