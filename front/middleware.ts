import { NextResponse, NextRequest } from "next/server";
import { WEBSITE_URL, signingPages, imgExtensions, closedPages, API_URL } from "@/constants"
import axios from "axios";

export async function CheckAccessToken(
    accessToken: string | undefined,
    refreshToken: string | undefined
) {
    if (accessToken === undefined){
        console.log("No access token!")
        return await RefreshAccessToken(refreshToken)
    }

    try {
        const getUserInfo = await axios.get(API_URL + '/auth/mebytoken', {
            params: {
                token: accessToken
            }
        })
        console.log("Access token auth status: " + getUserInfo.status)

        if (getUserInfo.status === 401){
            console.log("Access token expired, refreshing it.")
            return await RefreshAccessToken(refreshToken)
        }

        console.log("Access token OK")
        return true
    }
    catch (e) {
        console.log("Unexpected error during checking access token!")
        console.log(e.status, e.message)
    }

    return false
}

export async function RefreshAccessToken(refreshToken: string | undefined) {
    if (refreshToken === undefined){
        console.log("No refresh token!")
        return false
    }

    try {
        const getUserInfo = await axios.post(API_URL + '/auth/token/refresh', {
            params: {
                refresh_token: refreshToken
            }
        })

        console.log(getUserInfo)

        if (getUserInfo.status === 401){
            console.log("Refresh token expired!")
            return false
        }

        console.log("Access token refreshed")
        return true
    }
    catch(e) {
        console.log("!Unexpected error during refreshing access token!")
        console.log(e.status, e.message)
    }

    return false
}

export default async function middleware(req: NextRequest){
    // const accessToken = req.cookies.get("Authorization")?.value
    // const refreshToken = req.cookies.get("refresh_token")?.value

    // const isAuthorized = await CheckAccessToken(accessToken, refreshToken)
    // const url = req.url

    // if(imgExtensions.some(elem => url.includes(elem))){
    //   return NextResponse.next()
    // }

    // if(!isAuthorized && !signingPages.some(link => url.includes(link))){
    //   return NextResponse.redirect(WEBSITE_URL + '/sign-in')
    // }

    // if (isAuthorized && signingPages.some(link => url.includes(link))){
    //   return NextResponse.redirect(WEBSITE_URL)
    // }

    // if (isAuthorized && closedPages.some(link => url.includes(link))){
    //   return NextResponse.redirect(WEBSITE_URL)
    // }
}

export const config = {
    matcher: [
      /*
      * Match all request paths except for the ones starting with:
      * - api (API routes)
      * - _next/static (static files)
      * - _next/image (image optimization files)
      * - favicon.ico (favicon file)
      */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
