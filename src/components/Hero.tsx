import { useTranslations } from 'next-intl';
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const poppins = Poppins({ subsets: ['latin'], weight: ["400"] })
const Hero = () => {
    const t = useTranslations('hero');
    return (
        <div className={`${poppins.className} relative`}>
            {/* Background Image */}
            <div className="relative w-full md:h-screen h-[80vh]">
                <Image
                    src="/images/mainBanner.png"
                    alt="Main Banner"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content Box */}
            <div className="h-[443px] md:w-[643px] w-[90vw] mx-auto flex flex-col justify-between bg-[#FFF3E3] md:p-10 p-6 rounded-[10px] ml-4 md:ml-0 absolute top-1/2 md:right-10 transform -translate-y-1/2">
                <p className="text-[16px] font-semibold text-black">{t('New Arrival')}</p>
                <h1 className="md:text-[52px] text-[39px] font-bold text-[#B88E2F]">
                {t('h11')} <br />
                {t('h12')}
                </h1>
                <p className="text-[18px] font-medium text-[#333333]">
                {t('p')}
                </p>

                <button className="text-[16px] font-bold bg-[#B88E2F] text-white px-[72px] w-fit py-[25px]">
                {t('button')}
                </button>
            </div>
        </div>
    );
};


export default Hero