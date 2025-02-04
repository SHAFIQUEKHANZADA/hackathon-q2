'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { useState } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import PreFooter from '@/components/PreFooter';
import axios from 'axios';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });


const CheckoutPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        streetAddress: '',
        apartment: '',
        province: '',
        city: '',
        country: '',
        phone: '',
        email: '',
        saveInfo: false,
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBillingDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateBillingDetails = () => {
        const { firstName, lastName, streetAddress, city, phone, email } = billingDetails;

        if (!firstName || !lastName || !streetAddress || !city || !phone || !email) {
            alert("Please fill out all required fields.");
            return false;
        }
        return true;
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 10;
    const total = subtotal + shipping;

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    const handlePlaceOrder = async () => {
        setIsSubmitting(true);
        const lineItems = cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image[0],
        }));

        try {
            const response = await axios.post("/api/payment", {
                items: lineItems,
                billingDetails,
            });

            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error("Error placing the order", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className={`${poppins.className} flex flex-col gap-10`}>

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
                    <h1 className="md:text-[48px] text-[38px] font-medium">Checkout</h1>
                    <div className="flex items-center gap-2">
                        <Link href={"/"}>
                            <h1 className="text-[16px] font-bold">Home</h1>
                        </Link>
                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />
                        <h1 className="text-[16px] font-light">Checkout</h1>
                    </div>
                </div>
            </div>

            <div className='px-5 md:px-[44px]'>
                <h2 className="text-[36px] font-semibold my-8 md:ml-10">Billing details</h2>
                <div className="flex flex-col md:flex-row justify-between lg:px-10">
                    {/* Billing Details */}
                    <div className=" flex flex-col justify-between md:w-[470px]">
                        <form className="md:space-y-10 space-y-5">
                            <div className='flex gap-3'>
                                <div>
                                    <label htmlFor="firstName" className="block text-[16px] font-medium text-black mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={billingDetails.firstName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-400  rounded-[10px] p-3"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="firstName" className="block text-[16px] font-medium text-black mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={billingDetails.lastName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-400  rounded-[10px] p-3"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="companyName" className="block text-[16px] font-medium text-black mb-2">
                                    Company Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={billingDetails.companyName}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-400  rounded-[10px] p-3"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="country"
                                    className="block text-[16px] font-medium text-black mb-2"
                                >
                                    Country/Region
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    value={billingDetails.country}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-400 rounded-[10px] p-3 bg-white"

                                >
                                    <option value="" disabled>
                                        Select your country/region
                                    </option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="India">India</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="streetAddress" className="block text-[16px] font-medium text-black mb-2">
                                    Street Address*
                                </label>
                                <input
                                    type="text"
                                    id="streetAddress"
                                    name="streetAddress"
                                    value={billingDetails.streetAddress}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-400  rounded-[10px] p-3"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-[16px] font-medium text-black mb-2">
                                    Town/City*
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={billingDetails.city}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-400  rounded-[10px] p-3"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="province"
                                    className="block text-[16px] font-medium text-black mb-2"
                                >
                                    Province
                                </label>
                                <select
                                    id="province"
                                    name="province"
                                    value={billingDetails.province}
                                    className="w-full border border-gray-400 rounded-[10px] p-3  bg-white"
                                    required
                                >
                                    <option value="" disabled>
                                        Select your province
                                    </option>
                                    <option value="Sindh">Sindh</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Balochistan">Balochistan</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-[16px] font-medium text-black mb-2">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={billingDetails.phone}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-400  rounded-[10px] p-3"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[16px] font-medium text-black mb-2">
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={billingDetails.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-400  rounded-[10px]   p-3"
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    id="email"
                                    name="Additional Information"
                                    placeholder="Additional Information"
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-400  rounded-[10px] p-3 mt-5"
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    {/* Product Details */}
                    <div className="md:w-[628px] sm:h-[769px] md:px-10">
                        <div className=" space-y-5">
                            <div className='flex flex-col gap-4'>
                                <div className="py-4">
                                    {/* Headings */}
                                    <div className="flex justify-between items-center py-3 border-b border-gray-300">
                                        <span className="text-[24px] font-medium">Product</span>
                                        <span className="text-[24px] font-medium">Subtotal</span>
                                    </div>

                                    {/* Product List */}
                                    {cartItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center py-3 "
                                        >
                                            {/* Product Details */}
                                            <div className="flex items-center gap-4 flex-1">
                                                {/* Product Image */}
                                                <Image
                                                    src={item.image && item.image.length > 0 ? item.image[0] : "/placeholder.png"}
                                                    alt={item.name}
                                                    width={50}
                                                    height={50}
                                                    className="w-[50px] h-[50px] object-contain rounded"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-[16px] font-medium">{item.name}</span>
                                                    <span className="text-[12px] text-gray-500">Qty: {item.quantity}</span>
                                                </div>
                                            </div>

                                            {/* Product Price */}
                                            <div className="flex items-center justify-end text-right flex-1">
                                                <span className="text-[16px] font-light">${item.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Subtotal Section */}
                                    <div className="flex justify-between items-center py-3 mt-4">
                                        <span className="text-[16px] font-medium">Subtotal</span>
                                        <span className="text-[16px] font-medium">${subtotal.toFixed(2)}</span>
                                    </div>

                                    {/* Shipping Section */}
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-[16px] font-medium">Shipping</span>
                                        <span className="text-[16px] font-light">${shipping.toFixed(2)}</span>
                                    </div>

                                    {/* Total Section */}
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-[18px] font-medium">Total</span>
                                        <span className="text-[24px] font-bold text-[#DB8E2F]">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                            </div>

                            <div className="bg-[#D9D9D9] h-[1px]   mx-auto sm:my-16 my-8" />

                            <div className='flex flex-col gap-5'>
                                <div className='flex items-center'>
                                    <input type="radio" id="bank" name="payment" value="bank" className='w-[20px] h-[20px] accent-black' />
                                    <label htmlFor="bank" className="ml-2 text-[16px]">
                                        Direct Bank Transfer
                                    </label>
                                </div>
                                <h1 className='text-[#9F9F9F] text-[16px] font-light'>
                                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                </h1>

                                <div className='flex items-center'>
                                    <input type="radio" id="bank" name="payment" className='w-[20px] h-[20px] accent-[#9F9F9F]' value="credit-card" checked={paymentMethod === 'credit-card'} onChange={handlePaymentChange} />
                                    <label htmlFor="bank" className="ml-2 text-[#9F9F9F] text-[16px]">
                                        Credit Card
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <input type="radio" id="bank" name="payment" value="cod" className='w-[20px] h-[20px] accent-[#9F9F9F]' checked={paymentMethod === 'cod'}
                                        onChange={handlePaymentChange} />
                                    <label htmlFor="bank" className="ml-2 text-[#9F9F9F] text-[16px]">
                                        Cash on Delivery
                                    </label>
                                </div>

                                <h1 className='text-[16px]'>
                                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className='text-[16px] font-semibold'> privacy policy.</span>
                                </h1>
                            </div>

                            <button
                                className="md:w-[318px] flex justify-center w-full bg-transparent text-black border border-black text-[20px] px-[78px] font-medium py-[16px] rounded-[15px] mt-4"
                                onClick={() => {
                                    if (validateBillingDetails()) {
                                        handlePlaceOrder();
                                    }
                                }}
                                disabled={isSubmitting}
                            >
                                Place Order
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <PreFooter />
        </div>
    );
};

export default CheckoutPage;
