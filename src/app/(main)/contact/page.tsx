"use client";

import Form from '@/components/Form';
import PreFooter from '@/components/PreFooter';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { FaClock, FaPhoneAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

type FormData = {
    name: string;
    email: string;
    subject?: string;
    message: string;
  };
  

const ContactPage = () => {
    const handleFormSubmit: SubmitHandler<FormData> = (data) => {
        // Handle form data, e.g., send it to an API
        console.log(data);
      };
    return (
        <div className={`${poppins.className} flex flex-col min-h-screen`}>
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
                    <h1 className="md:text-[48px] text-[38px] font-medium">Contact</h1>
                    <div className="flex items-center gap-2">
                        <Link href={"/"}>
                            <h1 className="text-[16px] font-bold">Home</h1>
                        </Link>
                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />
                        <h1 className="text-[16px] font-light">Contact</h1>
                    </div>
                </div>
            </div>

            {/* Intro Section */}
            <div className="flex flex-col justify-center text-center md:w-[50%] mx-auto px-5 gap-3 mt-10">
                <h1 className="text-[36px] font-semibold text-black">Get In Touch With Us</h1>
                <p className="text-[#9F9F9F] text-[16px]">
                    For more information about our product & services, please feel free to drop us an email. Our staff will always be there to help you out. Do not hesitate!
                </p>
            </div>

            {/* Contact Form and Info */}
            <div className="lg:w-[1058px] mt-10 mx-auto flex md:flex-row flex-col justify-between gap-12 md:gap-0 pb-10">
                {/* Left Info Section */}
                <div className="flex flex-col gap-10">
                    {/* Address */}
                    <div className="flex w-[300px] gap-5">
                        <IoLocationSharp className="text-[80px]" />
                        <div className="mt-5 flex flex-col gap-2">
                            <h1 className="text-[24px] font-medium">Address</h1>
                            <p className="text-[16px]">
                                236 5th SE Avenue, New York NY10000, United States
                            </p>
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="flex w-[300px] gap-5">
                        <FaPhoneAlt className="text-[40px]" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[24px] font-medium">Phone</h1>
                            <p className="text-[16px]">
                                Mobile: +(84) 546-6789 <br />
                                Hotline: +(84) 456-6789
                            </p>
                        </div>
                    </div>
                    {/* Working Time */}
                    <div className="flex w-[300px] gap-5">
                        <FaClock className="text-[40px]" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[24px] font-medium">Working Time</h1>
                            <p className="text-[16px]">
                                Monday-Friday: 9:00 - 22:00 <br />
                                Saturday-Sunday: 9:00 - 21:00
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Form Section */}
                <div>
                <Form onSubmit={handleFormSubmit} />
                </div>
            </div>

            {/* PreFooter */}
            <PreFooter />
        </div>
    );
};

export default ContactPage;
