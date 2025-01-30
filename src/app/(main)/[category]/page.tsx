"use client"
import Filter from '@/components/Filter'
import PreFooter from '@/components/PreFooter'
import { ProductType } from '@/components/types'
import { urlFor } from '@/sanity/lib/image'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import { IoMdHeartEmpty, IoMdShare } from 'react-icons/io'
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import Pagination from '@/components/Pagination'

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });


const Category = ({ params }: { params: { category: string } }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();
  const category = pathname.split("/").pop();
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState<string>('default');

  console.log(sortOption)

  const itemsPerPage = 4;

  const [view, setView] = useState<'grid' | 'list'>('grid');
  console.log(view)

  const handleAddToCart = (product: ProductType) => {
    if (product) {
      const imageUrl = product.images?.[0]?.asset?.url ||
        "/default-image.png";

      console.log("Generated Image URL:", imageUrl);

      const cartItem = {
        id: product.slug.current,
        name: product.title,
        price: product.salePrice || product.price,
        quantity: 1,
        image: [imageUrl],
      };

      dispatch(addToCart(cartItem));
    }
  };

  const handleViewChange = (viewType: 'grid' | 'list') => {
    console.log('View changed to:', viewType);
    setView(viewType);
  };


  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/${category}`);
        const data = await res.json();

        if (data.products) {
          setProducts(data.products);
        } else {
          setError(data.error || "Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
        setError("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const sortedProducts = [...products];
    switch (value) {
      case 'name':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name2':
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'high':
        sortedProducts.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'low':
        sortedProducts.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`${poppins.className}`}>
      {/* Main Banner */}
      <div className="relative">
        <div className="w-full">
          <Image
            src="/images/bgmain.png"
            alt="Main Banner"
            width={1920}
            height={1080}
            className="w-full h-[150px] md:h-auto object-cover"
          />
        </div>
        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image
            src={"/images/logo.png"}
            alt="Main Logo"
            width={100}
            height={22}
            className="w-[48px] h-[30px]"
          />
          <h1 className="md:text-[48px] text-[38px] font-medium">Category</h1>
          <div className="flex items-center gap-2">
            <Link href={"/"}>
              <h1 className="text-[16px] font-bold">Home</h1>
            </Link>
            <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />
            <h1 className="text-[16px] font-light">{params.category}</h1>
          </div>
        </div>
      </div>

      <Filter
        currentPage={1}
        itemsPerPage={itemsPerPage}
        totalItems={products.length}
        onViewChange={handleViewChange}
        onItemsPerPageChange={(value) => console.log('Items per page:', value)}
        onSortChange={handleSortChange}
      />

      <div className="w-full sm:mt-20 mt-10 px-5">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-4 lg:px-[45px] w-full">
            {Array(8).fill(null).map((_, index) => (
              <div key={index} className="lg:w-[285px] lg:h-[446px] md:h-[36vw] h-[67vw] flex flex-col bg-white overflow-hidden group relative animate-pulse">
                {/* Product Image Loader */}
                <div className="relative lg:w-[285px] h-[75%] w-full overflow-hidden">
                  <div className="bg-gray-200 animate-pulse w-full h-full absolute flex justify-center items-center">
                    <div>
                      <Image
                        src={"/images/logo.png"}
                        alt="logo"
                        width={100}
                        height={100}
                        className="sm:w-[60px] w-[50px] h-full"
                      />
                    </div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-4 lg:px-[45px]">
            {displayedProducts.map((product, id) => (
              <Link key={id} href={`/${product.category}/${product.subcategory}/${product.slug.current}`}>
                <div className="relative bg-[#F4F5F7] flex flex-col justify-between lg:w-[285px] lg:h-[446px] md:h-[36vw] h-[67vw] group">
                  <div className="relative lg:w-[285px] h-[75%]">
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
                    {product.specialTag && product.specialTag.includes("newarrival") && (
                      <div className="absolute sm:top-4 top-2 sm:right-4 right-2 sm:h-[48px] sm:w-[48px] h-[37px] w-[37px] bg-[#2EC1AC] flex justify-center items-center text-white sm:text-[12px] text-[9px] font-medium px-2 py-1 rounded-full">
                        New
                      </div>
                    )}
                    {product.salePrice && product.price && (
                      <span className="absolute sm:top-4 top-2 sm:right-4 right-2 sm:h-[48px] sm:w-[48px] h-[37px] w-[37px] sm:text-[12px] text-[9px] bg-[#E97171] flex justify-center items-center text-white font-medium px-2 py-1 rounded-full">
                        Sale -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="md:my-4 my-3 sm:px-4 px-2">
                    <h1 className="text-[#3A3A3A] font-semibold lg:text-[20px] sm:text-[16px] text-[2.9vw] lg:mb-2 line-clamp-2">{product.title}</h1>
                    <div className="flex flex-row-reverse justify-end items-center lg:gap-2 gap-1 lg:mt-4 text-[11px] lg:text-[16px]">
                      {product.salePrice ? (
                        <>
                          <span className="line-through text-[#B0B0B0] font-light text-[11px] lg:text-[16px]">
                            ${product.price.toFixed(2)}
                          </span>{" "}
                          <br />
                          <span className="text-[11px] lg:text-[16px]">${product.salePrice.toFixed(2)}</span>
                        </>
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </div>
                  </div>
                  <div className="absolute sm:flex hidden flex-col space-y-4 justify-center items-center bg-black/50 lg:w-[285px] w-full h-full lg:h-[446px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => handleAddToCart(product)} className="bg-white text-[#C19C49] lg:w-[202px] lg:px-0 px-2 h-[48px]">
                      Add to Cart
                    </button>
                    <div className="flex lg:flex-row flex-col items-center lg:gap-3 md:gap-1 gap-3 text-white text-[16px] font-medium">
                      <span className="flex items-center gap-1"><IoMdShare /> Share</span>
                      <span className="flex items-center gap-1"><FaExchangeAlt /> Compare</span>
                      <span className="flex items-center gap-1"><IoMdHeartEmpty /> Like</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Pagination
            currentPage={currentPage}
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />

      <PreFooter />
    </div>
  )
}

export default Category
