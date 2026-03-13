'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateReviewButton() {
  const [creating, setCreating] = useState(false)
  const router = useRouter()

  const handleCreate = () => {
    setCreating(true)

    // Navigate to /reviews after a small delay for UX
    setTimeout(() => {
      router.push("/reviews")
    }, 300) // 0.3s gives user visual feedback
  }

  return (
    <button
      onClick={handleCreate}
      disabled={creating}
      className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
        creating ? "bg-green-700" : "bg-green-800 hover:bg-green-700"
      }`}
    >
      {creating && (
        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
      )}
      <span>{creating ? "Creating review..." : "Create a review"}</span>
    </button>
  )
}