import { Poppins } from 'next/font/google';
import Image from 'next/image';


const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });
const Furniture = () => {
    return (
        <div className={`${poppins.className} flex flex-col gap-10 py-14`}>
            <div className='flex flex-col items-center text-center'>
                <h1 className='text-[20px] font-semibold text-[#616161]'>Share your setup with</h1>
                <h1 className='text-[40px] font-bold text-[#3A3A3A]'>#FuniroFurniture</h1>
            </div>

            <div className='mx-2   flex flex-col gap-10'>
                <div className='w-[100%] mx-auto grid grid-cols-5 md:gap-4 gap-1y'>
                    {/* 1st div spanning 2 columns */}
                    <div className='relative w-full  bg-slate-500  row-span-2 overflow-hidden group'>
                        <Image
                            src={"/images/s1.png"}
                            alt='chicago'
                            fill // Replaces layout='fill'
                            style={{ objectFit: 'cover' }}
                            className='absolute inset-0'
                        />
                        {/* Overlay */}
                        <div className='absolute inset-0 bg-orange-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
                            <p className='text-white sm:text-lg text-[10px]'>Chicago, USA</p>
                            <h2 className='text-white font-bold sm:text-lg text-[10px]'>Hotel Name</h2>
                            <p className='text-white sm:text-lg text-[10px]'>Price: $100</p>
                        </div>
                    </div>

                    {/* 2nd div next to the 1st */}
                    <div className='relative w-full h-[20vw] bg-slate-500 overflow-hidden group mt-10'>
                        <Image
                            src={"/images/s2.png"}
                            alt='chicago'
                            fill // Replaces layout='fill'
                            style={{ objectFit: 'cover' }}
                            className='absolute inset-0'
                        />
                        {/* Overlay */}
                        <div className='absolute inset-0 bg-orange-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
                  
                            <p className='text-white sm:text-lg text-[10px]'>Price: $300</p>
                        </div>
                    </div>

                    {/* 3rd div spanning 2 rows */}
                    <div className='relative bg-slate-500 row-span-2 col-span-2 overflow-hidden group mt-28'>
                        <Image
                            src={"/images/s6.png"}
                            alt='dubai'
                            fill // Replaces layout='fill'
                            style={{ objectFit: 'cover' }}
                            className='absolute inset-0'
                        />
                        {/* Overlay */}
                        <div className='absolute inset-0 bg-orange-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
                    
                            <p className='text-white sm:text-lg text-[10px]'>Price: $100</p>
                        </div>
                    </div>

                    {/* 4th div filling the space below the 2nd */}
                    <div className='relative w-full  row-span-2 bg-slate-500 overflow-hidden group'>
                        <Image
                            src={"/images/s4.png"}
                            alt='dubai'
                            fill // Replaces layout='fill'
                            style={{ objectFit: 'cover' }}
                            className='absolute inset-0'
                        />
                        {/* Overlay */}
                        <div className='absolute inset-0 bg-orange-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
                            <p className='text-white sm:text-lg text-[10px]'>Price: $100</p>
                        </div>
                    </div>

                    {/* 5th div */}
                    <div className='relative w-full h-[20vw] bg-slate-500 overflow-hidden group'>
                        <Image
                            src={"/images/s7.png"}
                            alt='dubai'
                            fill // Replaces layout='fill'
                            style={{ objectFit: 'cover' }}
                            className='absolute inset-0'
                        />
                        {/* Overlay */}
                        <div className='absolute inset-0 bg-orange-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
                            <p className='text-white sm:text-lg text-[10px]'>City, Country</p>
                            <h2 className='text-white font-bold sm:text-lg text-[10px]'>Hotel Name</h2>
                            <p className='text-white sm:text-lg text-[10px]'>Price: $100</p>
                        </div>
                    </div>

                    {/* 6th div */}
                    <div className='w-full h-[20vw] bg-slate-500 col-span-2 relative overflow-hidden group'>
                        <Image
                            src={"/images/s9.png"}
                            alt='dubai'
                            fill // Replaces layout='fill'
                            style={{ objectFit: 'cover' }}
                            className='absolute inset-0'
                        />
                        {/* Overlay */}
                        <div className='absolute inset-0 bg-orange-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
                            <p className='text-white sm:text-lg text-[10px]'>Price: $100</p>
                        </div>
                    </div>

                    {/* 7th div */}
                    <div className='relative overflow-hidden w-full h-[20vw] bg-slate-500 group'>
                        <Image
                            src={"/images/s3.png"}
                            alt='dubai'
                            fill // Replaces layout='fill'
                            style={{ objectFit: 'cover' }}
                            className='absolute inset-0'
                        />
                        {/* Overlay */}
                        <div className='absolute inset-0 bg-orange-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
                            <p className='text-white sm:text-lg text-[10px]'>Price: $100</p>
                        </div>
                    </div>

                    {/* 8th div */}
                    <div className='w-full h-[20vw] bg-slate-500 relative overflow-hidden group'>
                        <Image
                            src={"/images/s7.png"}
                            alt='dubai'
                            fill // Replaces layout='fill'
                            style={{ objectFit: 'cover' }}
                            className='absolute inset-0'
                        />
                        {/* Overlay */}
                        <div className='absolute inset-0 bg-orange-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
    
                            <p className='text-white sm:text-lg text-[10px]'>Price: $100</p>
                        </div>
                    </div>

                    {/* 9th div */}
                    <div className='w-full h-[20vw] bg-slate-500 relative overflow-hidden group'>
                        <Image
                            src={"/images/s6.png"}
                            alt='dubai'
                            fill // Replaces layout='fill'
                            style={{ objectFit: 'cover' }}
                            className='absolute inset-0'
                        />
                        {/* Overlay */}
                        <div className='absolute inset-0 bg-orange-500 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
        
                            <p className='text-white sm:text-lg text-[10px]'>Price: $100</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default Furniture