'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { removeFromCart, updateCartQuantity } from '@/app/store/cartSlice';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import PreFooter from '@/components/PreFooter';
import { AiFillDelete } from 'react-icons/ai';
 
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const CartPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

  

    const handleQuantityChange = (id: string, quantity: number) => {
        dispatch(updateCartQuantity({ id, quantity }));
    };

    return (
        <div className={`${poppins.className} `}>
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
                    <h1 className="md:text-[48px] text-[38px] font-medium">Cart</h1>
                    <div className="flex items-center gap-2">
                        <Link href={"/"}>
                            <h1 className="text-[16px] font-bold">Home</h1>
                        </Link>
                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />
                        <h1 className="text-[16px] font-light">Cart</h1>
                    </div>
                </div>
            </div>

            <div className="flex md:flex-row flex-col justify-center md:justify-between w-full md:px-[45px] px-5 my-10 md:my-20">
                {/* Left Side (Flexible Width) */}
                <div className="flex-grow mr-5">
                    <div className="md:flex hidden flex-col items-center h-[72px] justify-center rounded shadow-sm bg-[#F9F1E7]">
                        <div className="flex justify-center items-center w-full">
                            <h1 className="text-[16px] font-medium flex-1 text-center">Product</h1>
                            <h1 className="text-[16px] font-medium flex-1 text-center">Price</h1>
                            <h1 className="text-[16px] font-medium flex-1 text-center">Quantity</h1>
                            <h1 className="text-[16px] font-medium flex-1 text-center">Subtotal</h1>
                        </div>
                    </div>

                    {cartItems.length === 0 ? (
                        <p className="text-[16px] py-10">Your cart is empty. Time to add some items!</p>
                    ) : (
                        <>
                            <ul>
                                {cartItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex md:flex-row flex-col justify-between md:p-0 p-5 md:items-center items-start my-5  md:px-14"
                                    >
                                        <div className="flex items-center flex-1 relative lg:w-[105px] md:h-[105px] w-[160px] h-full mr-4 gap-3">
                                            {/* Make the container `relative` */}
                                            <div className="">
                                                <Image
                                                    src={item.image && item.image.length > 0 ? item.image[0] : "/placeholder.png"}
                                                    alt={item.name}
                                                    width={100}
                                                    height={100}
                                                    className=" rounded-lg object-cover mr-4"
                                                />

                                            </div>
                                            <div>
                                                <h2 className="font-medium">{item.name}</h2>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex justify-between md:gap-0 gap-10 items-center">
                                            <span className="text-[16px] md:hidden block">Price:</span>{" "}
                                            <p className="flex-1 text-center">${item.price}</p>
                                        </div>
                                        <div className="flex-1 text-center flex justify-center md:ml-10">
                                            <div className="flex md:gap-0 gap-10 items-center">
                                                <span className="text-[16px] md:hidden block">Quantity:</span>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(item.id, Number(e.target.value))
                                                    }
                                                    className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 flex justify-between md:gap-0 gap-10 items-center">
                                            <span className="text-[16px] md:hidden block">Subtotal:</span>{" "}
                                            <p className="flex-1 text-end">
                                                ${item.price * item.quantity}
                                            </p>

                                            <button
                                            className="mx-5 md:hidden block text-[#B88E2F]"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            <AiFillDelete className='text-[20px]' />
                                        </button>
                                        </div>

                                        <button
                                            className="mx-5 md:block hidden text-[#B88E2F]"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            <AiFillDelete className='text-[20px]' />
                                        </button>
                                    </li>

                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Right Side (Fixed Width) */}
                <div className="h-[390px] sm:w-[393px] bg-[#F9F1E7] rounded p-6 flex flex-col justify-between">
                    <h1 className="text-[32px] font-semibold text-center">Cart Totals</h1>
                    {/* Subtotal */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-[16px] font-medium">Subtotal</h2>
                        <p className="text-[16px] font-medium text-[#9F9F9F]">
                            ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                        </p>
                    </div>
                    <div className="bg-[#000000] opacity-[30%] h-[1px] w-full" />
                    {/* Shipping */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-[16px] font-medium">Shipping:</h2>
                        <p className="text-[16px] font-medium">Free</p>
                    </div>
                    <div className="bg-[#000000] opacity-[30%] h-[1px] w-full" />
                    {/* Total */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-[16px] font-medium">Total:</h2>
                        <p className="text-[16px] font-medium text-[#B88E2F]">
                            ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Link href="/checkout">
                            <button className="bg-transparent text-black rounded-[15px] border border-black text-[18px] font-medium px-[48px] py-[12px]">
                                Check Out
                            </button>
                        </Link>
                    </div>
                </div>
            </div>


            <PreFooter />

        </div>
    );
};

export default CartPage;
