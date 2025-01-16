"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { client } from "@/sanity/lib/client";
import { ProductType } from "./types";
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";

const builder = imageUrlBuilder(client);

function urlFor(source: { asset: { _ref: string } }) {
    return builder.image(source);
}


const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });


const Search = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!query.trim()) {
                setSuggestions([]);
                return;
            }

            setLoading(true);

            try {
                const results = await client.fetch(
                    `*[_type in ["outdoor", "home_furniture", "office"] && (title match $query || category match $query || subcategory match $query)]{
                        title,
                        category,
                        subcategory,
                        slug,
                        price,
                        salePrice,
                        images[]{
                            asset->{
                                _id,
                                url
                            },
                            alt
                        },
                    }`,
                    { query: `${query}*` } as Record<string, unknown>
                );
                
                setSuggestions(results);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [query]);

    return (
        <div className={`${poppins.className}`}>
            {/* Search Icon */}
            <Sheet>
                <SheetTrigger asChild>
                    <button className="relative flex items-center">
                        <CiSearch className="text-[28px]" />
                    </button>
                </SheetTrigger>

                {/* Search Popup */}
                <SheetContent className="fixed top-0 right-0 sm:w-[417px] sm:h-screen w-[80vw] h-fit bg-white shadow-lg p-4 z-50">
                    <div className="mt-10">
                        <div className="relative">
                            <FiSearch className="h-6 w-6 cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="search"
                                placeholder="What are you looking for?"
                                className="p-2 pl-12 focus:outline-none bg-transparent w-full"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="w-full h-[1.5px] bg-black my-2"></div>

                        {/* Suggestions */}
                        <div className="px-4 space-y-4 py-4 h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                            {loading ? (
                                <p className="text-gray-600 text-sm">Loading...</p>
                            ) : suggestions.length > 0 ? (
                                <ul className="text-[14px] text-black space-y-2">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="hover:underline cursor-pointer"
                                        >
                                            <Link href={`/product/${suggestion.slug.current}`}>
                                                <span className="flex items-center gap-3 text-[16px] space-y-3">
                                                    <div>
                                                        <div className="w-[50px] h-[50px]">
                                                            <Image
                                                                className="w-full h-full object-cover rounded"
                                                                src={urlFor(suggestion.images[0]).url()}
                                                                alt={suggestion.title || "Product image"}
                                                                width={100}
                                                                height={100}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-1 justify-start items-start">
                                                        <h1 className="text-[16px] font-semibold text-[#3A3A3A]">{suggestion.title}</h1>

                                                        <div className="flex flex-row-reverse items-center gap-1 text-[12px]">
                                                            {suggestion.salePrice ? (
                                                                <>
                                                                    <span className="line-through text-[#B0B0B0] font-light">
                                                                        Rs.{suggestion.price.toFixed(2)}
                                                                    </span>{" "}
                                                                    <br />
                                                                    <span>Rs.{suggestion.salePrice.toFixed(2)}</span>
                                                                </>
                                                            ) : (
                                                                `Rs.${suggestion.price.toFixed(2)}`
                                                            )}
                                                        </div>
                                                    </div>
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600 text-sm">No results found.</p>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Search;
