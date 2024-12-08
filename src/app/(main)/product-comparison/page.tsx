import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const ComparePage = () => {
    // Sample data for comparison (replace with dynamic data as needed)
    const products = [
        {
            id: 1,
            name: 'Product A',
            image: '/images/s5.png',
            general: 'General description of Product A',
            productDetails: 'Details about Product A',
            dimensions: '10x5x2 inches',
            warranty: '1 year',
        },
        {
            id: 2,
            name: 'Product B',
            image: '/images/s9.png',
            general: 'General description of Product B',
            productDetails: 'Details about Product B',
            dimensions: '12x6x3 inches',
            warranty: '2 years',
        }
    ];

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
                    <h1 className="md:text-[48px] text-[30px] font-medium">Product Comparison</h1>
                    <div className="flex items-center gap-2">
                        <Link href={"/"}>
                            <h1 className="text-[16px] font-bold">Home</h1>
                        </Link>
                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />
                        <h1 className="text-[16px] font-light">Comparison</h1>
                    </div>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col md:px-10 gap-10 mt-10">
                <div className="flex-1">
                    <h1 className="text-[28px]">Go to Product page for more
                        Products</h1>

                    <button className="text-[#727272] text-[20px] underline underline-offset-8">View More</button>
                </div>
                <div className="flex-1">
                    <div className="mb-5">
                        <div className="flex items-center gap-4">
                            {products.map(product => (
                                <div key={product.id} className="flex flex-col items-center w-[250px] md:h-[330px] overflow-hidden">
                                    <div className="md:w-[285px] h-[145px]">
                                        <Image
                                            src={product.image}
                                            alt={"main"}
                                            width={300}
                                            height={200}
                                            className="object-cover h-[165px] rounded-md"
                                        />
                                    </div>
                                    <h3 className="text-center text-[18px] font-medium mt-10">{product.name}</h3>

                                    <p className="text-center text-[16px]">{product.general}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="mt-10">
                        {/* Select Dropdown for Adding Products */}
                        <div className="mb-5">
                            <h2 className="text-[24px] font-semibold">Add a Product</h2>
                            <select className="border px-4 py-2 w-full bg-[#B88E2F] text-white">
                                <option value="" disabled selected>
                                    Select a product
                                </option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                </div>


            </div>
            {/* Comparison Sections */}
            <div className="md:w-[75%] md:px-[44px] px-4">
                <div className="mb-5">
                    <h2 className="text-[24px] font-semibold">Product Details</h2>
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-2">Attribute</th>
                                <th className="px-4 py-2">Product A</th>
                                <th className="px-4 py-2">Product B</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Details</td>
                                <td className="border px-4 py-2">{products[0].productDetails}</td>
                                <td className="border px-4 py-2">{products[1].productDetails}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mb-5">
                    <h2 className="text-[24px] font-semibold">Dimensions</h2>
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-2">Attribute</th>
                                <th className="px-4 py-2">Product A</th>
                                <th className="px-4 py-2">Product B</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Size</td>
                                <td className="border px-4 py-2">{products[0].dimensions}</td>
                                <td className="border px-4 py-2">{products[1].dimensions}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mb-5">
                    <h2 className="text-[24px] font-semibold">Warranty</h2>
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-2">Attribute</th>
                                <th className="px-4 py-2">Product A</th>
                                <th className="px-4 py-2">Product B</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Warranty</td>
                                <td className="border px-4 py-2">{products[0].warranty}</td>
                                <td className="border px-4 py-2">{products[1].warranty}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mb-5">
                    <h2 className="text-[24px] font-semibold">Price</h2>
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-2">Attribute</th>
                                <th className="px-4 py-2">Product A</th>
                                <th className="px-4 py-2">Product B</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Price</td>
                                <td className="border px-4 py-2">1000</td>
                                <td className="border px-4 py-2">2000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2 className="text-[24px] font-semibold">Features</h2>
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-2">Attribute</th>
                                <th className="px-4 py-2">Product A</th>
                                <th className="px-4 py-2">Product B</th>
                            </tr>
                        </thead>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default ComparePage;
