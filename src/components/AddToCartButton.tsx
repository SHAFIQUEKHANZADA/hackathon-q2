// components/AddToCartButton.tsx

import React from "react";

interface AddToCartButtonProps {
  onClick: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-[#C19C49] md:w-[202px] md:px-0 px-[8vw] h-[48px]"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
