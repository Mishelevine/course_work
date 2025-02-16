import { API_URL } from "@/constants"
import axios from "axios"
import { useEffect, useState } from "react"

export const useUser = (
    dep?: any
) => {
    const [userRole, setUserRole] = useState<number>(0)
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                axios.defaults.withCredentials = true
                const userRole = (await axios.get(`${API_URL}/auth/me`)).data["system_role_id"]
                setUserRole(userRole)
            } catch(e) {
                console.log(e)
            }
        }

        fetchUserRole()
        setIsLoadingUser(false)
    }, [dep])

    return { userRole, isLoadingUser }
}
