import { Poppins } from "next/font/google";
import Image from "next/image";
import { Products } from "./productArray";
import { IoMdHeartEmpty, IoMdShare } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const OurProduct = () => {
  return (
    <div className={`${poppins.className} px-5 flex flex-col gap-10 py-10`}>
      <h1 className="text-[40px] font-bold text-center py-5 text-[#3A3A3A]">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-[45px]">
        {Products.map((product) => {
          // Calculate discount percentage
          const discountPercentage =
            product.salePrice > 0
              ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
              : null;

          return (
            <Link key={product.id} href={`/product/${product.slug}`} passHref>
              <div key={product.id} className="relative bg-[#F4F5F7] flex flex-col justify-between w-[285px] h-[446px] group">
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
                <div className="w-[285px] h-[145px]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="object-cover"
                  />
                </div>

                <div className="my-4 px-4">
                  {/* Product Title */}
                  <h1 className="text-[#3A3A3A] font-semibold text-[24px] mb-2">{product.title}</h1>

                  {/* Product Slogan */}
                  <p className="text-[#898989] font-medium text-[16px]">{product.slogn}</p>

                  {/* Product Price */}
                  <div className="flex items-center gap-2 mt-4">
                    {product.salePrice > 0 ? (
                      <>
                        <span className="text-[#3A3A3A] font-semibold text-[20px]">
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
                <div className="absolute flex flex-col space-y-4 justify-center items-center bg-black/50 w-[285px] h-[446px]  left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-[#C19C49] w-[202px] h-[48px]">Add to Cart</button>
                  <div className="flex items-center gap-3 text-white text-[16px] font-medium">
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
  <button className="bg-white text-[#B88E2F] border border-[#B88E2F] text-[16px] font-semibold px-[44px] py-[12px]">Show More</button>
  </div>
    </div>
  );
};

export default OurProduct;
