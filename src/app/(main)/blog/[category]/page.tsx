"use client";

import PreFooter from '@/components/PreFooter';
import { Blogtypes } from '@/components/types';
import { Poppins } from 'next/font/google';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { BsCalendarDateFill } from 'react-icons/bs';
import { FaTag } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';


const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const builder = imageUrlBuilder(client);

function urlFor(source: { asset: { _ref: string } }) {
    return builder.image(source);
}

const BlogCategory = ({ params }: { params: { category: string } }) => {
    const [blogs, setBlogs] = useState<Blogtypes[]>([]);  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/blog/${params.category}`, { cache: "no-store" });
                if (!res.ok) {
                    throw new Error("Failed to fetch the blog data");
                }
                const data = await res.json();
                if (data.blogs && data.blogs.length > 0) {   
                    setBlogs(data.blogs);
                } else {
                    setError("No blogs found for this category.");
                }
            } catch (err) {
                setError("An error occurred.");
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.category]);



    if (error) {
        return <div>{error}</div>;
    }

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
                    <div className="flex items-center gap-2">
                        <Link href={"/"}>
                            <h1 className="text-[16px] font-bold">Home</h1>
                        </Link>
                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />
                        <h1 className="text-[16px] font-light">Blog</h1>

                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />
                        {blogs ? (
                            <>
                                <h1 className="font-light">
                                    {params.category || "Uncategorized"}
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
                            {/* Skeleton loader */}
                            <div className="flex flex-col space-y-4 p-4 w-full">
                                <div className="lg:w-[817px] lg:h-[500px] md:h-[40vw] bg-gray-200 animate-pulse rounded-[10px]"></div>
                                <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-5/6 h-4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-1/3 h-10 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                            <div className="flex flex-col space-y-4 p-4 w-full">
                                <div className="lg:w-[817px] lg:h-[500px] md:h-[40vw] bg-gray-200 animate-pulse rounded-[10px]"></div>
                                <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-5/6 h-4 bg-gray-200 animate-pulse rounded"></div>
                                <div className="w-1/3 h-10 bg-gray-200 animate-pulse rounded"></div>
                            </div>
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
                    ) : (
                        <div className="flex flex-col items-center gap-10">
                            {(blogs || []).map((blog: Blogtypes) => (
                                <Link key={blog.slug.current} href={`/blog/${blog.category}/${blog.slug.current}`}>
                                    <div className='flex flex-col gap-4'>
                                        <div className='lg:w-[817px] lg:h-[500px] md:h-[40vw]'>
                                            {blog.mainImage?.asset && (
                                                <Image
                                                    className="w-full h-full object-cover rounded-[10px]"
                                                    src={urlFor(blog.mainImage).url()}
                                                    alt={blog.mainImage.alt || 'Main image'}
                                                    width={600}
                                                    height={600}
                                                />
                                            )}
                                        </div>

                                        <div className='flex sm:gap-6 gap-4 sm:text-[16px] text-[14px] text-[#9F9F9F] items-center'>
                                            <div className='flex gap-2 items-center'>
                                                <div className='w-[30px] h-[30px] rounded-full'>
                                                    {blog.authorImage?.asset && (
                                                        <Image
                                                            className="w-full h-full object-cover rounded-full"
                                                            src={urlFor(blog.authorImage).url()}
                                                            alt={blog.authorImage.alt || 'Main image'}
                                                            width={100}
                                                            height={100}
                                                        />
                                                    )}
                                                </div>
                                                <p>{blog.authorName}</p>
                                            </div>
                                            <div className='flex gap-2 items-center'>
                                                <BsCalendarDateFill />
                                                <p>{new Date(blog.publishingDate).toLocaleDateString()}</p>
                                            </div>
                                            <div className='flex gap-2 items-center'>
                                                <FaTag />
                                                <p>{blog.category}</p>
                                            </div>
                                        </div>

                                        <h1 className='text-[30px] font-medium'>{blog.title}</h1>
                                        <p className='text-[15px] text-[#9F9F9F]'>{blog.overview}</p>

                                        <button className='text-[16px] text-start mt-3 text-black underline underline-offset-8'>Read more</button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}


                </div>

                <div className='md:w-[30%]'>
                    <div className="relative">
                        <input
                            type="text"
                            className="border border-gray-600 rounded-[10px] pl-4 lg:pr-10 py-2"
                        />
                        <FiSearch
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                        />
                    </div>

                    <div>
                        <h1 className='text-[24px] font-medium py-7'>Categories</h1>

                        <div className='flex flex-col gap-6'>
                            <div className='flex items-center justify-between text-[16px] text-[#9F9F9F]'>Crafts<span>2</span></div>
                            <div className='flex items-center justify-between text-[16px] text-[#9F9F9F]'>Design<span>8</span></div>
                            <div className='flex items-center justify-between text-[16px] text-[#9F9F9F]'>Handmade<span>7</span></div>
                            <div className='flex items-center justify-between text-[16px] text-[#9F9F9F]'>Interior<span>1</span></div>
                            <div className='flex items-center justify-between text-[16px] text-[#9F9F9F]'>Wood<span>6</span></div>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-[24px] font-medium py-5'>Recent Posts</h1>
                        <div className='space-y-4'>
                            <div className="flex gap-3 items-center">
                                <div className="flex items-center h-[80px] w-[80px]">
                                    <div className="relative h-full w-full">
                                        <Image
                                            src="/images/s3.png"
                                            alt="blog"
                                            fill
                                            className="rounded-lg object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-[14px]">Going all-in with millennial design</h1>
                                    <p className="text-[12px] text-[#9F9F9F]">03 Aug 2022</p>
                                </div>
                            </div>

                            <div className='flex gap-3 items-center'>
                                <div className="flex items-center h-[80px] w-[80px]">
                                    {/* Make the container `relative` */}
                                    <div className="">
                                        <Image
                                            src={"/images/s8.png"}
                                            alt={"blog"}
                                            width={100}
                                            height={100}
                                            className=" rounded-lg object-cover mr-2  h-[80px] w-[80px]"
                                        />

                                    </div>
                                </div>
                                <div>
                                    <h1 className='text-[14px]'>Exploring new ways of decorating</h1>
                                    <p className='text-[12px] text-[#9F9F9F]'>03 Aug 2022</p>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <div className="flex items-center h-[80px] w-[80px]">
                                    {/* Make the container `relative` */}
                                    <div className="">
                                        <Image
                                            src={"/images/s3.png"}
                                            alt={"blog"}
                                            width={100}
                                            height={100}
                                            className=" rounded-lg object-cover mr-2  h-[80px] w-[80px]"
                                        />

                                    </div>
                                </div>
                                <div>
                                    <h1 className='text-[14px]'>Handmade pieces that took time to make</h1>
                                    <p className='text-[12px] text-[#9F9F9F]'>03 Aug 2022</p>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <div className="flex items-center h-[80px] w-[80px]">
                                    {/* Make the container `relative` */}
                                    <div className="">
                                        <Image
                                            src={"/images/s2.png"}
                                            alt={"blog"}
                                            width={100}
                                            height={100}
                                            className=" rounded-lg object-cover mr-2  h-[80px] w-[80px]"
                                        />

                                    </div>
                                </div>
                                <div>
                                    <h1 className='text-[14px]'>Going all-in with millennial design</h1>
                                    <p className='text-[12px] text-[#9F9F9F]'>03 Aug 2022</p>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <div className="flex items-center h-[80px] w-[80px]">
                                    {/* Make the container `relative` */}
                                    <div className="">
                                        <Image
                                            src={"/images/s9.png"}
                                            alt={"blog"}
                                            width={100}
                                            height={100}
                                            className=" rounded-lg object-cover mr-2  h-[80px] w-[80px]"
                                        />

                                    </div>
                                </div>
                                <div>
                                    <h1 className='text-[14px]'>Going all-in with millennial design</h1>
                                    <p className='text-[12px] text-[#9F9F9F]'>03 Aug 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='flex md:gap-10 gap-4 justify-center my-14'>
                <div className='md:w-[60px] w-[45px] md:h-[60px] h-[45px] rounded-[10px] bg-[#B88E2F] text-white flex justify-center items-center'>1</div>
                <div className='md:w-[60px] w-[45px] md:h-[60px] h-[45px] rounded-[10px] bg-[#F9F1E7] text-black flex justify-center items-center'>2</div>
                <div className='md:w-[60px] w-[45px] md:h-[60px] h-[45px] rounded-[10px] bg-[#F9F1E7] text-black flex justify-center items-center'>3</div>
                <div className='md:w-[98px] w-[45px] md:h-[60px] h-[45px] rounded-[10px] bg-[#F9F1E7] text-black flex justify-center items-center'>Next</div>
            </div>

            <PreFooter />
        </div>
    )
}

export default BlogCategory