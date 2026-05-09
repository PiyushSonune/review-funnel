"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";

export default function ReviewPage({ params }) {

  const resolvedParams = use(params);

  const [business, setBusiness] = useState(null);

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {

    try {

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/review/${resolvedParams.slug}`
      );

      console.log("API RESPONSE:", res.data);

      // HANDLE BOTH RESPONSE TYPES
      if (res.data.business) {
        setBusiness(res.data.business);
      } else {
        setBusiness(res.data);
      }

    } catch (error) {

      console.log(error);

      alert("Failed to load business details");
    }
  };

  const handleRating = async (rating) => {

    try {

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/review/submit`,
        {
          businessId: business.id,
          rating,
        }
      );

      if (rating >= 4) {

        window.location.href =
          business.googleReviewUrl;

      } else {

        window.location.href =
          `/feedback?businessId=${business.id}&rating=${rating}`;
      }

    } catch (error) {

      console.log(error);
    }
  };

  if (!business) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">

      <img
        src={business.logo}
        alt="logo"
        className="w-28 h-28 rounded-full object-cover shadow-lg"
      />

      <h1 className="text-4xl font-bold mt-6 text-center">
        {business.name}
      </h1>

      <p className="text-gray-500 mt-2 text-lg">
        Rate Your Experience
      </p>

      <div className="flex gap-4 mt-10">

        {[1, 2, 3, 4, 5].map((star) => (

          <button
            key={star}
            onClick={() => handleRating(star)}
            className="text-5xl hover:scale-110 transition"
          >
            ⭐
          </button>

        ))}

      </div>

    </div>
  );
}