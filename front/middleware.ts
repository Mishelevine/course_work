import { NextResponse, NextRequest } from "next/server";
import { WEBSITE_URL, signingPages, imgExtensions, closedPages } from "@/constants"

export default function middleware(req: NextRequest){
  const isAuthorized = req.cookies.get("Authorization");
  const url = req.url

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
