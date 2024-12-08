import { Poppins } from 'next/font/google';
import Image from 'next/image';
import React from 'react';

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const PreFooter = () => {
  return (
    <div className={`${poppins.className} h-[270px] flex justify-center items-center bg-[#FAF3EA] mt-20 md:mt-10`}>

      <div className="max-w-screen-xl mx-auto md:px-0 px-5">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {/* Feature Item */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/f1.png"
              alt="High Quality"
              width={50}
              height={50}
              className="w-[50px] h-[50px] object-contain"
            />
            <div>
              <h1 className="text-[22px] font-semibold text-[#242424]">High Quality</h1>
              <p className="text-[16px] font-medium text-[#898989]">
                Crafted from top materials
              </p>
            </div>
          </div>

          {/* Feature Item */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/f2.png"
              alt="Warranty Protection"
              width={50}
              height={50}
              className="w-[50px] h-[50px] object-contain"
            />
            <div>
              <h1 className="text-[22px] font-semibold text-[#242424]">
                Warranty Protection
              </h1>
              <p className="text-[16px] font-medium text-[#898989]">Over 2 years</p>
            </div>
          </div>

          {/* Feature Item */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/f3.png"
              alt="Free Shipping"
              width={50}
              height={50}
              className="w-[50px] h-[50px] object-contain"
            />
            <div>
              <h1 className="text-[22px] font-semibold text-[#242424]">Free Shipping</h1>
              <p className="text-[16px] font-medium text-[#898989]">
                Order over $150
              </p>
            </div>
          </div>

          {/* Feature Item */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/f4.png"
              alt="24 / 7 Support"
              width={50}
              height={50}
              className="w-[50px] h-[50px] object-contain"
            />
            <div>
              <h1 className="text-[22px] font-semibold text-[#242424]">24 / 7 Support</h1>
              <p className="text-[16px] font-medium text-[#898989]">
                Dedicated support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
