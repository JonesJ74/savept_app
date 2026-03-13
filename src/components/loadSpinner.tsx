type LoadSpinnerProp = {
    text?: String
    color?: String
    size?: String
}

export default function LoadSpinner ({text="Loading..."} : LoadSpinnerProp){
    return (
        <div className="flex items-center justify-center min-h-screen gap-2 p-4 text-green-800">
            <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-800"></div>
                <p className="font-semibold">{text}</p>
            </div>
        </div>
    )
}