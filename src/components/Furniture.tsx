import { Poppins } from 'next/font/google';
import Image from 'next/image';


const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });
const Furniture = () => {
    return (
        <div className={`${poppins.className} flex flex-col py-14 bg-white`}>
            <div className='flex flex-col items-center text-center'>
                <h1 className='text-[20px] font-semibold text-[#616161]'>Share your setup with</h1>
                <h1 className='text-[40px] font-bold text-[#3A3A3A]'>#FuniroFurniture</h1>
            </div>

            <div className="flex md:flex-row flex-col justify-between items-center w-full md:px-0 px-3">
                {/* Left Grid */}
                <div className="flex flex-col gap-2 w-full">

                    <div className='flex items-end gap-2'>
                        <div className="">
                            <Image src="/images/s1.png" alt="" width={78} height={382}  />
                        </div>
                        <div className="">
                            <Image src="/images/s2.png" alt="" width={451} height={312}  />
                        </div>
                    </div>

                    <div className='flex justify-start gap-2'>
                        <div className='md:mt-2'>
                            <Image src="/images/s3.png" alt="" width={185} height={310}  />
                        </div>
                        <div className=''>
                            <Image src="/images/s7.png" alt="" width={344} height={242} className='object-cover md:w-[344px] w-full h-[242px]'/>
                        </div>
                    </div>
                </div>

                {/* Center Main Image */}
                <div className="flex p-2 md:pt-10">
                    <div className="sm:w-[295px] w-[90vw] h-full">
                        <Image src="/images/s6.png" alt="main" width={295} height={392}  className='w-full h-full'/>
                    </div>
                </div>

                {/* Right Grid */}
                <div className="flex flex-col gap-2 w-full">
                    <div className='flex items-end gap-2'>
                        <div className="w-full">
                            <Image src="/images/s5.png" alt="" width={290} height={348}  />
                        </div>
                        <div className="w-full">
                            <Image src="/images/s4.png" alt="" width={262} height={433}  />
                        </div>
                    </div>

                    <div className='flex justify-start gap-2'>
                        <div className="">
                            <Image src="/images/s8.png" alt="" width={178} height={242}  />
                        </div>
                        <div>
                            <Image src="/images/s9.png" alt="" width={258} height={196}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Furniture