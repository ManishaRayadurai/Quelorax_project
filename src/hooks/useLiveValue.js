import { useEffect, useRef, useState } from "react";

// Makes a stat feel "alive" by nudging it up/down slightly every few
// seconds — purely cosmetic, gives dashboards a real-time appearance
// without needing a real backend feed.
export default function useLiveValue(baseValue, { min, max, intervalMs = 4000, step = 1 } = {}) {
    const [value, setValue] = useState(baseValue);
    const baseRef = useRef(baseValue);

    useEffect(() => {
        baseRef.current = baseValue;
        setValue(baseValue);
    }, [baseValue]);

    useEffect(() => {
        const id = setInterval(() => {
            setValue((prev) => {
                const direction = Math.random() > 0.5 ? 1 : -1;
                const delta = Math.round(Math.random() * step) * direction;
                let next = prev + delta;
                if (typeof min === "number") next = Math.max(min, next);
                if (typeof max === "number") next = Math.min(max, next);
                return next;
            });
        }, intervalMs + Math.random() * 1500);
        return () => clearInterval(id);
    }, [intervalMs, step, min, max]);

    return value;
}
