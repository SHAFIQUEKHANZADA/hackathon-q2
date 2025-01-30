"use client";

import { urlFor } from "@/sanity/lib/image";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductType } from "./types";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

interface RecommendedProductsProps {
    category?: string;   
    subcategory?: string; 
    excludeSlug?: string;  
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
    category,
    subcategory,
}) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [error, setError] = useState<string | null>(null);
    console.log(setError)

    useEffect(() => {
        const fetchRecommendedProducts = async () => {
          try {
            const res = await fetch(`/api/recommendation?specialTag=newarrival`);
            const data = await res.json();
      
            console.log("🚀 API Response:", data);
      
            if (!data.products?.length) {
              console.warn("❌ No recommended products found.");
            }
      
            setProducts(data.products || []);
          } catch (err) {
            console.error("🔥 Error fetching recommended products:", err);
          }
        };
      
        fetchRecommendedProducts();
      }, []);
      

    if (error) return <p>{error}</p>;
    if (!products.length) return <p>No recommended products found.</p>;

    return (
        <div className={`${poppins.className}`}>
            <h2 className="text-[24px] font-bold text-[#3A3A3A] mb-6 text-center flex justify-center">
                Recommended Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product, id) => (
                    <Link key={id} href={`/${product.category?.current || category}/${product.subcategory?.current || subcategory}/${product.slug.current}`}>
                        <div className="relative bg-[#F4F5F7] flex flex-col lg:w-[285px] lg:h-[446px] md:h-[36vw] h-[67vw] group">
                            <div className="relative w-full h-[77%] overflow-hidden">
                                {product.images.length > 0 && (
                                    <Image
                                        src={urlFor(product.images[0]).url()}
                                        alt={product.title}
                                        width={300}
                                        height={300}
                                        className="object-cover w-full h-full absolute"
                                    />
                                )}
                            </div>
                            <div className="p-2 space-y-2">
                                <h3 className="text-[#3A3A3A] font-semibold lg:text-[20px] sm:text-[16px] text-[3vw] lg:mb-2 mb-1 line-clamp-2">
                                    {product.title}
                                </h3>
                                <p className="text-[#3A3A3A] font-semibold lg:text-[18px] sm:text-[15px] text-[2.8vw] flex flex-row-reverse items-center justify-end sm:gap-2 gap-1">
                                    {product.salePrice ? (
                                        <>
                                            <span className="line-through text-[#B0B0B0] font-light text-[3vw] sm:text-[16px]">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <br />
                                            <span>${product.salePrice.toFixed(2)}</span>
                                        </>
                                    ) : (
                                        `$${product.price.toFixed(2)}`
                                    )}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecommendedProducts;
