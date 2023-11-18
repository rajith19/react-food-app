import { useEffect, useState } from "react";

const useOnelineStatus = () => {

    const [onlineStatus, useOnlineStatus] = useState(true);
    useEffect(() => {
        window.addEventListener("offline", (event) => {
            useOnlineStatus(false);
        });
        window.addEventListener("online", (event) => {
            useOnlineStatus(true);
        });
    }, [])

    return onlineStatus;
}

export default useOnelineStatus;