"use client";

import { urlFor } from "@/sanity/lib/image";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductType } from "./types";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });


interface RelatedProductsProps {
    category: string;
    subcategory: string;
    excludeSlug: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
    category,
    subcategory,
    excludeSlug,
}) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await fetch(
                    `/api/relatedproduct?category=${category}&subcategory=${subcategory}&excludeSlug=${excludeSlug}`
                );

                if (!res.ok) {
                    throw new Error(`API response error: ${res.statusText}`);
                }

                const data = await res.json();
                setProducts(data.products);
            } catch (err) {
                console.error("Error fetching related products:", err);
                setError("An error occurred while fetching related products.");
            }
        };

        fetchRelatedProducts();
    }, [category, subcategory, excludeSlug]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!products.length) {
        return <p>No related products found.</p>;
    }

    return (
        <div className={`${poppins.className}`}>
            <h2 className="text-[24px] font-bold text-[#3A3A3A] mb-6 text-center flex justify-center">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product, id) => (
                    <Link key={id} href={`/${product.category?.current || category}/${product.subcategory?.current || subcategory}/${product.slug.current}`}>
                        <div className="relative bg-[#F4F5F7] flex flex-col lg:w-[285px] lg:h-[446px] md:h-[36vw] h-[67vw] group">
                            {product.specialTag && product.specialTag.includes("newarrival") && (
                                <div className="absolute sm:top-4 top-2 sm:right-4 right-2 h-[48px] w-[48px] bg-[#2EC1AC] flex justify-center items-center text-white text-[16px] font-medium px-2 py-1 rounded-full">
                                    New
                                </div>
                            )}

                            {product.salePrice && product.price && (
                                <span className="absolute sm:top-4 top-2 sm:right-4 right-2 h-[48px] w-[48px] text-[12px] bg-[#E97171] flex justify-center items-center text-white font-medium px-2 py-1 rounded-full">
                                    Sale -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                                </span>
                            )}

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
                                {product.images.length > 1 && (
                                    <Image
                                        src={urlFor(product.images[1]).url()}
                                        alt={product.title}
                                        width={300}
                                        height={300}
                                        className="object-cover opacity-0 group-hover:opacity-100 w-full absolute duration-500 h-full"
                                    />
                                )}
                                {product.salePrice && product.price && (
                                    <span className="absolute sm:top-4 top-2 sm:right-4 right-2 sm:h-[48px] sm:w-[48px] h-[37px] w-[37px] sm:text-[12px] text-[9px] bg-[#E97171] flex justify-center items-center text-white font-medium px-2 py-1 rounded-full">
                                        Sale -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                                    </span>
                                )}
                            </div>
                            <div className="p-2 sapce-y-2">
                                <h3 className="text-[#3A3A3A] font-semibold lg:text-[20px] sm:text-[16px] text-[3vw] lg:mb-2 mb-1 line-clamp-2">{product.title}</h3>
                                <p className="text-[#3A3A3A] font-semibold lg:text-[18px] sm:text-[15px] text-[2.8vw] flex flex-row-reverse items-center justify-end sm:gap-2 gap-1">
                                    {product.salePrice ? (
                                        <>
                                            <span className="line-through text-[#B0B0B0] font-light text-[3vw] sm:text-[16px]">
                                                ${product.price.toFixed(2)}
                                            </span>{" "}
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

export default RelatedProducts;
