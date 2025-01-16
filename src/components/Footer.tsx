import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const Footer = () => {
    return (
        <div className={`${poppins.className} md:h-[490px] md:p-20 p-5 bg-white`}>
            <div className="flex flex-col">
                <div className="md:h-[312px] flex md:flex-row flex-col gap-10 md:gap-0">
                    <div className="flex-1">
                        <h1 className="text-[24px] font-bold text-black md:mb-10 mb-4">Funiro.</h1>
                        <p className="text-[16px] text-[#9F9F9F]">400 University Drive Suite 200 Coral Gables,
                            FL 33134 USA</p>
                    </div>
                    <div className="flex-1 lg:ml-10">
                        <h1 className="text-[16px] md:mb-10 mb-4 font-semibold text-[#9F9F9F]">Links</h1>
                        <ul className="flex flex-col md:gap-10 gap-3 text-black">
                            <Link href={"/"}><li className="text-[16px] font-semibold">Home</li></Link>
                            <Link href={"/shop"}><li className="text-[16px] font-semibold">Shop</li></Link>
                            <Link href={"/about"}><li className="text-[16px] font-semibold">About</li></Link>
                            <Link href={"/contact"}><li className="text-[16px] font-semibold">Contact</li></Link>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-[16px] font-semibold text-[#9F9F9F] md:mb-10 mb-4">Help</h1>
                        <ul className="flex flex-col md:gap-10 gap-3 text-black">
                            <Link href={"/"}><li className="text-[16px] font-semibold">Payment Options</li></Link>
                            <Link href={"/"}><li className="text-[16px] font-semibold">Returns</li></Link>
                            <Link href={"/"}><li className="text-[16px] font-semibold">Privacy Policies</li></Link>

                        </ul>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-[16px] font-semibold text-[#9F9F9F] md:mb-10 mb-4">
                            Newsletter
                        </h1>
                        <div className="flex items-center mt-3 gap-2">
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                className="border-b border-gray-400 pb-1 focus:outline-none focus:border-black text-[14px] w-full"
                            />
                            <button className="border-b pb-1 border-gray-400 text-black text-[14px] font-semibold">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="flex flex-col md:gap-10 gap-3 mt-20 md:mt-0">
            <div className="bg-[#000000] opacity-[30%]  h-[1px] w-full" />

            <h1>2023 furino. All rights reverved</h1>
            </div>
        </div>

    )
}

export default Footer