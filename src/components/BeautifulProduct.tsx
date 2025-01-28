"use client"
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import TeamCarousel from './Cerocel';
import AOS from "aos";
import "aos/dist/aos.css";

const Cards = [
  {
    image: '/images/c1.png',
  },

  {

    image: '/images/c2.png',

  },
  {

    image: '/images/s4.png',

  },
];

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const BeautifulProduct = () => {
  useEffect(() => {
    AOS.init({
  
    });
  }, []);
  return (
    <div className='bg-[#FCF8F3] py-10 md:py-0 my-5'>
      <div className={`${poppins.className} md:h-[670px] lg:pl-20 md:pl-5 flex md:flex-row flex-col items-center`}>
        <div className='md:w-[422px] py-10 px-5 md:px-0'>
          <h1 className='text-[40px] font-bold text-[#3A3A3A]'>50+ Beautiful rooms
            inspiration</h1>
          <p className='text-[16px] font-medium text-[#616161]'>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
          <button className='text-[16px] font-semibold  px-[44px] py-[12px] mt-5 bg-[#B88E2F]  text-white hover:text-[#B88E2F] hover:bg-transparent border duration-300 hover:border hover:border-[#B88E2F]'>Explore More</button>
        </div>

        <div className='md:w-[404px] md:h-[582px] relative overflow-hidden'>
          <Image
            data-aos="zoom-out"
            data-aos-duration="800"
            data-aos-offset="200"
            data-aos-easing="ease-in-out"
            src={"/images/bannerTwo.png"} alt='banner' width={404} height={582} className='transform transition-transform duration-500 hover:scale-110' />
          <div className='absolute flex items-end bottom-10 left-8'>
            <div className='w-[217px] h-[130px] p-5 bg-white/60 flex flex-col justify-center items-center'>
              <h1 className='text-[16px] font-medium text-[#616161]'><span>01</span> - <span>Bed Room</span></h1>
              <h1 className='text-[28px] font-semibold text-[#3A3A3A]'>Inner Peace</h1>
            </div>
            <button className='h-[48px] w-[48px] bg-[#B88E2F] text-white flex justify-center items-center'><FaArrowRightLong /></button>
          </div>
        </div>

        <TeamCarousel Cards={Cards} />
      </div>
    </div>
  )
}

export default BeautifulProduct