"use client"
import Image from "next/image";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Array<{ reviewername: string; rating: number; comment: string }>>([]);
    const [newReview, setNewReview] = useState<{ reviewername: string; rating: number; comment: string }>({
        reviewername: "",
        rating: 0,
        comment: "",
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (rating: number) => {
        setNewReview((prev) => ({ ...prev, rating }));
    };

    const handleSubmit = () => {
        if (editingIndex !== null) {
            const updatedReviews = [...reviews];
            updatedReviews[editingIndex] = newReview;
            setReviews(updatedReviews);
            setEditingIndex(null);
        } else {
            setReviews((prev) => [...prev, newReview]);
        }
        setNewReview({ reviewername: "", rating: 0, comment: "" });
    };

    // Handle editing a review
    const handleEdit = (index: number) => {
        setNewReview(reviews[index]);
        setEditingIndex(index);
    };

    // Handle deleting a review
    const handleDelete = (index: number) => {
        setReviews((prev) => prev.filter((_, i) => i !== index));
    };

    // const [showDropdown, setShowDropdown] = useState<number | null>(null);

    // const toggleDropdown = (index: number) => {
    //     setShowDropdown(showDropdown === index ? null : index)
    // }

    return (
        <div className="text-[16px] text-[#9F9F9F] flex flex-col-reverse">

            <div className="mt-10">
                <h3 className="font-bold text-[20px] mb-2">Add a Review</h3>
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="reviewername"
                        placeholder="Your Name"
                        value={newReview.reviewername}
                        onChange={handleInputChange}
                        className="border rounded p-2"
                    />
                    <div className="flex gap-2 items-center">
                        <h1 className="font-bold text-[16px]">Rating:</h1>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span
                                    key={i}
                                    onClick={() => handleRatingChange(i + 1)}
                                    style={{
                                        color: i < newReview.rating ? "gold" : "#ccc",
                                        cursor: "pointer",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <textarea
                        name="comment"
                        placeholder="Your Comment"
                        value={newReview.comment}
                        onChange={handleInputChange}
                        className="border rounded p-2"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-[#B88E2F] text-white py-2 px-3 hover:text-[#B88E2F] duration-200 sm:w-fit w-full hover:bg-transparent hover:border-[#B88E2F] border border-transparent"
                    >
                        {editingIndex !== null ? "Update Review" : "Submit Review"}
                    </button>
                </div>
            </div>

            <div>
                {reviews.map((review, index) => (
                    <div key={index} className="flex flex-col gap-3 mb-4 border-b border-gray-300 pb-4">
                        <div className="flex gap-2 items-center">
                            <div className="flex items-center gap-2">
                                <div className="sm:w-10 sm:h-10 w-8 h-8 rounded-full">
                                    <Image src="/images/ava.jpg" alt="avatar" width={50} height={50} className="rounded-full" />
                                </div>
                                <p className="font-semibold sm:text-[20px] text-[18px]">{review.reviewername}</p>
                            </div>
                            <div className="flex items-center ml-auto">
                                <p>{review.rating} / 5</p>
                                <div className="flex ml-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                color: i < review.rating ? 'gold' : '#ccc',
                                                fontSize: '1.2rem',
                                                marginRight: '2px',
                                            }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p>
                            <strong>Comment:</strong> {review.comment}
                        </p>

                        {/* Three Dots and Dropdown */}
                        <div className="flex justify-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="link" className="text-[#9F9F9F] hover:text-black text-[20px] font-bold hover:no-underline">
                                        ⋮
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-32">
                                    <DropdownMenuItem onClick={() => handleEdit(index)}>
                                        <Edit className="mr-2" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(index)}>
                                        <Trash2 className="mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
