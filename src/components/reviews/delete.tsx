import { supabase } from "@/lib/supabaseClient"
import {useState} from "react"


export default function DeleteCard({ id }: { id: string}) {
    const [deleting, setDeleting] = useState(false);
    const [loading, setLoading] = useState(false)


    const handleDelete = async () => { 
        const confirmDelete = confirm("Are you sure you want to delete this review?")
        if (!confirmDelete) return

        setDeleting(true)

        const {error} = await supabase
        .from("reviews")
        .delete()
        .eq("id", id)

        if (error){
            console.error("Delete failed: ", error)
            setDeleting(false)
        } else {
            //refresh page
            location.reload()
        }      
}


return (
    <button onClick={handleDelete}
     disabled={deleting}
     className="bg-red-600 text-white px-3 py-1 rounded">{deleting && (
        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
      )}<span>{deleting ? "Deleting..." : "Delete Review"}</span>
      </button>
    )
}