import { NextResponse, NextRequest } from "next/server";
import { WEBSITE_URL, signingPages, imgExtensions, closedPages, API_URL, firstRolePages, secondRolePages, thirdRolePages } from "@/constants"
import axios from "axios";

async function GetAccessToken(req: NextRequest) {
    const accessToken = req.cookies.get("Authorization")?.value
    if (accessToken === undefined) {
        console.log("No access token!")
        return await RefreshAccessToken(req)
    }
    try {
        const getUserInfo = await axios.get(API_URL + '/auth/mebytoken', {
            params: {
                token: accessToken
            }
        })
        console.log("Access token auth status: " + getUserInfo.status)

        if (getUserInfo.status === 401) {
            console.log("Access token expired, refreshing it.")
            return await RefreshAccessToken(req)
        }

        console.log("Access token OK")
        return [false, accessToken]
    }
    catch (e) {
        if (e.status === 401) {
            console.log("Access token expired, refreshing it.")
            return await RefreshAccessToken(req)
        }
        console.log("Unexpected error during checking access token!")
        console.log(e)
    }

    return [true, undefined]
}

async function RefreshAccessToken(req: NextRequest) {
    const refreshToken = req.cookies.get("refresh_token")?.value

    if (refreshToken === undefined) {
        console.log("No refresh token!")
        return [true, undefined]
    }

    try {
        const getUserInfo = await axios.post(API_URL + '/auth/token/refresh', null, {
            params: {
                refresh_token: refreshToken
            }
        })

        if (getUserInfo.status === 401) {
            console.log("Refresh token expired!")
            return [true, undefined]
        }

        console.log("Access token refreshed")
        return [true, getUserInfo.data["access_token"]]
    }
    catch (e) {
        console.log("!Unexpected error during refreshing access token!")
        console.log(e.status, e.message)
    }

    return [true, undefined]
}

async function SetCookieIfNeeded(res: NextResponse, setCookie: boolean, accessToken: string) {
    const maxAgeMinutes = 60

    if (setCookie && accessToken) {
        res.cookies.set("Authorization", accessToken, {
            httpOnly: true,
            maxAge: maxAgeMinutes * 60,
        })
    }

    return res
}

export default async function middleware(req: NextRequest) {
    const resp = await GetAccessToken(req)
    const setCookie = resp[0]
    const accessToken = resp[1]
    const isAuthorized = accessToken !== undefined

    const url = req.url

    if (imgExtensions.some(elem => url.includes(elem))) {
        return NextResponse.next()
    }

    if (!isAuthorized && !signingPages.some(link => url.includes(link)))
        return SetCookieIfNeeded(NextResponse.redirect(WEBSITE_URL + '/sign-in'), setCookie, accessToken)

    if (isAuthorized && signingPages.some(link => url.includes(link)))
        return SetCookieIfNeeded(NextResponse.redirect(WEBSITE_URL + "/software"), setCookie, accessToken)

    if (isAuthorized && closedPages.some(link => url.includes(link)))
        return SetCookieIfNeeded(NextResponse.redirect(WEBSITE_URL + "/software"), setCookie, accessToken)

    if (isAuthorized) {
        const userRole = (await axios.get(API_URL + '/auth/mebytoken', {
            params: {
                token: accessToken
            }
        })).data["system_role_id"]

        if (
            (userRole === 1 && !firstRolePages.some(link => url.includes(link))) ||
            (userRole === 2 && !secondRolePages.some(link => url.includes(link))) ||
            (userRole === 3 && !thirdRolePages.some(link => url.includes(link))) ||
            (url === WEBSITE_URL + '/')
        ) {
            console.log("Redirect")
            return SetCookieIfNeeded(NextResponse.redirect(WEBSITE_URL + "/software"), setCookie, accessToken)
        }
    }

    return SetCookieIfNeeded(NextResponse.next(), setCookie, accessToken)
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
