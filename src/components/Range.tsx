import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });
const Range = () => {
  return (
    <div className={`${poppins.className} flex flex-col gap-10 my-14 px-5 bg-white`}>
      <div className="text-center">
        <h1 className='text-[32px] font-bold text-[#333333]'>Browse The Range</h1>
        <p className='md:text-[20px] text-[16px] font-extralight text-[#666666]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="flex md:flex-row flex-col justify-center items-center w-full mx-auto md:gap-5 gap-10">
        <div className="flex flex-col gap-5 text-center">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={"/images/r1.png"}
              alt="main 1"
              width={381}
              height={480}
              className="rounded-md transform transition-transform duration-500 hover:scale-110"
            />
          </div>
          <h1 className="text-[24px] font-semibold text-[#333333]">Dining</h1>
        </div>
        <div className="flex flex-col gap-5 text-center">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={"/images/r2.png"}
              alt="main 1"
              width={381}
              height={480}
              className="rounded-md transform transition-transform duration-500 hover:scale-110"
            />
          </div>
          <h1 className="text-[24px] font-semibold text-[#333333]">Living</h1>
        </div>
        <div className="flex flex-col gap-5 text-center">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={"/images/r3.png"}
              alt="main 1"
              width={381}
              height={480}
              className="rounded-md transform transition-transform duration-500 hover:scale-110"
            />
          </div>
          <h1 className="text-[24px] font-semibold text-[#333333]">Bedroom</h1>
        </div>
      </div>

    </div>
  )
}

export default Range