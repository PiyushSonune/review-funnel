"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";

export default function DashboardPage() {

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchBusinesses();

  }, []);

  const fetchBusinesses = async () => {

    try {

      const res = await API.get(
        "/api/business/all"
      );

      setBusinesses(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Total Businesses
          </h2>

          <p className="text-3xl font-bold">
            {businesses.length}
          </p>
        </div>

      </div>
    </div>
  );
}