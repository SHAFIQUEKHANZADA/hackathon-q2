"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Poppins } from "next/font/google";
import { ProductType } from "@/components/types";
import { useDispatch } from "react-redux";
import { addToLikes } from "@/app/store/likedProductSlice";
import { addToCart } from "@/app/store/cartSlice";
import { BsStarFill } from "react-icons/bs";
import QuantitySelector from "@/components/Qty";
import Link from "next/link";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiGreaterThanBold } from "react-icons/pi";
import ShareButton from "@/components/Share";
import RelatedProducts from "@/components/RelatedProducts";
import Reviews from "@/components/Reviews";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

interface ProductPageProps {
    params: {
        category: string;
        subcategory: string;
        product: string;
    };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
    const { category, subcategory, product } = params;

    const [productDetails, setProductDetails] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const [selectedTab, setSelectedTab] = useState("description");
    const swiperRef = useRef<SwiperRef>(null);

    const dispatch = useDispatch();


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`/api/${category}/${subcategory}/${product}`);
                const data = await response.json();
                console.log(data)

                if (response.ok) {
                    setProductDetails(data.product);
                } else {
                    setError(data.error || "Product not found");
                }
            } catch (error) {
                console.log(error);
                setError("Failed to fetch product details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [category, subcategory, product]);

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };
    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleImageSelect = (index: number) => {
        setActiveImageIndex(index);
        swiperRef.current?.swiper?.slideTo(index);
    };

    if (loading) return <div className="h-screen w-full flex justify-center items-center skeleton-loader">
        <Image src={"/images/logo.png"} alt="logo" width={150} height={150} className="md:w-[150px] w-[100px] pt-10" />
    </div>;
    if (error) return <div>{error}</div>;
    if (!productDetails) return <div>Product not found</div>;

    const { title, price, salePrice, images, productdetails, sizes, stockStatus, averageRating, colors, overview, sku, additionalInformation, productReviews } = productDetails;

    const discountPercentage = salePrice
        ? Math.round(((price - salePrice) / price) * 100)
        : 0;

    const handleLike = (productDetails: ProductType) => {
        if (productDetails) {
            const imageUrl = productDetails.images?.[0]?.asset?.url ||
                "/default-image.png";

            const likedProduct = {
                id: productDetails.slug.current,
                name: productDetails.title,
                price: productDetails.salePrice || productDetails.price,
                quantity: 1,
                image: [imageUrl],
            };

            dispatch(addToLikes(likedProduct));
        }
    };

    const handleAddToCart = () => {
        if (productDetails) {
            const imageUrl = productDetails.images?.[0]?.asset?.url ||
                productDetails.images[0]?.asset?.url ||
                "/default-image.png";

            console.log("Generated Image URL:", imageUrl);

            const cartItem = {
                id: productDetails.slug,
                name: productDetails.title,
                price: productDetails.salePrice || productDetails.price,
                quantity: 1,
                image: [imageUrl],
            };

            dispatch(addToCart(cartItem));
        }
    };

    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <BsStarFill
                    key={i}
                    className={`text-yellow-500 ${i < rating ? 'fill-current' : ''}`}
                />
            ));
    };
    if (!productReviews || productReviews.reviews.length === 0) {
        return <p>No reviews available for this product.</p>;
    }

    return (
        <div className={`${poppins.className} product-page`}>
            <div className='md:h-[100px] h-[50px] bg-[#F9F1E7] flex items-center md:px-[70px] px-5'>
                <ul className="flex items-center space-x-1 md:space-x-3">
                    <li>
                        <Link href="/" className="text-[16px] text-black opacity-[50%]">
                            Home
                        </Link>
                    </li>
                    <li className="text-[16px] text-black"><PiGreaterThanBold /></li>
                    <li>
                        <Link href={`/${category}`} className="text-[14px] text-black opacity-[50%]">
                            {category}
                        </Link>
                    </li>
                    <li className="text-[16px] text-black"><PiGreaterThanBold /></li>
                    <li className="  text-black opacity-[50%] text-[24px] font-extralight">|</li>
                    <li className="text-black text-[16px] overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] md:max-w-full">{title}</li>
                </ul>
            </div>

            <div className="flex md:flex-row flex-col gap-10 md:p-12 p-4 mt-3 sm:mt-0">

                <div className="md:w-[52%] flex lg:gap-4 gap-2 md:sticky md:top-0 md:h-[500px]">
                    {/* Side Images */}
                    <div className="lg:flex hidden flex-col gap-3">
                        {images?.map((image, index) => {
                            const sideImageUrl = image.asset._ref
                                ? urlFor(image.asset._ref).url()
                                : image.asset.url || "/placeholder.png";

                            return (
                                <Image
                                    key={index}
                                    src={sideImageUrl}
                                    alt={image.alt || "Side image"}
                                    width={80}
                                    height={100}
                                    className={`cursor-pointer rounded-[8px] border ${activeImageIndex === index ? "border-black" : "border-gray-300"}`}
                                    onClick={() => handleImageSelect(index)}
                                />
                            );
                        })}
                    </div>

                    {/* Swiper Slider */}
                    <div className="">
                        <Swiper
                            modules={[Navigation]}
                            navigation
                            className="xl:w-[500px] md:w-[45vw] w-[91vw] h-[95vw] sm:h-[500px] md-[500px] rounded-[10px]"
                            onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
                            initialSlide={activeImageIndex}
                            ref={swiperRef}

                        >
                            {images?.map((image, index) => {
                                const swiperImageUrl = image.asset._ref
                                    ? urlFor(image.asset._ref).url()
                                    : image.asset.url || "/placeholder.png";

                                return (
                                    <SwiperSlide key={index}>
                                        <Image
                                            src={swiperImageUrl}
                                            alt={image.alt || "Main image"}
                                            width={520}
                                            height={650}
                                            className="relative xl:w-[500px] md:w-[45vw] w-[91vw] h-[95vw] sm:h-[500px] md-[500px] rounded-[10px]"
                                        />

                                        {salePrice && (
                                            <span className="bg-[#E70000] text-white p-4 py-2 text-[14px] rounded-3xl absolute top-4 right-4">{discountPercentage}% off</span>
                                        )}
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 sm:space-y-3 space-y-2">
                    <h1 className="sm:text-[42px] text-[28px]">{title}</h1>
                    <div className="flex items-center gap-4">
                        {/* Price Display */}
                        <span className="text-[20px] font-medium">Rs. {salePrice || price}</span>
                        {/* Show sale price if available */}
                        {salePrice && (
                            <>
                                <span className="line-through text-gray-500">Rs. {price}</span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {renderStars(averageRating)}
                        <div className='flex gap-3 items-center text-gray-500 text-[14px]'>
                            <span className='text-[24px] font-extralight'>|</span>
                            <span className="text-gray-500">{productReviews.totalReviews} Reviews</span>
                        </div>
                    </div>

                    <div>
                        <p>{overview}</p>
                    </div>

                    {/* Size selection UI */}
                    <div className="space-y-2">
                        <div className="sizes mt-6">
                            <h2 className="font-semibold mb-2">Size :</h2>
                            <div className="flex space-x-2">
                                {sizes && sizes.length > 0 ? (
                                    sizes.map((size, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSizeSelect(size)}
                                            className={`flex items-center justify-center text-[16px] p-3 rounded-[10px] border cursor-pointer 
                              ${selectedSize === size ? "bg-[#B88E2F] text-white" : "border-gray-300 bg-transparent"}
                              sm:text-[16px]`}
                                        >
                                            {size}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-[#9F9F9F] text-[14px]">No size available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-start gap-3">
                        <p className="font-semibold">Color :</p>
                        <div className="flex space-x-2">
                            {colors && colors.length > 0 ? (
                                colors.map((color, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleColorSelect(color)}
                                        className={`flex items-center justify-center text-[16px] p-3 rounded-[10px] border cursor-pointer 
                                        ${selectedColor === color ? "bg-[#B88E2F] text-white" : "border-gray-300 bg-transparent"}
                                         sm:text-[16px]`}
                                    >
                                        {color}
                                    </div>
                                ))
                            ) : (
                                <p className="text-[#9F9F9F] text-[14px]">No color available</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-3">
                        {stockStatus === "outOfStock" ? (
                            <div>
                                <div className="mt-2 bg-[#EDEDED] py-[14px] px-5 flex items-center">
                                    <label htmlFor="outOfStock" className="inline-flex items-center text-[12px] font-medium">
                                        <input
                                            type="radio"
                                            id="outOfStock"
                                            name="stockStatus"
                                            value="outOfStock"
                                            checked
                                            disabled
                                            className="mr-2 rounded-full w-[17px] h-[17px] appearance-none border-[3px] border-[#BABABA] checked:bg-[#000000]"
                                        />
                                        Out of stock
                                    </label>
                                </div>
                            </div>
                        ) : ("")}
                    </div>

                    <div className='flex md:flex-row flex-col gap-3 items-end pt-6'>
                        <QuantitySelector />
                        {stockStatus === "outOfStock" ? (
                            <div className="space-y-5">
                                <div className="mt-4 text-black border border-black rounded-[15px] py-2 px-4 lg:text-[20px] w-fit">
                                    Sold Out
                                </div>
                            </div>

                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="text-black hover:text-white hover:bg-[#E70000] hover:border-transparent duration-200 border border-black rounded-[15px] py-2 px-4 lg:text-[20px] w-fit">
                                    Add to Cart
                                </button>
                                <Link href={"/comparison"}>
                                    <button
                                        className="text-black hover:text-white hover:bg-[#E70000] hover:border-transparent duration-200 border border-black rounded-[15px] py-2 px-4 flex gap-4 text-center justify-center items-center lg:text-[20px] w-fit"
                                    >
                                        <span>+</span> Compare
                                    </button>
                                </Link>

                                <button
                                    onClick={() => handleLike(productDetails)}
                                    className="text-black hover:text-white hover:bg-[#E70000] hover:border-transparent duration-200 border border-black rounded-[15px] py-2 px-4 lg:text-[20px] w-fit">
                                    <IoIosHeartEmpty />
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="bg-[#D9D9D9] h-[1px]  mt-16 mb-8" />

                        <div>
                            <table className="w-fit text-[#9F9F9F] text-[16px]">
                                <tbody>
                                    <tr>
                                        <td className="font-medium pr-2">SKU</td>
                                        <td className="w-[10px] text-center px-3">:</td>
                                        <td className="text-[#9F9F9F]">{sku}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium pr-2 py-2">Category</td>
                                        <td className="w-[10px] text-center">:</td>
                                        <td className="text-[#9F9F9F]">{category}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium pr-2">Tags</td>
                                        <td className="w-[10px] text-center">:</td>
                                        <td className="text-[#9F9F9F]">{subcategory}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium pr-2 py-2">Share</td>
                                        <td className="w-[10px] text-center">:</td>
                                        <td className="text-black text-[23px] flex gap-5 items-center">
                                            <ShareButton />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="bg-[#D9D9D9] h-[1px] my-8" />

                <div className="md:px-[48px] px-5 md:space-y-12 space-y-6">
                    {/* Tabs */}
                    <div className="flex md:gap-5 gap-2 justify-center">
                        <h1
                            className={`md:text-[24px] text-[13px] font-medium cursor-pointer ${selectedTab === "description" ? "text-black" : "text-[#9F9F9F]"
                                }`}
                            onClick={() => setSelectedTab("description")}
                        >
                            Description
                        </h1>
                        <h1
                            className={`md:text-[24px] text-[13px] font-medium cursor-pointer ${selectedTab === "additionalInfo" ? "text-black" : "text-[#9F9F9F]"
                                }`}
                            onClick={() => setSelectedTab("additionalInfo")}
                        >
                            Additional Information
                        </h1>
                        <h1
                            className={`md:text-[24px] text-[13px] font-medium cursor-pointer ${selectedTab === "reviews" ? "text-black" : "text-[#9F9F9F]"
                                }`}
                            onClick={() => setSelectedTab("reviews")}
                        >
                            Reviews [{productReviews?.reviews?.length || 0}]
                        </h1>
                    </div>

                    {/* Tab Content */}
                    {selectedTab === "description" && (
                        <div className="text-[16px] text-[#9F9F9F] flex flex-col gap-3 md:w-[80%] mx-auto">
                            <h1>
                                <div className="rich-text">
                                    <PortableText value={productdetails} />
                                </div>
                            </h1>
                        </div>
                    )}

                    {selectedTab === "additionalInfo" && (
                        <div className="text-[16px] text-[#9F9F9F] md:w-[80%] mx-auto">
                            <div className="rich-text">
                                <PortableText value={additionalInformation} />
                            </div>
                        </div>
                    )}

                    {selectedTab === "reviews" && (
                        <div className="text-[16px] text-[#9F9F9F] md:w-[80%] mx-auto">
                            <div>
                                <div>
                                    {productReviews.reviews.map((review, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                marginBottom: '1rem',
                                                borderBottom: '1px solid #ccc',
                                                paddingBottom: '1rem',
                                            }}
                                            className="flex flex-col gap-3"
                                        >
                                            <div className="flex gap-2 items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="sm:w-10 sm:h-10 w-8 h-8 rounded-full"> <Image src={"/images/ava.jpg"} alt="ava" width={50} height={50} className="rounded-full" /></div>

                                                    <p className="font-semibold sm:text-[20px] text-[18px]">
                                                        {review.reviewername}
                                                    </p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <p>
                                                        {review.rating} / 5
                                                    </p>
                                                    <div style={{ marginLeft: '0.5rem', display: 'flex' }}>
                                                        {Array.from({ length: 5 }, (_, i) => (
                                                            <span
                                                                key={i}
                                                                style={{
                                                                    color: i < review.rating ? 'gold' : '#ccc',
                                                                    marginRight: '2px',
                                                                    fontSize: '1.2rem',
                                                                }}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p>
                                                <strong>Comment:</strong> {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Reviews />
                        </div>
                    )}

                    {/* Images */}
                    <div className="flex md:flex-row flex-col gap-5 justify-center items-center">
                        <div className="md:w-[605px] md:h-[348px] rounded-md">
                            <Image src={"/images/t1.png"} alt="sofa" width={605} height={348} />
                        </div>
                        <div className="md:w-[605px] md:h-[348px] rounded-md bg-[#F9F1E6]">
                            <Image src={"/images/t2.png"} alt="sofa" width={605} height={348} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#D9D9D9] h-[1px] my-8" />
            <div className="md:px-[70px] px-5">
                <RelatedProducts category={category} subcategory={subcategory} excludeSlug={product} />
            </div>
        </div>
    );
};

export default ProductPage;