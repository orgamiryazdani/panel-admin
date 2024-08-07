import { useEffect, useState } from "react";

export const usePageReloaded = () => {
    const [isPageReloaded, setIsPageReloaded] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = () => {
            setIsPageReloaded(true);
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return isPageReloaded;
};
