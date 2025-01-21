import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });
const Range = () => {
  return (
    <div className={`${poppins.className} flex flex-col gap-10 my-14 px-5 bg-white`}>
      <div className="text-center">
        <h1 className='text-[32px] font-bold text-[#333333]'>Browse The Range</h1>
        <p className='md:text-[20px] text-[16px] font-extralight text-[#666666]'>Explore our wide selection of premium products crafted to meet your style and needs</p>
      </div>
      <div className="flex md:flex-row flex-col justify-center items-center w-full mx-auto md:gap-5 gap-10">
        <div className="flex flex-col gap-5 text-center">
          <div className="overflow-hidden rounded-lg sm:h-[60vw] md:h-[35vw] h-[440px]">
            <Image
              src={"/images/office.jpg"}
              alt="main 1"
              width={381}
              height={480}
              className="rounded-md transform transition-transform duration-500 hover:scale-110 h-full"
            />
          </div>
          <h1 className="text-[24px] font-semibold text-[#333333]">Office</h1>
        </div>
        <div className="flex flex-col gap-5 text-center">
          <div className="overflow-hidden rounded-lg sm:h-[60vw] md:h-[35vw] h-[440px]">
            <Image
              src={"/images/outdoor1.jpg"}
              alt="main 1"
              width={381}
              height={480}
              className="rounded-md transform transition-transform duration-500 hover:scale-110 h-full"
            />
          </div>
          <h1 className="text-[24px] font-semibold text-[#333333]">Outdoor</h1>
        </div>
        <div className="flex flex-col gap-5 text-center">
          <div className="overflow-hidden rounded-lg sm:h-[60vw] md:h-[35vw] h-[440px]">
            <Image
              src={"/images/r3.png"}
              alt="main 1"
              width={381}
              height={480}
              className="rounded-md transform transition-transform duration-500 hover:scale-110 h-full"
            />
          </div>
          <h1 className="text-[24px] font-semibold text-[#333333]">Bedroom</h1>
        </div>
      </div>

    </div>
  )
}

export default Range