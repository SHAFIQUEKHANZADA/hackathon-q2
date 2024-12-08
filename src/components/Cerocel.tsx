"use client";

import { useState } from "react";
import Image from "next/image";

interface CardsMember {
  image: string;
}

interface CardsCarouselProps {
  Cards: CardsMember[];
}

const CardCarousel = ({ Cards }: CardsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= Cards.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? Cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative md:w-[500px] flex flex-col items-center justify-between">
      {/* Carousel Container */}
      <div className="relative md:w-[472px] w-[95vw] h-[542px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (300 + 100)}px)`,
          }}
        >
          {Cards.map((member, index) => (
            <div
              key={index}
              className="w-[372px] h-[486px] flex-shrink-0 relative md:mx-[18px]"
            >
              <Image
                src={member.image}
                alt={`Card ${index}`}
                width={372}
                height={486}
                className="object-cover w-[372px] h-[486px]"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white w-[48px] h-[48px] rounded-full flex items-center justify-center shadow-md z-10"
        >
          &#60;
        </button>
        <button
          onClick={nextSlide}
          className="absolute md:right-8 right-2 top-1/2 transform -translate-y-1/2 bg-white w-[48px] h-[48px] rounded-full flex items-center justify-center shadow-md z-10"
        >
          &#62;
        </button>
      </div>

    {/* Navigation Dots */}
<div className="flex gap-5 mr-[200px]">
  {Cards.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`w-4 h-4 rounded-full transition-all ${
        currentIndex === index
          ? "ring-2 ring-[#B88E2F]/90 ring-offset-8 bg-[#B88E2F]"
          : "bg-[#D8D8D8]"
      }`}
    />
  ))}
</div>

    </div>
  );
};

export default CardCarousel;
