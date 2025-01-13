import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, LOWEST_ROLE } from "@/constants";

const useUser = () => {
    const [userRole, setUserRole] = useState(LOWEST_ROLE);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetUserInfo = async () => {
        setIsLoading(true)
        console.log("HELLO")
        try {

        }
        catch {

        }
    };

    return [ userRole, isLoading ]
}

export default useUser
