"use client";
import { addToCart } from '@/app/store/cartSlice';
import { Products } from '@/components/productArray';
import QuantitySelector from '@/components/Qty';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsStarFill } from 'react-icons/bs';
 
import { useDispatch } from 'react-redux';

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const ProductPage = ({ params }: { params: { slug: string }; }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const product = Products.find((p) => p.slug === params.slug);

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

    const relatedProductsFromProducts = Products.filter(
        (p) => p === product && p.slug !== product.slug
    ).slice(0, 4); // First 4 related products from products

    const relatedProductsFromBestSelling = Products.filter(
        (p) => p === product && p.slug !== product.slug
    ).slice(0, 3); // First 4 related products from bestSelling

    // Combine the related products from both arrays
    const relatedProducts = [...relatedProductsFromProducts, ...relatedProductsFromBestSelling];

    return (
        <div className={`${poppins.className} md:px-[70px] px-5 md:my-10 my-6 flex flex-col gap-5`}>
            <div>
                <ul className="flex items-center space-x-1 md:space-x-3">
                    <li>
                        <Link href="/" className="text-[14px] text-black opacity-[50%]">
                            Home
                        </Link>
                    </li>
                    <li className="text-[14px] text-black opacity-[50%]">/</li>
                    <li>
                        <Link href="/products" className="text-[14px] text-black opacity-[50%]">
                            Product
                        </Link>
                    </li>
                    <li className="text-[14px] text-black opacity-[50%]">/</li>
                    <li className="text-black text-[14px]">{product.title}</li>
                </ul>
            </div>

            <div className="flex flex-col md:flex-row md:gap-0 gap-10 justify-evenly md:mt-16 mt-5">
                <div className='sm:w-[500px] sm:h-[600px]'>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={500}
                        height={600}
                        className="rounded"
                    />
                </div>
                <div className="flex flex-col justify-between sm:w-[399px] md:h-[650px] gap-[10px] md:gap-0">
                    <h1 className="text-2xl font-semibold">{product.title}</h1>
                    <p className="text-gray-600">{product.slogn}</p>
                    <div className="flex items-center gap-2">
                        {renderStars(product.rating)}
                        <div className='flex gap-3 text-gray-500 text-[14px]'>
                            <span className="text-gray-500">({product.ratedBy} Reviews)</span> |
                            <span className='text-gray-500 opacity-[60%] text-[14px]'>In stock</span>
                        </div>
                    </div>
                    <p className="text-[24px]">${product.originalPrice}</p>
                    <p className="text-gray-600">{product.description}</p>

                    {/* Quantity Selector */}
                    <QuantitySelector />

                    <button
                        onClick={handleAddToCartAndRedirect}
                        className="mt-4 bg-black text-white py-2 px-4 rounded"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Related Products */}
            <div className="md:px-5 px-0">
                <h3 className="text-xl font-semibold mb-5">Related Products</h3>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                    {relatedProducts.map((relatedProduct) => (
                        <div key={relatedProduct.id} className="flex flex-col items-center">
                            <Image
                                src={relatedProduct.image}
                                alt={relatedProduct.title}
                                width={150}
                                height={200}
                                className="rounded"
                            />
                            <h4 className="mt-2 text-center">{relatedProduct.title}</h4>
                            <p className="text-gray-600">${relatedProduct.originalPrice}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
