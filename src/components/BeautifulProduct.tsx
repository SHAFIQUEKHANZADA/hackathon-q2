import { Poppins } from 'next/font/google';
import Image from 'next/image';
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });
const BeautifulProduct = () => {
  return (
    <div className={`${poppins.className} h-[670px]`}>
         <div>
            <h1 className='text-[40px] font-bold text-[#3A3A3A]'>50+ Beautiful rooms 
            inspiration</h1>
            <p className='text-[16px] font-medium text-[#616161]'>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
            <button className='text-[16px] font-semibold w-[104px] h-[14px] bg-[#B88E2F] text-white'>Explore More</button>
         </div>

         <div className='w-[404px] h-[582px] flex relative'>
          <Image src={"/images/bannerTwo.png"} alt='banner' width={404} height={582} />
          <div className='absolute flex items-end'>
               <div className='w-[217px] h-[130px] p-10'>
                    <h1><span>01</span> - <span>Bed Room</span></h1>
                    <h1>Inner Peace</h1>
               </div>
               <button className='h-[48px] w-[48px] bg-[#B88E2F] text-white'><FaArrowRightLong /></button>
            </div> 
         </div>
    </div>
  )
}

export default BeautifulProduct