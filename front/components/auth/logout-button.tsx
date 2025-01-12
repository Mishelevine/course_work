import React from 'react'
import axios from 'axios'
import { Button } from '../ui/button'
import { API_URL } from '@/constants'
import { useRouter } from "next/navigation";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

async function RefreshAccessToken() {
    try {
        const getUserInfo = await axios.post(API_URL + '/auth/token/refresh')

        if (getUserInfo.status === 401){
            return false
        }

        return true
    }
    catch(e) {
        console.log(e)
        console.log("!Unexpected error during refreshing access token!")
        console.log(e.status, e.message)
    }

    return false
}

async function Logout(router: AppRouterInstance){
    axios.post(API_URL + '/auth/logout')
    .then(() => {
        router.push('/sign-in')
    })
    .catch(async (e) => {
        if (e.status === 401){
            await RefreshAccessToken()
            router.push('/sign-in')
        }
        else{
            console.log("!Unexpected error while logging out!")
            console.log(e)
        }
    })
}

const LogOutButton = ({additionalClassName}: {additionalClassName?: string | null}) => {
    const router = useRouter();
    return (
        <Button
            className={'bg-redbutton-2 hover:bg-redbutton-1 w-full ' + additionalClassName}
            onClick={() => Logout(router)}
        >
            Выйти
        </Button>
    )
}

export default LogOutButton
