import PreFooter from '@/components/PreFooter';
import { Poppins } from 'next/font/google';
import Image from 'next/image'
import Link from 'next/link'
import { BsCalendarDateFill } from 'react-icons/bs';
import { FaTag } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import { MdPersonalInjury } from 'react-icons/md';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const BlogPage = () => {
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
                    </div>
                </div>
            </div>

            <div className='flex md:flex-row flex-col min-h-screen md:px-[50px] px-5 py-10 md:gap-0 gap-10'>
                <div className='md:flex-2 space-y-10'>
                    {/* blog 1 */}
                    <div className='flex flex-col gap-4'>
                        <div className='md:w-[817px] md:h-[500px]'>
                            <Image src={"/images/bl1.png"} alt='blog' width={817} height={500} />
                        </div>

                        <div className='flex gap-6 text-[16px] text-[#9F9F9F] items-center'>
                            <div className='flex gap-2 items-center'>
                                <MdPersonalInjury />
                                <p>Admin</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <BsCalendarDateFill />
                                <p>14 Oct 2022</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <FaTag />
                                <p>Wood</p>
                            </div>
                        </div>

                        <h1 className='text-[30px] font-medium'>Going all-in with millennial design</h1>
                        <p className='text-[15px] text-[#9F9F9F] md:w-2/3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>

                        <button className='text-[16px] text-start mt-3 text-black underline underline-offset-8'>Read more</button>

                    </div>
                    {/* blog 2 */}
                    <div className='flex flex-col gap-4'>
                        <div className='md:w-[817px] md:h-[500px]'>
                            <Image src={"/images/bl2.png"} alt='blog' width={817} height={500} />
                        </div>

                        <div className='flex gap-6 text-[16px] text-[#9F9F9F] items-center'>
                            <div className='flex gap-2 items-center'>
                                <MdPersonalInjury />
                                <p>Admin</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <BsCalendarDateFill />
                                <p>14 Oct 2022</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <FaTag />
                                <p>Wood</p>
                            </div>
                        </div>

                        <h1 className='text-[30px] font-medium'>Exploring new ways of decorating</h1>
                        <p className='text-[15px] text-[#9F9F9F] md:w-2/3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>

                        <button className='text-[16px] text-start mt-3 text-black underline underline-offset-8'>Read more</button>

                    </div>
                    {/* blog 3 */}
                    <div className='flex flex-col gap-4'>
                        <div className='md:w-[817px] md:h-[500px]'>
                            <Image src={"/images/bl3.png"} alt='blog' width={817} height={500} />
                        </div>

                        <div className='flex gap-6 text-[16px] text-[#9F9F9F] items-center'>
                            <div className='flex gap-2 items-center'>
                                <MdPersonalInjury />
                                <p>Admin</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <BsCalendarDateFill />
                                <p>14 Oct 2022</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <FaTag />
                                <p>Wood</p>
                            </div>
                        </div>

                        <h1 className='text-[30px] font-medium'>Handmade pieces that took time to make</h1>
                        <p className='text-[15px] text-[#9F9F9F] md:w-2/3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>

                        <button className='text-[16px] text-start mt-3 text-black underline underline-offset-8'>Read more</button>

                    </div>
                </div>
                <div className='md:flex-1'>
                    <div className="relative">
                        <input
                            type="text"
                            className="border border-gray-600 rounded-[10px] pl-4 pr-10 py-2"
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

export default BlogPage