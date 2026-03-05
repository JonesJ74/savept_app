import { supabase } from "@/lib/supabaseClient"

export default function DeleteCard({ id }: { id: string}) {
    const handleDelete = async () => { 
        const {error} = await supabase
        .from("reviews")
        .delete()
        .eq("id", id)

        if (error){
            console.error("Delete failed: ", error)
        } else {
            //refresh page
            location.reload()
        }      
}

return (
    <button onClick={handleDelete} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
    )
}