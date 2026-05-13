"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  BarChart3,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">
        Review SaaS
      </h1>

      <div className="space-y-4">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:text-yellow-400"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/dashboard/businesses"
          className="flex items-center gap-3 hover:text-yellow-400"
        >
          <Building2 size={20} />
          Businesses
        </Link>

        <Link
          href="/dashboard/analytics"
          className="flex items-center gap-3 hover:text-yellow-400"
        >
          <BarChart3 size={20} />
          Analytics
        </Link>

        <Link
          href="/dashboard/feedbacks"
          className="flex items-center gap-3 hover:text-yellow-400"
        >
          <MessageSquare size={20} />
          Feedbacks
        </Link>

      </div>
    </div>
  );
}