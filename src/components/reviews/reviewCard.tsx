import DeleteCard from "./delete"
import EditReview from "./editCard"


export default function ReviewCard({ review }: any) {

  return ( 
        <div className="border p-4 rounded mb-4">
          <h2 className="font-bold">{review.game_title}</h2>
          <p>Status: {review.status}</p>
          <p>Rating: {review.rating}/10</p>
          <p>{review.review_text}</p>
        

        <div className="flex gap-3 mt-3">
          <EditReview id={review.id} />
          <DeleteCard id={review.id} />
        </div>
        </div>
      )}