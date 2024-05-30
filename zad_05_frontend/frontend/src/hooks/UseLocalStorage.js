import {useEffect, useState} from "react";

export function useLocalStorage(key, initialValue) {
    const [storage, setStorage] = useState(() => {
            const currentStorageContent = localStorage.getItem(key)
            if (currentStorageContent != null)
                return JSON.parse(currentStorageContent)
            else
                return initialValue
        }
    )

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storage))
    }, [key, storage]);

    return [storage, setStorage]
}