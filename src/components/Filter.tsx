"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

interface FilterProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  defaultItemsPerPage?: number;
  onItemsPerPageChange?: (value: number) => void;
  onSortChange?: (value: string) => void;
  onViewChange?: (view: 'grid' | 'list') => void;
}

const Filter: React.FC<FilterProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  defaultItemsPerPage = 4,
  onItemsPerPageChange,
  onSortChange,
  onViewChange,
}) => {
  const [itemsPerPageInput, setItemsPerPageInput] = useState(defaultItemsPerPage);
  const [sortOption, setSortOption] = useState("default");
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([10, 100]);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setItemsPerPageInput(value);


    if (onItemsPerPageChange) {
      onItemsPerPageChange(value);
    }
  };


  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);

    if (onSortChange) {
      onSortChange(value);
    }
  };


  const handleViewToggle = (viewType: 'grid' | 'list') => {
    setView(viewType);
    if (onViewChange) {
      onViewChange(viewType);
    }
  };


  return (
    <div className="flex justify-between items-center mb-8 lg:px-12 px-5 sm:h-[100px] h-[70px] bg-[#F9F1E7]">
      {/* Left Section */}
      <div className="text-[16px] flex items-center lg:gap-5 gap-3">
        {/* Filter */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-[20px] h-[20px]">
                <Image src="/svg/filter.svg" alt="filter" width={100} height={100} />
              </div>
              <h1 className="lg:text-[20px] text-[14px]">Filter</h1>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Options</DialogTitle>
              <DialogDescription>Refine your search using the filters below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Price Range Slider */}
              <div>
                <h3 className="text-lg font-medium">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={500}
                  step={10}
                  onValueChange={(values) => setPriceRange(values)}
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              {/* Additional Filter Options */}
              <div>
                <h3 className="text-lg font-medium">Other Filters</h3>
                {/* Add additional filter options here */}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Grid View Toggle */}
        <div
          className={`w-[17px] h-[17px] cursor-pointer ${view === 'grid' ? 'opacity-100' : 'opacity-50'}`}
          onClick={() => handleViewToggle('grid')}
        >
          <Image src="/svg/grid.svg" alt="grid" width={100} height={100} />
        </div>

        {/* List View Toggle */}
        <div
          className={`w-[19px] h-[17px] cursor-pointer ${view === 'list' ? 'opacity-100' : 'opacity-50'}`}
          onClick={() => handleViewToggle('list')}
        >
          <Image src="/svg/acc.svg" alt="list" width={100} height={100} />
        </div>

        {/* Separator */}
        <div className="h-10 w-[2px] bg-[#9F9F9F] sm:block hidden"></div>

        {/* Showing Results */}
        <div className="lg:text-[16px] text-[14px] sm:block hidden">
          Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center lg:gap-5 gap-3">
        {/* Items Per Page */}
        <label className="sm:flex hidden items-center gap-[10px]">
          <span className="lg:text-[20px] text-[14px]">Show</span>
          <input
            type="number"
            className="w-16 sm:p-2 p-1 focus:outline-none focus:ring-2 focus:ring-[#3A3A3A]"
            value={itemsPerPageInput}
            min={1}
            onChange={handleItemsPerPageChange}
          />
        </label>

        <label className="flex items-center gap-[10px]">
          <span className="lg:text-[20px] text-[14px]">Sort by</span>
          <select
            className="sm:p-2 p-1 focus:outline-none focus:ring-2 focus:ring-[#3A3A3A] lg:text-[20px] text-[14px]"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default" disabled>
              Default
            </option>
            <option value="name">Alphabet (A to Z)</option>
            <option value="name2">Alphabet (Z to A)</option>
            <option value="high">High to Low</option>
            <option value="low">Low to High</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filter;
