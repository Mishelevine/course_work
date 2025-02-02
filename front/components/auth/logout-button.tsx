import React from 'react'
import axios from 'axios'
import { Button } from '../ui/button'
import { API_URL } from '@/constants'
import { useRouter } from "next/navigation";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

async function Logout(router: AppRouterInstance){
    axios.defaults.withCredentials = true
    axios.post(API_URL + '/auth/logout')
    .then(() => {
        router.push('/sign-in')
    })
    .catch(async (e) => {
        console.log("!Unexpected error while logging out!")
        console.log(e)
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
