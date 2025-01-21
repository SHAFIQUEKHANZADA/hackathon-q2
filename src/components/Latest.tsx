"use client";

import { Poppins } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import { ProductType } from "./types";
import { urlFor } from "@/sanity/lib/image";
import { FaExchangeAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
import { IoMdHeartEmpty, IoMdShare } from "react-icons/io";
import { useRouter } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const Latest = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("newarrival");
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // const [windowWidth, setWindowWidth] = useState<number | null>(null);  
  const router = useRouter();

  const handleShowMore = () => {
    if (selectedTag) {
      router.push(`/${selectedTag}`);  
    }
  };

  console.log(activeIndex)

  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Initial window size check
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine how many items to show based on the window width
  const itemsToShow = windowWidth >= 738 ? 4 : windowWidth >= 640 ? 3 : 2;

  useEffect(() => {
    async function fetchFilteredProducts() {
      console.log(`Fetching products for tag: ${selectedTag}`);
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/latest?specialTag=${selectedTag}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("API Response:", data);

        if (!data.products || !Array.isArray(data.products)) {
          throw new Error("Invalid API response: Missing 'products' field");
        }

        setProducts(data.products);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchFilteredProducts();
  }, [selectedTag]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const headings = [
    { tag: "newarrival", label: "New Arrival" },
    { tag: "bestSeller", label: "Best Seller" },
    { tag: "featured", label: "Featured" },
    { tag: "specialoffer", label: "Special Offer" },
  ];

  return (
    <div className={`${poppins.className} bg-white my-6`}>
      <div className="flex flex-col items-center gap-3 py-7">
        {/* Main Heading */}
        <h1 className="text-[42px] text-center font-bold text-[#3A3A3A]">
          Latest Products
        </h1>
        {/* Sub Headings */}
        <div className="flex md:text-[18px] text-[14px] items-center md:gap-10 gap-3">
          {headings.map(({ tag, label }) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`sm:px-4 py-2  ${selectedTag === tag
                ? "text-[#B88E2F] underline"
                : "bg-white text-[#3A3A3A]"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="xl:px-16 px-4 pt-12 flex flex-row items-center justify-center relative">
        {loading ? (
           <div className="flex gap-2 justify-center">
           {([...Array(itemsToShow)]).map((_, index) => (
             <div
               key={index}
               className="mb-10 lg:w-[22vw] lg:h-[456px] md:h-[36vw] h-[70vw] sm:h-[40vw] flex flex-col bg-white overflow-hidden group relative animate-pulse"
             >
               {/* Product Image Loader */}
               <div className="relative h-[300px] w-full overflow-hidden">
                 <div className="bg-gray-200 animate-pulse w-full h-full absolute flex justify-center items-center">
                  <div><Image src={"/images/logo.png"} alt="logo" width={100} height={100} className="sm:w-[60px] w-[50px] h-full"/></div>
                 </div>
               </div>
     
               {/* Product Details Loader */}
               <div className="flex flex-col py-2 gap-3">
                 <div className="bg-gray-200 w-full h-4 animate-pulse"></div>
                 <div className="bg-gray-200 w-[80%] h-4 animate-pulse"></div>
               </div>
             </div>
           ))}
         </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => swiperRef.current = swiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="carousel__wrapper"
            breakpoints={{
              740: {
                slidesPerView: 4,
              },
              640: {
                slidesPerView: 3,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.slug.current}>
                <Link href={`/${product.category}/${product.subcategory}/${product.slug.current}`}>
                  <div className="lg:w-[22vw] lg:h-[456px] md:h-[36vw] h-[70vw] sm:h-[40vw] mb-10 flex flex-col bg-[#F4F5F7] overflow-hidden group relative">
                    {/* Product Image */}
                    <div className="relative h-[77%] w-full overflow-hidden">
                      {product.images.length > 0 && (
                        <Image
                          src={urlFor(product.images[0]).url()}
                          alt={product.title}
                          width={300}
                          height={300}
                          className="object-cover w-full h-full absolute"
                        />
                      )}
                      {product.images.length > 1 && (
                        <Image
                          src={urlFor(product.images[1]).url()}
                          alt={product.title}
                          width={300}
                          height={300}
                          className="object-cover opacity-0 group-hover:opacity-100 w-full absolute duration-500 h-full"
                        />
                      )}
                      {product.salePrice && product.price && (
                        <span className="absolute top-4 right-4 sm:h-[48px] sm:w-[48px] h-[37px] w-[37px] sm:text-[12px] text-[9px] bg-[#E97171] flex justify-center items-center text-white font-medium px-2 py-1 rounded-full">
                          Sale -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col px-3 py-2 gap-3">
                      <h2 className="text-[#3A3A3A] font-semibold overflow-hidden whitespace-nowrap text-ellipsis text-[14px] sm:text-[18px]">
                        {product.title}
                      </h2>
                      <p className="text-[#3A3A3A] font-semibold text-[14px] sm:text-[18px] flex flex-row-reverse items-center justify-end gap-2">
                        {product.salePrice ? (
                          <>
                            <span className="line-through text-[#B0B0B0] font-light text-[11px] sm:text-[16px]">
                              ${product.price.toFixed(2)}
                            </span>{" "}
                            <br />
                            <span>${product.salePrice.toFixed(2)}</span>
                          </>
                        ) : (
                          `$${product.price.toFixed(2)}`
                        )}
                      </p>
                    </div>

                    <div className="absolute flex flex-col space-y-4 justify-center items-center bg-black/50 w-full h-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="bg-white text-[#C19C49] md:w-[202px] md:px-0 px-[8vw] h-[48px]"
                      >
                        Add to Cart
                      </button>
                      <div className="flex md:flex-row flex-col items-center gap-3 text-white text-[16px] font-medium">
                        <span className="flex items-center gap-1"><IoMdShare /> Share</span>
                        <span className="flex items-center gap-1"><FaExchangeAlt /> Compare</span>
                        <span className="flex items-center gap-1"><IoMdHeartEmpty /> Like</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="flex justify-center py-10">
        <button
          onClick={handleShowMore}
          className="bg-white text-[#B88E2F] border border-[#B88E2F] hover:border-transparent hover:bg-[#B88E2F] hover:text-white duration-300 text-[16px] font-semibold px-[44px] py-[12px]">
          Show More
        </button>
      </div>
    </div>
  );
};

export default Latest;
