import { NextResponse, NextRequest } from "next/server";
import { WEBSITE_URL, signingPages, imgExtensions, closedPages, API_URL } from "@/constants"
import axios from "axios";

async function GetAccessToken(req: NextRequest) {
    const accessToken = req.cookies.get("Authorization")?.value
    if (accessToken === undefined){
        console.log("No access token!")
        return await RefreshAccessToken(req)
    }
    debugger;
    try {
        const getUserInfo = await axios.get(API_URL + '/auth/mebytoken', {
            params: {
                token: accessToken
            }
        })
        console.log("Access token auth status: " + getUserInfo.status)

        if (getUserInfo.status === 401){
            console.log("Access token expired, refreshing it.")
            return await RefreshAccessToken(req)
        }

        console.log("Access token OK")
        return [false, accessToken]
    }
    catch (e) {
        console.log("Unexpected error during checking access token!")
        console.log(e.status, e.message)
    }

    return [true, undefined]
}

async function RefreshAccessToken(req: NextRequest) {
    const refreshToken = req.cookies.get("refresh_token")?.value

    if (refreshToken === undefined){
        console.log("No refresh token!")
        return [true, undefined]
    }

    try {
        const getUserInfo = await axios.post(API_URL + '/auth/token/refresh', null, { params: {
            refresh_token: refreshToken
        }})

        if (getUserInfo.status === 401){
            console.log("Refresh token expired!")
            return [true, undefined]
        }

        console.log("Access token refreshed")
        return [true, getUserInfo.data["access_token"]]
    }
    catch(e) {
        console.log("!Unexpected error during refreshing access token!")
        console.log(e.status, e.message)
    }

    return [true, undefined]
}

async function SetCookieIfNeeded(res: NextResponse, setCookie: boolean, accessToken: string) {
    const maxAgeMinutes = 15

    if (setCookie && accessToken) {
        res.cookies.set("Authorization", accessToken, {
            httpOnly: true,
            maxAge: maxAgeMinutes * 60,
        })
    }

    return res
}

export default async function middleware(req: NextRequest){
    const resp = await GetAccessToken(req)
    const setCookie = resp[0]
    const accessToken = resp[1]
    const isAuthorized = accessToken !== undefined

    const url = req.url

    if(imgExtensions.some(elem => url.includes(elem))){
        return NextResponse.next()
    }

    if(!isAuthorized && !signingPages.some(link => url.includes(link))){
        const res = NextResponse.redirect(WEBSITE_URL + '/sign-in')
        return SetCookieIfNeeded(res, setCookie, accessToken)
    }

    if (isAuthorized && signingPages.some(link => url.includes(link))){
        console.log("here")
        const res = NextResponse.redirect(WEBSITE_URL)
        return SetCookieIfNeeded(res, setCookie, accessToken)
    }

    if (isAuthorized && closedPages.some(link => url.includes(link))){
        const res = NextResponse.redirect(WEBSITE_URL)
        return SetCookieIfNeeded(res, setCookie, accessToken)
    }

    const res = NextResponse.next()
    return SetCookieIfNeeded(res, setCookie, accessToken)
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
