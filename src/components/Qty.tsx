"use client"
import { useState } from 'react';

const QuantitySelector = () => {
    const [quantity, setQuantity] = useState(1);
    const [clicked, setClicked] = useState<string | null>(null);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        setClicked('increase');  
        setTimeout(() => setClicked(null), 200);  
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            setClicked('decrease');  
            setTimeout(() => setClicked(null), 200);  
        }
    };

    return (
        <div className="flex lg:w-[125px] sm:w-[100px] w-[165px] h-[46px] border border-[#9F9F9F] rounded-[10px]">
            {/* Decrease Button */}
            <div
                className={`grid rounded-[10px] lg:text-[25px] text-[20px] justify-center items-center cursor-pointer 
                    ${clicked === 'decrease' ? 'bg-red-500 text-white' : 'bg-white'}`}
                style={{ width: '25%' }}
                onClick={handleDecrease}
            >
                -
            </div>

            {/* Quantity Display */}
            <div
                className="grid rounded-[10px] justify-center items-center lg:text-[20px] text-[16px] font-medium"
                style={{ width: '50%' }}
            >
                {quantity}
            </div>

            {/* Increase Button */}
            <div
                className={`grid rounded-[10px] lg:text-[25px] text-[20px] justify-center items-center cursor-pointer 
                    ${clicked === 'increase' ? 'bg-green-500 text-white' : 'bg-white'}`}
                style={{ width: '25%' }}
                onClick={handleIncrease}
            >
                +
            </div>
        </div>
    );
};

export default QuantitySelector;
