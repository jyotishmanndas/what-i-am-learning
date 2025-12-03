import { useEffect, useState } from "react"

export const useOnline = () => {
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

    useEffect(() => {
        window.addEventListener("online", () => {
            setIsOnline(true)
        })
        window.addEventListener("offline", () => {
            setIsOnline(false)
        })
    })

    return isOnline
}