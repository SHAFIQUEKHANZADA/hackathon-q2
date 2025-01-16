"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';


type User = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<Partial<User>>({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<User> = {};
    if (!user.username.trim()) {
      newErrors.username = "Username is required.";
    }
    if (!user.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email is not valid.";
    }
    if (!user.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", {
        username: user.username,
        email: user.email,
        password: user.password
      });
      console.log("Signup success", response.data);
      toast.success("Sign up successful!");
      router.push("/account/login");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.confirmPassword.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

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
            <h1 className="text-[16px] font-light">Sign Up</h1>
          </div>
        </div>
      </div>

      <form onSubmit={onSignup}>
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-[16px] font-medium text-black mb-3">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter Username"
            className="w-full p-5 border border-gray-400 rounded-[10px] focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

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
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-[16px] font-medium text-black mb-3">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={user.confirmPassword}
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            placeholder="Confirm your password"
            className="w-full p-5 border border-gray-400 rounded-[10px] focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className={`bg-white text-[#B88E2F] border border-[#B88E2F] hover:border-transparent hover:bg-[#B88E2F] hover:text-white duration-300 text-[16px] font-semibold px-[44px] py-[12px] ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <div>
          Already have an account?{" "}
          <span className="underline">
            <Link href={"/account/login"}>Log in</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
