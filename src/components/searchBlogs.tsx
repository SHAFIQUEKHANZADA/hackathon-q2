"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Blogtypes } from "./types";
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

const builder = imageUrlBuilder(client);

function urlFor(source: { asset: { _ref: string } }) {
    return builder.image(source);
}

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const SearchBlog = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Blogtypes[]>([]);
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
                    `*[_type == "blog" && (title match $query || category match $query)]{
                       category,
                      title,
                      slug,
                       overview,
                      content,
                      mainImage {
                     asset,
                       alt
                        },
                       authorName,
                     authorImage {
                        asset,
                        alt
                     },
                      publishingDate
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
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-600 rounded-[10px] pl-4 pr-10 py-2 w-full focus:outline-none"
                    placeholder="Search blogs..."
                />
                <FiSearch
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                />

                {query && (
                    <div className="absolute z-10  bg-white border border-gray-300 rounded-[10px] shadow-lg w-full max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                        {loading ? (
                            <p className="p-4 text-gray-600">Loading...</p>
                        ) : suggestions.length > 0 ? (
                            suggestions.map((blog, index) => (
                                <Link
                                    key={index}
                                    href={`/blog/${blog.category}/${blog.slug.current}`}
                                    className="block p-4 hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-3">

                                        <div>
                                            <div className="w-[50px] h-[50px]">
                                                <Image
                                                    className="w-full h-full object-cover rounded"
                                                    src={urlFor(blog.mainImage).url()}
                                                    alt={blog.mainImage.alt || "Blog image"}
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[12px] sm:text-[14px] text-gray-800">{blog.title}</p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[12px] text-[#9F9F9F]">{blog.category}</p>
                                                <p className="text-[12px] text-[#9F9F9F]">{new Date(blog.publishingDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="p-4 text-gray-600">No results found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBlog;
