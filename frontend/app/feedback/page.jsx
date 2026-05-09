"use client";

import axios from "axios";
import {
  Suspense,
  useState
} from "react";

import {
  useSearchParams
} from "next/navigation";

function FeedbackForm() {

  const searchParams = useSearchParams();

  const businessId = searchParams.get("businessId");
  const rating = searchParams.get("rating");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const submitFeedback = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/review/feedback`,
        {
          businessId,
          rating: Number(rating),
          name: form.name,
          phone: form.phone,
          message: form.message,
        }
      );

      alert("Feedback submitted successfully!");

      console.log(res.data);

      setForm({
        name: "",
        phone: "",
        message: "",
      });

    } catch (error) {

      console.log(error);

      alert("Error submitting feedback");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-[450px]">

        <h1 className="text-4xl font-bold">
          We value your feedback
        </h1>

        <p className="text-gray-500 mt-3">
          Please help us improve your experience.
        </p>

        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="border w-full p-3 mt-8 rounded-lg outline-none"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
          className="border w-full p-3 mt-5 rounded-lg outline-none"
        />

        <textarea
          rows="5"
          placeholder="Write your feedback..."
          value={form.message}
          onChange={(e) =>
            setForm({
              ...form,
              message: e.target.value,
            })
          }
          className="border w-full p-3 mt-5 rounded-lg outline-none"
        />

        <button
          onClick={submitFeedback}
          disabled={loading}
          className="bg-black hover:bg-gray-800 transition text-white w-full py-3 rounded-lg mt-6"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

      </div>

    </div>
  );
}

export default function FeedbackPage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedbackForm />
    </Suspense>
  );
}