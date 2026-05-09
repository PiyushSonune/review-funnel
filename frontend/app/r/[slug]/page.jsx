"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";

export default function ReviewPage({ params }) {

  const resolvedParams = use(params);

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {

    try {

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/review/${resolvedParams.slug}`
      );

      setBusiness(res.data);

    } catch (error) {

      console.log(error);
      alert("Failed to load business details");

    } finally {

      setLoading(false);
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

      // 4 & 5 star → Google Review
      if (rating >= 4) {

        window.location.href = business.googleReviewUrl;

      } else {

        // 1,2,3 star → Feedback Form
        window.location.href =
          `/feedback?businessId=${business.id}&rating=${rating}`;
      }

    } catch (error) {

      console.log(error);
      alert("Something went wrong");
    }
  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!business) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Business not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center">

        <img
          src={business.logo}
          alt="logo"
          className="w-28 h-28 rounded-full object-cover shadow-lg border"
        />

        <h1 className="text-4xl font-bold mt-6 text-center">
          {business.name}
        </h1>

        <p className="text-gray-500 mt-3 text-lg text-center">
          Rate Your Experience
        </p>

        <div className="flex gap-3 mt-10">

          {[1, 2, 3, 4, 5].map((star) => (

            <button
              key={star}
              onClick={() => handleRating(star)}
              className="text-5xl hover:scale-110 transition duration-200"
            >
              ⭐
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}