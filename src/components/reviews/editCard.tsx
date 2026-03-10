import Link from "next/link"

export default function EditReviews ({ id }: {id: string}) {
    return (
        <Link
        href={`/reviews/edit/${id}`}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
            Edit Review
        </Link>
    )
}