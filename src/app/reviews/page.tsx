'use client'

import { useState } from "react";
import { FormEvent } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import LoadSpinner from "@/components/loadSpinner"

type gameStatus = 
    | "Currently Playing"
    | "Played but Not Completed"
    | "Dropped"
    | "Completed"
    | "On Wishlist"


export default function ReviewPage(){

    //review parameters
    const[gameTitle, setGameTitle] = useState("");
    const[hoursPlayed, setHoursPlayed] = useState(0);
    const[rating, setRating] = useState(1);
    const[reviewText, setReviewText] = useState("");
    const[recommend, setRecommend] = useState<boolean | null>(null);
    const[isPublic, setIsPublic] = useState(true);
    const[status, setStatus] = useState<gameStatus>("On Wishlist");
    
    const[loading,setLoading] = useState(false)


    const[errorMsg, setErrorMsg] = useState("");
    const router = useRouter();


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //validation checks
        if (!gameTitle.trim()){
            setErrorMsg("Insert game title")
            return
        }
        if (rating < 1 || rating > 10){
            setErrorMsg("Rating must be between 1 and 10")
            return
        }

        if (hoursPlayed < 0){
            setErrorMsg("Cannot have negative hours played")
            return
        }

        setLoading(true);
        setErrorMsg("");
        //gets profile data from supabase, if user not defined route back to login page 
        try {      
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
            return;
            }   

        console.log("Auth user: ", user);
        const { error } = await supabase.from("reviews").insert([
            {
                user_id: user.id,
                game_title: gameTitle,
                rating: rating,
                hours_played: hoursPlayed,
                review_text: reviewText,
                recommended: recommend,
                status: status,
                is_public: isPublic,
            },
        ]);

        if (error) throw error;

        router.push("/dashboard");

    } catch (error: any) {
        console.error("Insert error: ", error);
        setErrorMsg(error.message);
    } finally {
        setLoading(false);
    }

    };

    if (loading) {
          return <LoadSpinner text="Loading.." />
    }


    return (
        <div>
            <h1>Create Savepoint Review</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
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
                        {loading ? "Posting..." : "Post Review"}
                    </button>
                </div>




            </form>
        </div>
    );
}

/* {
    "code": "23514",
    "details": null,
    "hint": null,
    "message": "new row for relation \"reviews\" violates check constraint \"status_valid_check\""
}

New error code*/