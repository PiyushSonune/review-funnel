"use client";

import { useState } from "react";
import API from "@/lib/axios";

export default function CreateBusinessPage() {

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    logo: "",
    googleReviewUrl: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/api/business/create",
        formData
      );

      alert("Business created successfully");

      setFormData({
        name: "",
        slug: "",
        logo: "",
        googleReviewUrl: "",
      });

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        Create Business
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Business Name"
          className="w-full border p-3 rounded"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Slug"
          className="w-full border p-3 rounded"
          value={formData.slug}
          onChange={(e) =>
            setFormData({
              ...formData,
              slug: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Logo URL"
          className="w-full border p-3 rounded"
          value={formData.logo}
          onChange={(e) =>
            setFormData({
              ...formData,
              logo: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Google Review URL"
          className="w-full border p-3 rounded"
          value={formData.googleReviewUrl}
          onChange={(e) =>
            setFormData({
              ...formData,
              googleReviewUrl: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          Create Business
        </button>

      </form>
    </div>
  );
}