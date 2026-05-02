import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 600) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value]);

    return debouncedValue as T;
}
