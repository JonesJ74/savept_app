'use client'

import withAuth from "../../hoc/withAuth";
import Link from "next/link";
import LogoutButton from "@/components/logout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";


export default function Dashboard() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      const fetchReviews = async () => {
        //fetches reviews and orders them from newest to oldest
        const { data , error } = await supabase
          .from("reviews")
          .select("*")
          .order("created_at", {ascending: false})

        //error handling  
        if (error) {
          console.error("There was an error fetching the reviews:", error)
        } else {
          setReviews(data || [])
        }

        //ui rendering
        setLoading(false)
      }
      
      fetchReviews()
    }, [])

    return (
      <div className="p-6">
      <h1>Your Reviews</h1>

      {loading && <p>Loading your reviews...</p>}
      {!loading && reviews.length == 0 && (
        <p>You have not written any reviews yet</p>
      )}

      {reviews.map((review) => (
        <div
          key={review.id}
          className="border p-4 rounded mb-4"
        >
          <h2 className="font-bold">{review.game_title}</h2>
          <p>Status: {review.status}</p>
          <p>Rating: {review.rating}/10</p>
          <p>{review.review_text}</p>
        </div>
      ))}

       <nav className="mb-6">
        <Link
          href="/reviews"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create a review
        </Link>
      </nav>

      <LogoutButton />
      
      </div>
    );
}
/*
function Dashboard() {
  return (
    <div className="p-6">
      <h1>Welcome to SavePoint!</h1>
      <p>This is a protected page.</p>
      <nav className="mb-6">
        <Link
          href="/reviews"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create a review
        </Link>
      </nav>
    </div>
  );
}

export default withAuth(Dashboard)
*/
