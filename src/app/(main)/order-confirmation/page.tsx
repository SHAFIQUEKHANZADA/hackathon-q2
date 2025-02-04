"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import PreFooter from "@/components/PreFooter";
import { IoMdCopy } from "react-icons/io";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const labelPdf = searchParams.get("labelPdf") || "";
  const trackingNumber = searchParams.get("trackingNumber") || "";
  const labelId = searchParams.get("labelId") || "";
  const carrierCode = searchParams.get("carrierCode") || "";

  // Function to copy the labelId (or tracking id) to the clipboard.
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch (error) {
      console.log(error)
      alert("Failed to copy");
    }
  };

  return (
    <div className={`${poppins.className} min-h-screen`}>
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={22}
            className="w-[48px] h-[30px]"
          />
          <h1 className="md:text-[48px] text-[28px] font-medium">
            Order Confirmation
          </h1>
          <div className="flex items-center gap-2">
            <Link href="/">
              <span className="text-[16px] font-bold">Home</span>
            </Link>
            <Image src="/images/grater.png" alt="Separator" width={8} height={8} />
            <span className="text-[16px] font-light">Order Confirmation</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 py-8 px-4 sm:px-6 lg:px-8">
        {/* Order Confirmation Message */}
        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Thank you for your order!
          </h2>
          <p className="text-lg text-gray-700">
            Your order has been placed successfully.
          </p>
        </div>

        {/* Download Label Button */}
        <div className="mb-8 text-center">
          <Link href={labelPdf} target="_blank">
            <button className="before:text-[16px] font-semibold  px-[44px] py-[12px]  bg-[#B88E2F]  text-white hover:text-[#B88E2F] hover:bg-transparent border duration-300 hover:border hover:border-[#B88E2F]">
              Download Your Label
            </button>
          </Link>
        </div>

        {/* Tracking Information */}
        <div className="mb-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Tracking Information
          </h3>
          <p>
            <strong>Tracking Number:</strong> {trackingNumber}
          </p>
          <div className="flex justify-center items-center gap-2 mt-2">
            <span className="font-semibold">{labelId}</span>
            <button onClick={() => copyToClipboard(labelId)} className="text-blue-500">
              {/* Copy Icon */}
              <IoMdCopy />
            </button>
          </div>
          <p className="mt-2">
            <strong>Carrier Code:</strong> {carrierCode}
          </p>
          <div className="mt-5">
            <Link href={"/track-order"} className="before:text-[16px] font-semibold  px-[44px] py-[12px]  bg-[#B88E2F]  text-white hover:text-[#B88E2F] hover:bg-transparent border duration-300 hover:border hover:border-[#B88E2F]">
              Track your Order
            </Link>
          </div>
        </div>
      </div>

      <PreFooter />
    </div>
  );
};

export default OrderConfirmation;
