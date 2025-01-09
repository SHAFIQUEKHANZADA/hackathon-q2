"use client";

import { addToCart } from '@/app/store/cartSlice';
import { Products } from '@/components/productArray';
import QuantitySelector from '@/components/Qty';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsStarFill } from 'react-icons/bs';
import { FaFacebook, FaLinkedin } from 'react-icons/fa6';
import { PiGreaterThanBold } from 'react-icons/pi';
import { shuffle } from 'lodash';  
import { useDispatch } from 'react-redux';
import { IoMdHeartEmpty, IoMdShare } from 'react-icons/io';
import { FaExchangeAlt } from 'react-icons/fa';

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const ProductPage = ({ params }: { params: { product: string }; }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const product = Products.find((p) => p.slug === params.product);

    if (!product) {
        return <div>Product not found.</div>;
    }

    const handleAddToCartAndRedirect = () => {
        if (product) {
            dispatch(
                addToCart({
                    id: product.id.toString(),
                    name: product.title,
                    price: product.originalPrice,
                    image: product.image,
                    quantity: 1,
                })
            );

            // Navigate to cart page
            router.push('/cart');
        } else {
            // Handle the case where the product is undefined
            console.error('Product not found or undefined.');
            alert('Product not found.');
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



    // Filter related products, shuffle, and pick 4 random ones
    const relatedProducts = shuffle(
        Products.filter((p) => p.category === product.category && p.slug !== product.slug)
    ).slice(0, 4); 


    return (
        <div className={`${poppins.className} flex flex-col gap-5 md:mt-0 mt-10`}>
            <div className='md:h-[100px] h-[50px] bg-[#F9F1E7] flex items-center md:px-[70px] px-5'>
                <ul className="flex items-center space-x-1 md:space-x-3">
                    <li>
                        <Link href="/" className="text-[16px] text-black opacity-[50%]">
                            Home
                        </Link>
                    </li>
                    <li className="text-[16px] text-black"><PiGreaterThanBold /></li>
                    <li>
                        <Link href="/product" className="text-[14px] text-black opacity-[50%]">
                            Shop
                        </Link>
                    </li>
                    <li className="text-[16px] text-black "><PiGreaterThanBold /></li>
                    <li className="  text-black opacity-[50%] text-[24px] font-extralight">|</li>
                    <li className="text-black text-[16px]">{product.title}</li>
                </ul>
            </div>

            <div className="flex flex-col md:flex-row md:gap-36 gap-10 justify-evenly md:mt-16 mt-5 md:px-[70px] px-5 ">
                <div className='sm:w-[500px] sm:h-[600px] md:ml-5 ml-0'>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={500}
                        height={600}
                        className="rounded"
                    />
                </div>
                <div className="flex flex-col justify-between sm:w-[630px] md:h-[650px] gap-[10px] md:gap-0">
                    <h1 className="text-[42px]">{product.title}</h1>
                    <p className="text-[24px] text-[#9F9F9F]">Rs. {product.originalPrice}</p>
                    <div className="flex items-center gap-2">
                        {renderStars(product.rating)}
                        <div className='flex gap-3 items-center text-gray-500 text-[14px]'>
                            <span className='text-[24px] font-extralight'>|</span>
                            <span className="text-gray-500">{product.ratedBy} Customer Review</span>
                        </div>
                    </div>

                    <p className="md:w-[424px] text-[13px]">{product.description}</p>


                    <div className="flex flex-col justify-start gap-3">
                        <p className='text-[14px] text-[#9F9F9F]'>Size</p>
                        <div className="flex flex-wrap space-x-4">
                            {product.size.map((size, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-300 text-[14px] rounded p-2 h-[32px] w-[32px] flex justify-center items-center cursor-pointer hover:bg-[#B88E2F] hover:text-white"
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-start gap-3">
                        <p className="text-[14px] text-[#9F9F9F]">Color</p>
                        <div className="flex space-x-4">
                            {product.color.map((color, index) => (
                                <div
                                    key={index}
                                    className={`w-6 h-6 rounded-full border border-gray-300 cursor-pointer ${color.toLowerCase()}`}
                                    style={{ backgroundColor: color.toLowerCase() }}
                                />
                            ))}
                        </div>
                    </div>



                    <div className='flex md:flex-row flex-col gap-3 md:items-center'>
                        <QuantitySelector />
                        <button
                            onClick={handleAddToCartAndRedirect}
                            className="mt-4 text-black border border-black rounded-[15px] py-2 px-4 text-[20px] w-full md:w-fit"
                        >
                            Add to Cart
                        </button>

                        <Link href={"/product-comparison"}>
                        <button
                            className="mt-4 text-black border border-black rounded-[15px] py-2 px-4 flex gap-4 text-center justify-center items-center text-[20px] w-full md:w-fit"
                        >
                            <span>+</span> Compare
                        </button>
                        </Link>

                    </div>

                    <div className="bg-[#D9D9D9] h-[1px] my-8" />

                    <div className="flex flex-col gap-4 text-[#9F9F9F] text-[16px]">
                        <div className="flex items-center">
                            <span className="font-medium w-[150px]">SKU</span>
                            <span className="w-[10px] text-center">:</span>
                            <span className="text-[#9F9F9F] text-[16px]">SS001</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium w-[150px]">Category</span>
                            <span className="w-[10px] text-center">:</span>
                            <span className="text-[#9F9F9F] text-[16px]">{product.slogn}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium w-[150px]">Tags</span>
                            <span className="w-[10px] text-center">:</span>
                            <span className="text-[#9F9F9F] text-[16px]">{product.slogn}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium w-[150px]">Share</span>
                            <span className="w-[10px] text-center">:</span>
                            <span className="text-black text-[23px] flex gap-5 items-center">
                                <FaFacebook />
                                <FaLinkedin />
                                <AiFillTwitterCircle />
                            </span>
                        </div>
                    </div>


                </div>
            </div>

            <div className="bg-[#D9D9D9] h-[1px] my-8" />

            <div className='md:px-[48px] px-5 md:space-y-12 space-y-6'>
                <div className='flex md:gap-5 gap-2 justify-center'>
                    <h1 className='md:text-[24px] text-[13px] font-medium text-black'>Description</h1>
                    <h1 className='md:text-[24px] text-[13px] font-medium text-[#9F9F9F]'>Additional Information</h1>
                    <h1 className='md:text-[24px] text-[13px] font-medium text-[#9F9F9F]'>Reviews [5]</h1>
                </div>

                <div className='text-[16px] text-[#9F9F9F] flex flex-col gap-3 md:w-[80%] mx-auto'>
                    <h1>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</h1>
                    <h1>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</h1>
                </div>

                <div className='flex md:flex-row flex-col gap-5 justify-center items-center'>
                    <div className='md:w-[605px] md:h-[348px] rounded-md'>
                        <Image src={"/images/t1.png"} alt='sofa' width={605} height={348} />
                    </div>
                    <div className='md:w-[605px] md:h-[348px] rounded-md bg-[#F9F1E6]'>
                        <Image src={"/images/t2.png"} alt='sofa' width={605} height={348} />
                    </div>
                </div>

            </div>

            <div className="bg-[#D9D9D9] h-[1px] my-8" />
            {/* Related Products */}
            <div className="related-products-section py-5">
                <h2 className="text-[24px] font-bold text-[#3A3A3A] mb-6 text-center flex justify-center">Related Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:px-[45px] px-5">
                    {relatedProducts.map((relatedProduct) => (
                        <Link key={relatedProduct.id} href={`/product/${relatedProduct.slug}`} passHref>
                            <div className="relative bg-[#F4F5F7] flex flex-col justify-between md:w-[285px] md:h-[446px] h-[340px] group">
                                {/* New Arrival Badge */}
                                {relatedProduct.newArrival && (
                                    <div className="absolute top-4 right-4 h-[48px] w-[48px] bg-[#2EC1AC] flex justify-center items-center text-white text-[16px] font-medium px-2 py-1 rounded-full">
                                        New
                                    </div>
                                )}

                                {/* Product Image */}
                                <div className="md:w-[285px] h-[145px]">
                                    <Image
                                        src={relatedProduct.image}
                                        alt={relatedProduct.title}
                                        width={300}
                                        height={200}
                                        className="object-cover"
                                    />
                                </div>

                                <div className="md:my-4 my-1 px-4">
                                    {/* Product Title */}
                                    <h1 className="text-[#3A3A3A] font-semibold text-[24px] mb-2">
                                        {relatedProduct.title}
                                    </h1>

                                    {/* Product Slogan */}
                                    <p className="text-[#898989] font-medium text-[16px]">
                                        {relatedProduct.slogn}
                                    </p>

                                    {/* Product Price */}
                                    <div className="flex md:flex-row flex-col md:items-center gap-2 mt-4">
                                        {relatedProduct.salePrice > 0 ? (
                                            <>
                                                <span className="text-[#3A3A3A] font-semibold text-[20px]">
                                                    ${relatedProduct.salePrice.toFixed(2)}
                                                </span>
                                                <span className="line-through text-[#B0B0B0] text-[16px]">
                                                    ${relatedProduct.originalPrice.toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-[#3A3A3A] font-semibold text-[20px]">
                                                ${relatedProduct.originalPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* "Add to Cart" Button on Hover */}
                                <div className="absolute  md:flex hidden flex-col space-y-4 justify-center items-center bg-black/50 md:w-[285px] h-[446px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="bg-white text-[#C19C49] w-[202px] h-[48px]">Add to Cart</button>
                                    <div className="flex items-center gap-3 text-white text-[16px] font-medium">
                                        <span className="flex items-center gap-1"><IoMdShare /> Share</span>
                                        <span className="flex items-center gap-1"><FaExchangeAlt /> Compare</span>
                                        <span className="flex items-center gap-1"><IoMdHeartEmpty /> Like</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ProductPage;
