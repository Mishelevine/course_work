import React from 'react'
import axios from 'axios'
import { Button } from '../ui/button'
import { API_URL } from '@/constants'
import { useRouter } from "next/navigation";

const LogOutButton = ({additionalClassName}: {additionalClassName?: string | null}) => {
    const router = useRouter();
    return (
        <Button
            className={'bg-redbutton-2 hover:bg-redbutton-1 w-full ' + additionalClassName}
            onClick={() => {
                        axios.post(API_URL + '/auth/logout')
                        .then(() => {
                            router.push('/sign-in')
                        })
                        .catch((e) => {
                            console.log('Unexpected error', e)
                        })
            }}>
            Выйти
        </Button>
    )
}

export default LogOutButton
