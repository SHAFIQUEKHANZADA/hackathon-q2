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
        <div className="flex w-[165px] h-[44px] border border-gray-300 rounded">
            {/* Decrease Button */}
            <div
                className={`grid border border-gray-300 text-[25px] justify-center items-center cursor-pointer 
                    ${clicked === 'decrease' ? 'bg-red-500 text-white' : 'bg-white'}`}
                style={{ width: '25%' }}
                onClick={handleDecrease}
            >
                -
            </div>

            {/* Quantity Display */}
            <div
                className="grid border border-gray-300 justify-center items-center text-[20px] font-medium"
                style={{ width: '50%' }}
            >
                {quantity}
            </div>

            {/* Increase Button */}
            <div
                className={`grid border border-gray-300 text-[25px] justify-center items-center cursor-pointer 
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
