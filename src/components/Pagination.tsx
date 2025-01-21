"use client"
import { useEffect, useState } from "react";

interface FetchResult<T> {
    data: T[];  
    total: number; 
  }
  
  interface PaginationProps<T> {
    itemsPerPage: number;
    fetchData: (currentPage: number, itemsPerPage: number) => Promise<FetchResult<T>>;
    renderItem: (item: T) => JSX.Element;
  }
  
  const Pagination = <T,>({
    itemsPerPage,
    fetchData,
    renderItem,
  }: PaginationProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<T[]>([]);
    const [totalItems, setTotalItems] = useState(0);
  
    useEffect(() => {
      const loadPageData = async () => {
        const fetchedData = await fetchData(currentPage, itemsPerPage);
        setData(fetchedData.data);  
        setTotalItems(fetchedData.total);  
      };
  
      loadPageData();
    }, [currentPage, itemsPerPage, fetchData]);
  
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    };
  
    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    };
  
    return (
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map(renderItem)}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default Pagination;
  