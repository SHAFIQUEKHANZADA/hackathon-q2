'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { removeFromCart, clearCart, updateCartQuantity } from '@/app/store/cartSlice';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';


const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const CartPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        dispatch(updateCartQuantity({ id, quantity }));
    };

    return (
        <div className={`${poppins.className} md:px-[65px] p-5`}>
            {/* Breadcrumb */}
            <div className=" ">
                <Link href="/" className="text-gray-500 font-medium hover:underline">
                    Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-black">Cart</span>
            </div>

            <div className='md:flex hidden flex-col items-center h-[72px] justify-center rounded shadow-sm border border-gray-200 my-10'>
                <div className='flex justify-center items-center w-full'>
                    <h1 className='text-[16px] flex-1 text-center'>Product</h1>
                    <h1 className='text-[16px] flex-1 text-center'>Price</h1>
                    <h1 className='text-[16px] flex-1 text-center'>Quantity</h1>
                    <h1 className='text-[16px] flex-1 text-center'>Subtotal</h1>
                </div>
            </div>

            {cartItems.length === 0 ? (
                <p className='text-[16px] py-10'>Your cart is empty. Time to add some items!</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex md:flex-row flex-col justify-between md:p-0 p-5  md:items-center items-start my-5 md:h-[72px] md:px-24 rounded shadow-sm border border-gray-200">
                                <div className="flex items-center flex-1 relative">
                                    {/* Make the container `relative` */}
                                    <div className="relative">
                                        <Image src={item.image} alt={item.name} width={100} height={100} className="w-[54px] h-[54px] object-cover mr-4" />
                                        <button
                                            className="absolute top-[-8px] left-[-10px] p-1 h-[22px] w-[22px] flex justify-center items-center bg-red-500 rounded-full shadow-md text-white"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <div>
                                        <h2 className="font-medium">{item.name}</h2>
                                    </div>
                                </div>
                                <div className='flex-1 flex justify-between w-1/2 gap-10 items-center'>
                                    <span className='text-[16px] md:hidden block'>Price:</span>  <p className="flex-1 text-center">${item.price}</p>
                                </div>

                                <div className="flex-1 text-center flex justify-center md:ml-10">
                                    <div className='flex md:gap-0 gap-10 items-center'>
                                        <span className='text-[16px] md:hidden block'>Quantity:</span>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                            className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                                        />
                                    </div>
                                </div>
                                <div className='flex-1 flex justify-between w-1/2 items-center'>
                                    <span className='text-[16px] md:hidden block'>Subtotal:</span> <p className="flex-1 text-end">${item.price * item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                  
                </>
            )}
              <div className="flex md:flex-row flex-col justify-between mt-6">
                        <div className='flex flex-col gap-4'>
                            <div>
                                <button
                                    className="text-[#DB4444] text-[16px] underline"
                                    onClick={handleClearCart}
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className='flex md:flex-row flex-col gap-3 my-5 md:my-0'>
                                <input type="text" placeholder='Coupon Code' className='border rounded border-black ring-offset-0 px-6 h-[48px] md:h-full md:w-[300px]' />
                                <button className='bg-[#DB4444] rounded md:text-[16px] text-[13px] font-medium md:px-[48px] px-[28px] py-[16px] w-fit text-white'>Apply Coupon</button>
                            </div>
                        </div>
                        <div className="h-[324px] md:w-[470px] border border-gray-600 rounded p-6 flex flex-col justify-between">
                            <h1 className='text-[20px] font-medium'>Cart Total</h1>
                            {/* 1 */}
                            <div className='flex items-center justify-between'>
                                <h2 className="text-[16px] font-medium">Subtotal:</h2>
                                <p className="text-[16px] font-medium">
                                    ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                                </p>
                            </div>
                            <div className="bg-[#000000] opacity-[30%]  h-[1px]   w-full" />
                            {/* 2 */}
                            <div className='flex items-center justify-between'>
                                <h2 className="text-[16px] font-medium">Shipping:</h2>
                                <p className="text-[16px] font-medium">
                                    Free
                                </p>
                            </div>
                            <div className="bg-[#000000] opacity-[30%]  h-[1px]   w-full" />
                            {/* 3 */}
                            <div className='flex items-center justify-between'>
                                <h2 className="text-[16px] font-medium">Total:</h2>
                                <p className="text-[16px] font-medium">
                                    ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                                </p>
                            </div>

                            <div className='flex justify-center'>
                                <Link href="/checkout">
                                    <button className='bg-[#DB4444] text-white rounded text-[16px] font-medium px-[48px] py-[16px]'>
                                        Proceed to checkout
                                    </button></Link>
                            </div>
                        </div>
                    </div>
        </div>
    );
};

export default CartPage;
