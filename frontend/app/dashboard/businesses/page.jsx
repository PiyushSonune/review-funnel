"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import BusinessTable from "@/components/dashboard/BusinessTable";

export default function BusinessesPage() {

  const [businesses, setBusinesses] = useState([]);

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
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Businesses
        </h1>

      </div>

      <BusinessTable businesses={businesses} />

    </div>
  );
}