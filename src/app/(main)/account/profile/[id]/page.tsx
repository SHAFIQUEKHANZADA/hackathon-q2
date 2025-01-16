"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

type User = {
  _id: string;
  username: string;
  email: string;
  activity: string[];
};

const UserDashboard = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = useCallback(async () => {
    try {
      const res = await axios.get(`/api/users/me/${id}`);
      setUser(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Unable to fetch user details.");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchUserDetails();
  }, [id, fetchUserDetails]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">User Dashboard</h1>

      {/* User Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Details</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium text-gray-600">Username: </span>
            {user.username}
          </p>
          <p>
            <span className="font-medium text-gray-600">Email: </span>
            {user.email}
          </p>
          <p>
            <span className="font-medium text-gray-600">User ID: </span>
            {user._id}
          </p>
        </div>
      </div>

      {/* User Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity</h2>
        {user.activity && user.activity.length > 0 ? (
          <ul className="bg-white p-6 rounded-lg shadow-md">
            {user.activity.map((act, index) => (
              <li key={index} className="border-b last:border-none p-2">
                {act}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No activity recorded.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
