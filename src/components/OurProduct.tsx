"use client"
import { Poppins } from "next/font/google";
import Image from "next/image";
import { IoMdHeartEmpty, IoMdShare } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductType } from "./types";
import { urlFor } from "@/sanity/lib/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const OurProduct = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  console.log(error)

  useEffect(() => {
    async function fetchFilteredProducts() {
      console.log(`Fetching products`);
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/ourproducts`);
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("API Response:", data);

        if (!data.products || !Array.isArray(data.products)) {
          throw new Error("Invalid API response: Missing 'products' field");
        }

        const limitedProducts = data.products.slice(0, 8);

        setProducts(limitedProducts);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchFilteredProducts();
  }, []);

  const handleAddToCart = (product: ProductType) => {
    if (product) {
      const imageUrl = product.images?.[0]?.asset?.url ||
        "/default-image.png";

      console.log("Generated Image URL:", imageUrl);

      const cartItem = {
        id: product.slug.current,
        name: product.title,
        price: product.salePrice || product.price,
        quantity: 1,
        image: [imageUrl],
      };

      dispatch(addToCart(cartItem));
    }
  };

  return (
    <div className={`${poppins.className} px-5 flex flex-col gap-10 py-10 bg-white`}>
      <h1 className="text-[40px] font-bold text-center py-5 text-[#3A3A3A]">Our Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-4 lg:px-[45px]">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-4 lg:px-[45px] w-full">
            {Array(8).fill(null).map((_, index) => (
              <div key={index} className="mb-6 lg:w-[245px] mx-5 lg:h-[446px] md:h-[36vw] h-[70vw] flex flex-col bg-white overflow-hidden group relative animate-pulse">
                {/* Product Image Loader */}
                <div className="relative h-[300px] w-full overflow-hidden">
                  <div className="bg-gray-200 animate-pulse w-full h-full absolute flex justify-center items-center">
                    <div>
                      <Image
                        src={"/images/logo.png"}
                        alt="logo"
                        width={100}
                        height={100}
                        className="sm:w-[60px] w-[50px] h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details Loader */}
                <div className="flex flex-col py-2 gap-3">
                  <div className="bg-gray-200 w-full h-4 animate-pulse"></div>
                  <div className="bg-gray-200 w-[80%] h-4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

        ) : (
          products.map((product, id) => {
            return (
              <Link key={id} href={`/${product.category}/${product.subcategory}/${product.slug.current}`}>
                <div className="relative bg-[#F4F5F7] flex flex-col justify-between lg:w-[285px] lg:h-[446px] md:h-[36vw] h-[67vw] group">

                  <div className="relative lg:w-[285px] h-[75%]">
                    {product.images.length > 0 && (
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full absolute"
                      />
                    )}
                    {product.images.length > 1 && (
                      <Image
                        src={urlFor(product.images[1]).url()}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="object-cover opacity-0 group-hover:opacity-100 w-full absolute duration-500 h-full"
                      />
                    )}

                    {product.specialTag && product.specialTag.includes("newarrival") && (
                      <div className="absolute sm:top-4 top-2 sm:right-4 right-2 sm:h-[48px] sm:w-[48px] h-[37px] w-[37px] bg-[#2EC1AC] flex justify-center items-center text-white sm:text-[12px] text-[9px] font-medium px-2 py-1 rounded-full">
                        New
                      </div>
                    )}

                    {product.salePrice && product.price && (
                      <span className="absolute sm:top-4 top-2 sm:right-4 right-2 sm:h-[48px] sm:w-[48px] h-[37px] w-[37px] sm:text-[12px] text-[9px] bg-[#E97171] flex justify-center items-center text-white font-medium px-2 py-1 rounded-full">
                        Sale -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                      </span>
                    )}
                  </div>

                  <div className="md:my-4 my-3 sm:px-4 px-2">
                    <h1 className="text-[#3A3A3A] font-semibold lg:text-[20px] sm:text-[16px] text-[2.8vw] lg:mb-2 line-clamp-2">{product.title}</h1>
                    <div className="flex flex-row-reverse justify-end items-center lg:gap-2 gap-1 lg:mt-4 text-[11px] lg:text-[16px]">
                      {product.salePrice ? (
                        <>
                          <span className="line-through text-[#B0B0B0] font-light text-[11px] lg:text-[16px]">
                            ${product.price.toFixed(2)}
                          </span>{" "}
                          <br />
                          <span className="text-[11px] lg:text-[16px]">${product.salePrice.toFixed(2)}</span>
                        </>
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </div>
                  </div>

                  <div className="absolute sm:flex hidden flex-col space-y-4 justify-center items-center bg-black/50 lg:w-[285px] w-full h-full lg:h-[446px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-white text-[#C19C49] lg:w-[202px] lg:px-0 px-2 h-[48px]">
                      Add to Cart
                    </button>
                    <div className="flex lg:flex-row flex-col items-center lg:gap-3 md:gap-1 gap-3 text-white text-[16px] font-medium">
                      <span className="flex items-center gap-1"><IoMdShare /> Share</span>
                      <span className="flex items-center gap-1"><FaExchangeAlt /> Compare</span>
                      <span className="flex items-center gap-1"><IoMdHeartEmpty /> Like</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
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
