"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useState } from "react";
import PreFooter from "@/components/PreFooter";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

interface Product {
    id: string;
    name: string;
    price: number;
    image: string[];
}


const ComparePage = () => {
    const products = useSelector((state: RootState) => state.compareProducts.compareItems);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const handleSelectProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        if (selectedId && !selectedProducts.includes(selectedId)) {
            setSelectedProducts((prev) => [...prev, selectedId]);
        }
    };

    const handleRemoveProduct = (id: string) => {
        setSelectedProducts((prev) => prev.filter((productId) => productId !== id));
    };

    // Map selected product IDs to their details
    const selectedProductDetails: Product[] = selectedProducts.map(
        (id) => products.find((product: Product) => product.id === id) as Product
    );


    const totalSlots = 2;
    const emptySlots = totalSlots - selectedProductDetails.length;

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
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <Image
                        src={"/images/logo.png"}
                        alt="Main Logo"
                        width={100}
                        height={22}
                        className="w-[48px] h-[30px]"
                    />
                    <h1 className="md:text-[48px] text-[30px] font-medium">
                        Product Comparison
                    </h1>
                    <div className="flex items-center gap-2">
                        <Link href={"/"}>
                            <h1 className="text-[16px] font-bold">Home</h1>
                        </Link>
                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />
                        <h1 className="text-[16px] font-light">Comparison</h1>
                    </div>
                </div>
            </div>

            {/* Comparison Section */}
            <div className="flex md:flex-row flex-col md:px-[4vw] px-4 lg:gap-14 space-y-5 gap-4 mt-10">
                {/* Info Section */}
                <div className="flex-1">
                    <h1 className="lg:text-[2.4vw] text-[22px]">
                        Go to Product page for more Products
                    </h1>
                    <button className="text-[#727272] text-[20px] underline underline-offset-8">
                        View More
                    </button>
                </div>

                {/* Selected Products Section */}
                <div className="flex-1">
                    <div className="mb-5">
                        <div className="flex items-center gap-6">
                            {/* Display Selected Products */}
                            {selectedProductDetails.map((product) =>
                                product ? (
                                    <div
                                        key={product.id}
                                        className="flex flex-col items-center w-[280px] h-[360px] overflow-hidden"
                                    >
                                        <div className="md:w-[280px] h-[177px] rounded-md">
                                            <Image
                                                src={product.image[0]}
                                                alt={product.name}
                                                width={300}
                                                height={200}
                                                className="object-cover h-full w-full rounded-md"
                                            />
                                        </div>
                                        <h3 className="text-center text-[18px] font-medium mt-10">
                                            {product.name}
                                        </h3>
                                        <p className="text-center text-[16px]">{`Price: $${product.price}`}</p>
                                        <button
                                            onClick={() => handleRemoveProduct(product.id)}
                                            className="text-red-500 underline mt-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : null
                            )}

                            {/* Display Placeholder Cards */}
                            {Array.from({ length: emptySlots }, (_, index) => (
                                <div
                                    key={`placeholder-${index}`}
                                    className="flex flex-col p-1 items-center justify-center lg:w-[280px] md:w-[24vw] w-[45vw] lg:h-[300px] md:h-[25vw] h-[46vw] bg-gray-200 rounded-md"
                                >
                                    <p className="text-gray-500 text-center text-[16px]">
                                        No product selected.
                                    </p>
                                    <p className="text-gray-500 text-center text-[14px]">
                                        Please add a product for comparison.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add Products Section */}
                <div className="flex-1">
                    <div className="md:mt-10">
                        <div className="mb-5">
                            <h2 className="text-[24px] font-semibold">Add a Product</h2>
                            <select
                                onChange={handleSelectProduct}
                                className="border px-4 py-2 md:w-full bg-[#B88E2F] text-white rounded-[6px]"
                            >
                                <option value="" disabled selected>
                                    Select a product
                                </option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* info */}
            <div className="border-t border-[#E8E8E8] md:mx-[4vw] mx-4 md:flex hidden mt-10 gap-16">
                <div className="space-y-16 border-r border-[#E8E8E8] pt-10">
                    <div className="space-y-3">
                        <h1 className="font-medium text-[28px]">General</h1>
                        <ul className="space-y-3">
                            <li className="text-[20px]">Sales Package</li>
                            <li className="text-[20px]">Model Number</li>
                            <li className="text-[20px]">Secondary Material</li>
                            <li className="text-[20px]">Configuration</li>
                            <li className="text-[20px]">Upholstery Material</li>
                            <li className="text-[20px]">Upholstery Color</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h1 className="font-medium text-[28px]">Product</h1>
                        <ul className="space-y-3">
                            <li className="text-[20px]">Filling Material</li>
                            <li className="text-[20px]">Finish Type</li>
                            <li className="text-[20px]">Adjustable Headrest</li>
                            <li className="text-[20px]">Maximum Load Capacity</li>
                            <li className="text-[20px]">Origin of Manufacture</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h1 className="font-medium text-[28px]">Dimensions</h1>
                        <ul className="space-y-3">
                            <li className="text-[20px]">Width</li>
                            <li className="text-[20px]">Height</li>
                            <li className="text-[20px]">Depth</li>
                            <li className="text-[20px]">Weight</li>
                            <li className="text-[20px]">Seat Height</li>
                            <li className="text-[20px]">Leg Height</li>
                        </ul>
                    </div>
                </div>
                <div className="border-r border-[#E8E8E8] px-4 space-y-[120px] pr-[5vw] pt-10">
                    <div className="mt-[50px] space-y-16">
                        <ul className="space-y-3">
                            <li className="text-[20px]">1 sectional sofa</li>
                            <li className="text-[20px]">TFCBLIGRBL6SRHS</li>
                            <li className="text-[20px]">Solid Wood</li>
                            <li className="text-[20px]">L-shaped</li>
                            <li className="text-[20px]">Fabric + Cotton</li>
                            <li className="text-[20px]">Bright Grey & Lion</li>
                        </ul>
                    </div>

                    <div className="mt-[50px] space-y-16">
                        <ul className="space-y-3">
                            <li className="text-[20px]">Foam</li>
                            <li className="text-[20px]">Bright Grey & Lion</li>
                            <li className="text-[20px]">No</li>
                            <li className="text-[20px]">280 KG</li>
                            <li className="text-[20px]">India</li>
                        </ul>
                    </div>

                    <div className="mt-[50px] space-y-16">
                        <ul className="space-y-3">
                            <li className="text-[20px]">265.32 cm</li>
                            <li className="text-[20px]">76 cm</li>
                            <li className="text-[20px]">167.76 cm</li>
                            <li className="text-[20px]">45 KG</li>
                            <li className="text-[20px]">41.52 cm</li>
                            <li className="text-[20px]">5.46 cm</li>
                        </ul>
                    </div>

                    <button className="text-[20px] border border-transparent text-white bg-[#B88E2F] hover:border-[#B88E2F] hover:text-[#B88E2F] hover:bg-transparent duration-300 py-3 px-5">
                        Add To Cart
                    </button>

                </div>
                <div className="border-r border-[#E8E8E8] px-4 space-y-[120px] pr-[5vw] pt-10">
                    <div className="mt-[50px] space-y-16">
                        <ul className="space-y-3">
                            <li className="text-[20px]">1 sectional sofa</li>
                            <li className="text-[20px]">TFCBLIGRBL6SRHS</li>
                            <li className="text-[20px]">Solid Wood</li>
                            <li className="text-[20px]">L-shaped</li>
                            <li className="text-[20px]">Fabric + Cotton</li>
                            <li className="text-[20px]">Bright Grey & Lion</li>
                        </ul>
                    </div>

                    <div className="mt-[50px] space-y-16">
                        <ul className="space-y-3">
                            <li className="text-[20px]">Foam</li>
                            <li className="text-[20px]">Bright Grey & Lion</li>
                            <li className="text-[20px]">No</li>
                            <li className="text-[20px]">280 KG</li>
                            <li className="text-[20px]">India</li>
                        </ul>
                    </div>

                    <div className="mt-[50px] space-y-16">
                        <ul className="space-y-3">
                            <li className="text-[20px]">265.32 cm</li>
                            <li className="text-[20px]">76 cm</li>
                            <li className="text-[20px]">167.76 cm</li>
                            <li className="text-[20px]">45 KG</li>
                            <li className="text-[20px]">41.52 cm</li>
                            <li className="text-[20px]">5.46 cm</li>
                        </ul>
                    </div>

                    <button className="text-[20px] border border-transparent text-white bg-[#B88E2F] hover:border-[#B88E2F] hover:text-[#B88E2F] hover:bg-transparent duration-300 py-3 px-5">
                        Add To Cart
                    </button>
                </div>
            </div>

            <PreFooter/>
        </div>
    );
};

export default ComparePage;
