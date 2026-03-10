'use client'

import { useState, useEffect } from "react";
import { FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";    



type gameStatus = 
    | "Currently Playing"
    | "Played but Not Completed"
    | "Dropped"
    | "Completed"
    | "On Wishlist"


export default function EditReviewPage (){   
    const params  = useParams()
    const id = params.id as string;
    const router = useRouter()
    
    //review variables
    const[gameTitle, setGameTitle] = useState("");
    const[hoursPlayed, setHoursPlayed] = useState(0);
    const[rating, setRating] = useState(1);
    const[reviewText, setReviewText] = useState("");
    const[recommend, setRecommend] = useState<boolean | null>(null);
    const[isPublic, setIsPublic] = useState(true);
    const[status, setStatus] = useState<gameStatus>("On Wishlist");
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReview = async () => {
            const {data, error} = await supabase
            .from("reviews")
            .select("*")
            .eq("id", id)
            .single()
            
            if (error) {
                console.error("There was an error fetching the reviews:", error)
            } else {
                setGameTitle(data.game_title)
                setRating(data.rating)
                setReviewText(data.review_text)
                setStatus(data.status)
            }
            setLoading(false)
        }
        fetchReview()
    }, [id]) 

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error } = await supabase
        .from("reviews")
        .update({
            game_title: gameTitle,
            rating,
            review_text: reviewText,
            status: status,
            hours_played: hoursPlayed,
            recommended: recommend,
            is_public: isPublic
        })
        .eq("id", id)

        if (error) {
            console.error("Error updating review", error)
            return
        }

    router.push("/dashboard")
    }
    return (
        <div>
            <h1>Edit Savepoint Review</h1>

            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Game title"
                    value={gameTitle}
                    onChange={(e) => setGameTitle(e.target.value)}
                    required
                />

                <input
                    type="number"
                    min="1"
                    max="10"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                />

                <input
                    type="number"
                    min="0"
                    placeholder="Number of Hours Played"
                    value={hoursPlayed}
                    onChange={(e) => setHoursPlayed(Number(e.target.value))}
                />

                <textarea
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />


                <label>Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as gameStatus)}
                >
                    <option value="Currently Playing">Currently Playing</option>
                    <option value="Played but Not Completed">Played but Not Completed</option>
                    <option value="Completed">Completed</option>
                    <option value="Dropped">Dropped</option>
                    <option value="On Wishlist">On Wishlist</option>
                </select>



                <label>
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
                Public Review
                </label>

                <div>
                    <p>Would you recommend this game to anyone?</p>

                    <label>
                        <input
                            type="radio"
                            name="recommended"
                            checked={recommend==true}
                            onChange={() => setRecommend(true)}
                            />
                    Yes
                    </label>

                    <label>
                    <input
                        type="radio"
                        name="recommended"
                        checked={recommend === false}
                        onChange={() => setRecommend(false)}
                    />
                    No
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Update Review
                    </button>
                </div>




            </form>
        </div>
    ); 

}