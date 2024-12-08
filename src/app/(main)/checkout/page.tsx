'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { useState } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });


const CheckoutPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        companyName: '',
        streetAddress: '',
        apartment: '',
        city: '',
        phone: '',
        email: '',
        saveInfo: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillingDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBillingDetails((prev) => ({
            ...prev,
            saveInfo: e.target.checked,
        }));
    };

    const handlePlaceOrder = () => {
        // Process order logic here
        console.log('Order placed:', { cartItems, billingDetails });
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 10; // Flat shipping rate
    const total = subtotal + shipping;

    return (
        <div className={`${poppins.className} md:px-[65px] p-5 flex flex-col gap-10 md:my-10 my-5`}>

            {/* Breadcrumb */}
            <div className="flex items-end md:text-[14px] text-[10px]">
                <Link href="/" className="text-gray-500  hover:underline">Account</Link>
                <span className="mx-2 text-gray-500">/</span>
                <Link href="/" className="text-gray-500  hover:underline">My Account</Link>
                <span className="mx-2 text-gray-500">/</span>
                <Link href="/" className="text-gray-500  hover:underline">Product</Link>
                <span className="mx-2 text-gray-500">/</span>
                <Link href="/" className="text-gray-500  hover:underline">View Cart</Link>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-black">Cart</span>
            </div>


            <h2 className="text-[36px] font-medium ">Billing Details</h2>
            <div className="flex flex-col md:flex-row justify-between">
                {/* Billing Details */}
                <div className=" h-[766px] flex flex-col justify-between md:w-[470px]">
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="firstName" className="block text-[16px] text-black/50 mb-1">
                                First Name*
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={billingDetails.firstName}
                                onChange={handleInputChange}
                                className="w-full bg-[#F5F5F5] rounded p-3"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="companyName" className="block text-[16px] text-black/50 mb-1">
                                Company Name (Optional)
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={billingDetails.companyName}
                                onChange={handleInputChange}
                                className="w-full bg-[#F5F5F5] rounded p-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="streetAddress" className="block text-[16px] text-black/50 mb-1">
                                Street Address*
                            </label>
                            <input
                                type="text"
                                id="streetAddress"
                                name="streetAddress"
                                value={billingDetails.streetAddress}
                                onChange={handleInputChange}
                                className="w-full bg-[#F5F5F5] rounded p-3"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="apartment" className="block text-[16px] text-black/50 mb-1">
                                Apartment, floor, etc. (optional)
                            </label>
                            <input
                                type="text"
                                id="apartment"
                                name="apartment"
                                value={billingDetails.apartment}
                                onChange={handleInputChange}
                                className="w-full bg-[#F5F5F5] rounded p-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-[16px] text-black/50 mb-1">
                                Town/City*
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={billingDetails.city}
                                onChange={handleInputChange}
                                className="w-full bg-[#F5F5F5]  rounded p-3"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-[16px] text-black/50 mb-1">
                                Phone Number*
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={billingDetails.phone}
                                onChange={handleInputChange}
                                className="w-full   bg-[#F5F5F5] rounded p-3"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-[16px] text-black/50 mb-1">
                                Email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={billingDetails.email}
                                onChange={handleInputChange}
                                className="w-full bg-[#F5F5F5] rounded p-3"
                                required
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="saveInfo"
                                checked={billingDetails.saveInfo}
                                onChange={handleCheckboxChange}
                                className="mr-2 h-[24px] w-[24px] rounded accent-[#DB4444] checked:text-white"
                            />


                            <label htmlFor="saveInfo" className="text-[16px]">
                                Save this information for faster check-out next time
                            </label>
                        </div>
                    </form>
                </div>

                {/* Product Details */}
                <div className="md:w-[527px]">
                    <div className=" space-y-5">
                        <div className='md:w-[422px] flex flex-col gap-4'>
                            {/* Product List */}
                            <div className="py-4 flex flex-col">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center py-3">
                                        {/* Product Image */}
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={50}
                                            height={50}
                                            className="w-[50px] h-[50px] object-contain rounded"
                                        />
                                        {/* Product Details */}
                                        <div className="flex flex-col flex-1 ml-4">
                                            <span className="text-[16px]">{item.name}</span>
                                            <span className="text-[12px] text-gray-500">
                                                Quantity: {item.quantity}
                                            </span>
                                        </div>
                                        {/* Product Price */}
                                        <span className="text-[16px]">
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-[16px]">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className="bg-[#000000] opacity-[30%]  h-[1px]   w-full" />
                            <div className="flex justify-between  text-[16px]">
                                <span>Shipping</span>
                                <span>${shipping}</span>
                            </div>
                            <div className="bg-[#000000] opacity-[30%]  h-[1px]   w-full" />
                            <div className="flex justify-between   text-[16px]">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                            <div>

                                <div className="space-y-4 mt-2">
                                    <div className='flex justify-between'>
                                        <div className='flex items-center'>
                                            <input type="radio" id="bank" name="payment" value="bank" className='w-[24px] h-[24px] accent-black' />
                                            <label htmlFor="bank" className="ml-2 text-[16px]">
                                                Bank
                                            </label>
                                        </div>

                                        <div className="flex gap-[6px] items-center">
                                            <Image
                                                src="/images/pm1.png"
                                                alt="payment"
                                                width={40}
                                                height={40}
                                                className="w-[35px] h-[35px] object-contain"
                                            />
                                            <Image
                                                src="/images/pm2.png"
                                                alt="payment"
                                                width={30}
                                                height={30}
                                                className="w-[35px] h-[35px] object-contain"
                                            />
                                            <Image
                                                src="/images/pm3.png"
                                                alt="payment"
                                                width={30}
                                                height={30}
                                                className="w-[35px] h-[35px] object-contain"
                                            />
                                            <Image
                                                src="/images/pm4.png"
                                                alt="payment"
                                                width={30}
                                                height={30}
                                                className="w-[35px] h-[35px] object-contain"
                                            />
                                        </div>

                                    </div>
                                    <div className='flex items-center'>
                                        <input type="radio" id="cod" name="payment" value="cod" className='w-[24px] h-[24px] accent-black' />
                                        <label htmlFor="cod" className="ml-2 text-[16px]">
                                            Cash on delivery
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex md:flex-row flex-col md:gap-0 gap-4 justify-between">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                className="md:w-[300px] rounded p-4 border border-black/70"
                            />
                            <button className=" bg-red-500 text-white md:text-[16px] text-[10px] font-medium md:px-[48px] px-[20px] w-fit py-[16px] rounded">
                                Apply Coupon
                            </button>
                        </div>
                        <button
                            className="md:w-fit w-full bg-[#DB4444] text-white px-[48px] font-medium py-[16px] rounded mt-4"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
