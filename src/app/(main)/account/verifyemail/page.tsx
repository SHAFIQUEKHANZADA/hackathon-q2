"use client"

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const VerifyEmail = () => {
    const [token, setToken] = useState<string>("")
    const [verified, setVerified] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    console.log(verified, error)

    useEffect(() => {
        const verifyUserEmail = async () => {
            try {
                await axios.post("/api/users/verifyemail")
                setVerified(true)
            } catch (error) {
                setError(true)
                console.log(error)
            }
        }

        if (token.length > 0) {
            setError(false)
            verifyUserEmail()
        }
    }, [token])

    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    return (
        <div>
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
                    <h1 className="md:text-[48px] text-[38px] font-medium">Account</h1>
                    <div className="flex items-center gap-2">
                        <Link href={"/"}>
                            <h1 className="text-[16px] font-bold">Home</h1>
                        </Link>
                        <Image src={"/images/grater.png"} alt="grate" width={8} height={8} />
                        <h1 className="text-[16px] font-light">Email Verification</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail