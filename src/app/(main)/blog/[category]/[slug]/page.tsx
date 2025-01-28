"use client";

import PreFooter from '@/components/PreFooter';
import { Poppins } from 'next/font/google';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { BsCalendarDateFill } from 'react-icons/bs';
import { FaTag } from 'react-icons/fa6';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import { Blogtypes } from '@/components/types';
import { PortableText, PortableTextComponents } from 'next-sanity';
import SearchBlog from '@/components/searchBlogs';


const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const builder = imageUrlBuilder(client);

function urlFor(source: { asset: { _ref: string } }) {
    return builder.image(source);
}

type CategoryCounts = {
    [key: string]: number;
};

const BlogPage = ({ params }: { params: { category: string; slug: string } }) => {
    const [blog, setBlog] = useState<Blogtypes | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [recentPosts, setRecentPosts] = useState<Blogtypes[]>([]);
    const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/blog/${params.category}/${params.slug}`, { cache: "no-store" });
                if (!res.ok) {
                    throw new Error("Failed to fetch the blog data");
                }
                const data = await res.json();
                if (data.blog) {
                    setBlog(data.blog);
                } else {
                    setError("Blog not found.");
                }
            } catch (err) {
                setError("An error occurred.");
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.category, params.slug]);

    useEffect(() => {
        if (!params.category || !params.slug) return;

        const recentPost = async () => {
            try {
                const res = await fetch(`/api/blog/${params.category}/${params.slug}`, { cache: "no-store" });
                if (!res.ok) {
                    throw new Error("Failed to fetch blog data");
                }

                const data = await res.json();

                if (data.blog) {
                    setBlog(data.blog);
                } else {
                    setError("Blog not found.");
                }

                if (data.recentPosts) {
                    setRecentPosts(data.recentPosts);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        recentPost();
    }, [params.category, params.slug]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/blog");
                const data = await res.json();
                setCategoryCounts(data.blogLength);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const ContentComponents: PortableTextComponents = {
        block: {
            h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
            blockquote: ({ children }) => <blockquote className="border-l-purple-500 border-l-4 bg-[#f7f7f7] italic p-4">{children}</blockquote>,

            customHeading: ({ children }) => (
                <h2 className="text-lg text-primary text-purple-700">{children}</h2>
            ),
        },
    };

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
                {/* Centered Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <Image
                        src={"/images/logo.png"}
                        alt="Main Logo"
                        width={100}
                        height={22}
                        className="w-[48px] h-[30px]"
                    />
                    <h1 className="md:text-[48px] text-[38px] font-medium">Blog</h1>
                    <div className="flex sm:text-[16px] text-[14px] items-center gap-2">
                        {/* Home Link */}
                        <Link href={"/"}>
                            <h1 className="font-bold">Home</h1>
                        </Link>
                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />


                        <Link href={"/blog"}>
                            <h1 className="">Blog</h1>
                        </Link>
                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />

                        {/* Check if blog exists */}
                        {blog ? (
                            <>
                                {/* Category Link */}
                                <Link href={`/blog/${blog?.category}`}>
                                    <h1 className="font-light">
                                        {blog?.category || "Uncategorized"}
                                    </h1>
                                </Link>
                                <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />

                                {/* Blog Title */}
                                <h1 className="font-light overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] md:max-w-full">
                                    {blog?.title}
                                </h1>

                            </>
                        ) : (
                            <p>Loading blog...</p>
                        )}
                    </div>
                </div>
            </div>

            <div className='flex md:flex-row flex-col min-h-screen lg:px-[50px] md:px-6 px-5 py-10 md:gap-[4vw] gap-10'>
                <div className='md:w-[70%] space-y-10'>

                    {loading ? (
                        <div className="flex flex-col justify-center items-center flex-1 space-y-4">
                            <div className="flex flex-col space-y-4 p-4 w-full">
                                <div className="lg:w-[817px] lg:h-[500px] md:h-[40vw] bg-gray-200 animate-pulse rounded-[10px]"></div>
                                <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-5/6 h-4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-1/3 h-10 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center">{error}</div>
                    ) : blog ? (
                        <div className="flex flex-col items-center gap-10">
                            <div className="flex flex-col gap-4">
                                <div className="lg:w-[817px] lg:h-[500px] md:h-[40vw]">
                                    {blog.mainImage?.asset && (
                                        <Image
                                            className="w-full h-full object-cover rounded-[10px]"
                                            src={urlFor(blog.mainImage).url()}
                                            alt={blog.mainImage.alt || "Main image"}
                                            width={600}
                                            height={600}
                                        />
                                    )}
                                </div>

                                <div className="flex sm:gap-6 gap-4 sm:text-[16px] text-[14px] text-[#9F9F9F] items-center">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-[30px] h-[30px] rounded-full">
                                            {blog.authorImage?.asset && (
                                                <Image
                                                    className="w-full h-full object-cover rounded-full"
                                                    src={urlFor(blog.authorImage).url()}
                                                    alt={blog.authorImage.alt || "Author image"}
                                                    width={100}
                                                    height={100}
                                                />
                                            )}
                                        </div>
                                        <p>{blog.authorName || "Unknown Author"}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <BsCalendarDateFill />
                                        <p>{new Date(blog.publishingDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <FaTag />
                                        <p>{blog.category || "Uncategorized"}</p>
                                    </div>
                                </div>

                                <h1 className="sm:text-[34px] text-[28px] font-semibold">{blog.title || "Untitled Blog"}</h1>
                                <p className=" ">{blog.overview || "No overview available."}</p>

                                <PortableText value={blog.content} components={ContentComponents} />


                            </div>
                        </div>
                    ) : (
                        <div className="text-center">No blog data available.</div>
                    )}

                </div>

                <div className='md:w-[30%]'>
                    <SearchBlog />
                    <div>
                        <h1 className="text-[24px] font-medium py-7">Categories</h1>

                        {loading ? (
                            <div className="flex flex-col space-y-4">
                                <div className="flex gap-2 space-y-4 w-full">
                                    <div className='w-full flex items-center gap-5'>
                                        <div className="w-[80%] h-5 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="w-[20%] h-5 bg-gray-200 animate-pulse rounded"></div>
                                    </div>

                                </div>
                                <div className="flex gap-2 space-y-4 w-full">
                                    <div className='w-full flex items-center gap-5'>
                                        <div className="w-[80%] h-5 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="w-[20%] h-5 bg-gray-200 animate-pulse rounded"></div>
                                    </div>

                                </div>
                                <div className="flex gap-2 space-y-4 w-full">
                                    <div className='w-full flex items-center gap-5'>
                                        <div className="w-[80%] h-5 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="w-[20%] h-5 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                </div>
                                <div className="flex gap-2 space-y-4 w-full">
                                    <div className='w-full flex items-center gap-5'>
                                        <div className="w-[80%] h-5 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="w-[20%] h-5 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                </div>
                                <div className="flex gap-2 space-y-4 w-full">
                                    <div className='w-full flex items-center gap-5'>
                                        <div className="w-[80%] h-5 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="w-[20%] h-5 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {Object.entries(categoryCounts).map(([category, count]) => (
                                    <Link key={category} href={`/blog/${category}`}>
                                        <div className="flex items-center justify-between text-[16px] text-[#9F9F9F]">
                                            <span>{category}</span>
                                            <span>{count}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <h1 className='text-[24px] font-medium py-5'>Recent Posts</h1>
                        {loading ? (
                            <div className="flex flex-col space-y-4">
                                <div className="flex gap-2 space-y-4 w-full">
                                    <div className="bg-gray-200 animate-pulse rounded-[10px] h-[80px] w-[80px]"></div>
                                    <div className='space-y-2 w-full'>
                                        <div className="w-full h-5 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="w-[50%] h-3 bg-gray-200 animate-pulse rounded"></div>
                                    </div>

                                </div>
                                <div className="flex gap-2 space-y-4 w-full">
                                    <div className="bg-gray-200 animate-pulse rounded-[10px] h-[80px] w-[80px]"></div>
                                    <div className='space-y-2 w-full'>
                                        <div className="w-full h-5 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="w-[50%] h-3 bg-gray-200 animate-pulse rounded"></div>
                                    </div>

                                </div>
                                <div className="flex gap-2 space-y-4 w-full">
                                    <div className="bg-gray-200 animate-pulse rounded-[10px] h-[80px] w-[80px]"></div>
                                    <div className='space-y-2 w-full'>
                                        <div className="w-full h-5 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="w-[50%] h-3 bg-gray-200 animate-pulse rounded"></div>
                                    </div>

                                </div>
                            </div>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="space-y-4">
                                {recentPosts.map((post, index) => (
                                    <Link key={index} href={`/blog/${post.category}/${post.slug.current}`}>
                                        <div className="flex gap-3 items-center">
                                            <div className="flex sm:items-center mb-4">
                                                <div className="sm:h-[80px] sm:w-[80px] w-[70px] h-[70px]">
                                                    <Image
                                                        src={urlFor(post.mainImage).url()}
                                                        alt={post.mainImage.alt || "Main image"}
                                                        width={100}
                                                        height={100}
                                                        className="rounded-lg object-cover h-full w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-[14px]">{post.title}</h1>
                                                <p className="text-[12px] text-[#9F9F9F]">{new Date(post.publishingDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PreFooter />
        </div>
    )
}

export default BlogPage