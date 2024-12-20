"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { removeFromCart, updateCartQuantity } from "../app/store/cartSlice";
import { PiShoppingCart } from "react-icons/pi";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const CartPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        dispatch(updateCartQuantity({ id, quantity }));
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className={`${poppins.className}`}>
            {/* Shopping Cart Icon */}
            <button
                className="relative flex items-center text-2xl"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <PiShoppingCart />
                {totalItems > 0 && (
                    <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Cart Popup */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                    <div className="fixed top-0 right-0 sm:w-[417px] sm:h-screen w-[80vw] h-fit bg-white shadow-lg p-4 z-50">
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-4"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-[18px] h-full"><Image src={"/images/shopcut.png"} alt="shopping-cut" width={100} height={100} className="object-contain"/></div>
                        </button>
                        <h2 className="text-[24px] font-semibold border-b pb-5">Shopping Cart</h2>
                        <div className="sm:h-[70%] h-[400px] py-2 overflow-y-auto scrollbar-custom">
                            {cartItems.length === 0 ? (
                                <div className="flex justify-center items-center h-full"><p className="text-center text-gray-500">Your cart is empty.</p></div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center mb-4">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={100}
                                            height={100}
                                            className="w-16 h-16 rounded-md"
                                        />
                                        <div className="ml-4 flex-1">
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <p className="text-gray-500 text-sm">
                                                {item.quantity} x ${item.price.toFixed(2)}
                                            </p>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    className="px-2 bg-gray-200 rounded"
                                                    onClick={() =>
                                                        handleQuantityChange(item.id, item.quantity - 1)
                                                    }
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="px-4">{item.quantity}</span>
                                                <button
                                                    className="px-2 bg-gray-200 rounded"
                                                    onClick={() =>
                                                        handleQuantityChange(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            className="text-white text-[20px] flex justify-center items-center rounded-full w-4 h-4 p-[11px] bg-[#9F9F9F]"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className=" pt-4">
                           <div className="flex items-center justify-between">
                           <h4 className="text-[16px]">Subtotal:</h4>
                           <h4 className="font-semibold text-[16px] text-[#B88E2F]">${subtotal.toFixed(2)}</h4>
                           </div>
                        </div>
                        <div className="flex sm:justify-between justify-center gap-3 mt-3 border-t py-6">
                            <button className="sm:px-8 px-5 py-2 rounded-3xl border-black border hover:bg-[#B88E2F] hover:text-white duration-300 hover:border-[#B88E2F] sm:text-[12px] text-[10px]">
                                Cart
                            </button>
                            <button className="sm:px-8 px-6 py-2 rounded-3xl border-black border hover:bg-[#B88E2F] hover:text-white duration-300 hover:border-[#B88E2F] sm:text-[12px] text-[10px]">
                                Checkout
                            </button>
                            <button className="sm:px-8 px-6 py-2 rounded-3xl border-black border hover:bg-[#B88E2F] hover:text-white duration-300 hover:border-[#B88E2F] sm:text-[12px] text-[10px]">
                                Comparison
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPopup;