import { useState, useEffect } from "react";

const useDebounce = ({keyword, delay} : {keyword?: string | undefined, delay: number}) : string => {
    const [debounceVal, setDebounceVal] = useState(keyword)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(keyword?.trim().toLowerCase())
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [delay, keyword])

    return debounceVal as string
} 

export default useDebounce