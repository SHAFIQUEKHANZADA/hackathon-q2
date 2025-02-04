"use client";

import axios from "axios";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

type User = {
  username: string;
  email: string;
  _id: string;
};

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      setUser(res.data.data);
    } catch (error) {
      console.error("Failed to fetch user details", error);
      toast.error("Failed to load profile data");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/account/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className={`${poppins.className} min-h-screen bg-gray-50`}>
      {/* Main Banner */}
      <div className="relative">
        <div className="w-full">
          <Image
            src="/images/bgmain.png"
            alt="Main Banner"
            width={1920}
            height={1080}
            className="w-full h-[150px] md:h-[250px] object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image
            src={"/images/logo.png"}
            alt="Main Logo"
            width={100}
            height={22}
            className="w-[48px] h-[30px]"
          />
          <h1 className="md:text-[48px] text-[38px] font-medium text-black">Welcome, {user?.username || "User"}</h1>
        </div>
      </div>

      {/* User Dashboard */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Your Profile</h2>
        <p className="text-sm text-gray-500 mb-6">Manage your account information and settings</p>

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-gray-600 font-medium w-1/3">Username:</span>
            <span className="text-gray-800">{user?.username || "Loading..."}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 font-medium w-1/3">Email:</span>
            <span className="text-gray-800">{user?.email || "Loading..."}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-between">
          <Link href={`/account/profile/${user?._id}`} className="text-blue-600 hover:underline">
            View Full Profile
          </Link>
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
