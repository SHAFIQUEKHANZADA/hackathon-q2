"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { addToCart } from "@/app/store/cartSlice";
import { removeFromLikes } from "@/app/store/likedProductSlice";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FiHeart } from "react-icons/fi";
import { TbHeartX } from "react-icons/tb";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
}


const LikedProducts = () => {
    const dispatch = useDispatch();

    const likedProducts = useSelector((state: RootState) => state.likedProducts.likedItems);
    const likedCount = likedProducts.length;

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    const handleRemoveFromLikes = (productId: string) => {
        dispatch(removeFromLikes(productId));
    };

    return (
        <div className={`${poppins.className}`}>
            {/* Like Icon with Count */}
            <Sheet>
                <SheetTrigger asChild>
                    <button className="relative flex items-center text-2xl">
                        <FiHeart className="text-[24px]" />
                        {likedCount > 0 && (
                            <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {likedCount}
                            </span>
                        )}
                    </button>
                </SheetTrigger>

                {/* Liked Products Popup */}
                <SheetContent className="fixed top-0 right-0 sm:w-[417px] w-[80vw]  bg-white shadow-lg p-4 z-50">
                    <SheetHeader>
                        <SheetTitle className="text-[24px] font-semibold border-b pb-5 text-left">
                            Liked Products
                        </SheetTitle>
                    </SheetHeader>
                    <div className="sm:h-[70%] h-[400px] py-2 overflow-y-auto scrollbar-custom">
                        {likedProducts.length === 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-center text-gray-500">No liked products found.</p>
                            </div>
                        ) : (
                            likedProducts.map((product) => (
                                <div key={product.id} className="flex items-center mb-4">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={100}
                                        height={100}
                                        className="w-16 h-16 rounded-md"
                                    />
                                    <div className="ml-4 flex-1">
                                        <h4 className="font-semibold">{product.name}</h4>
                                        <div className="flex items-end justify-between">
                                            <p className="text-gray-500 text-sm"> ${product?.price ? product.price.toFixed(2) : "0.00"}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    className="text-black underline text-[12px]"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    Add to Cart
                                                </button>
                                                <button
                                                    className="text-red-500 text-[12px] flex items-center gap-1 hover:underline hover:text-red-400"
                                                    onClick={() => handleRemoveFromLikes(product.id)}
                                                >
                                                    Dislike
                                                    <TbHeartX className="text-[16px]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default LikedProducts;
