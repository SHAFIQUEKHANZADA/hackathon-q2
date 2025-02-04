"use client";

import PreFooter from "@/components/PreFooter";
import axios from "axios";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

interface ErrorResponse {
  error: string;
}

type User = {
  email: string;
  password: string;
};

const LogInPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<User>>({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;
    const newErrors: Partial<User> = {};

    if (!user.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    }

    if (!user.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", {
        email: user.email,
        password: user.password,
      });
      console.log(response)

      // If successful, redirect to profile page
      toast.success("Login successful!");
      router.push("/account/profile");
    } catch (error: unknown) {
      // TypeScript cannot infer the type of error by default, so we need to narrow it
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const errorData: ErrorResponse = error.response.data;

        setErrors({
          email: errorData.error === "Email not found" ? "Email not found." : "",
          password: errorData.error === "Password incorrect" ? "Password doesn't match." : "",
        });
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className={poppins.className}>
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
            <h1 className="text-[16px] font-light">Log in</h1>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col-reverse sm:mx-[4vw] p-5 sm:gap-0 gap-4">
        <div className="flex flex-1 flex-col justify-center px-5 gap-3 mt-10">
          <h1 className="text-[36px] font-semibold text-black">Welcome Back!</h1>
          <p className="text-[#9F9F9F] text-[16px]">
            Log in to access your personalized shopping experience, track your orders, and enjoy exclusive offers. We&lsquo;re excited to have you back!
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <form onSubmit={onLogin} className="sm:max-w-lg">
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-[16px] font-medium text-black mb-3">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full p-5 border border-gray-400 rounded-[10px] focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-[16px] font-medium text-black mb-3">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full p-5 border border-gray-400 rounded-[10px] focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              <p className="text-[14px] hover:text-[#B88E2F] text-gray-600 duration-300"><Link href={"/account/verifyemail"}>Forgot password?</Link></p>
            </div>

            <button
              type="submit"
              className={`bg-white text-[#B88E2F] my-3 border border-[#B88E2F] hover:border-transparent hover:bg-[#B88E2F] hover:text-white duration-300 text-[16px] font-semibold px-[44px] py-[12px] ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={buttonDisabled || loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <div>
              Don’t have an account?{" "}
              <span className="underline">
                <Link href={"/account/signup"}>Create Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      <PreFooter/>
    </div>
  );
};

export default LogInPage;
