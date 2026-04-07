import { useEffect, useState } from "react"

export const useDebounce = <T>(value:T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        let myTimeOut = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(myTimeOut);
    }, [value, delay])

    return debouncedValue;
}