import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/about",
  "/services",
  "/faq",
  "/manifest.json",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  if (request.nextUrl.pathname === "/manifest.json") {
    return NextResponse.rewrite(new URL("/manifest.json", request.url));
  }

  
  // If user is signed in and tries to access the landing page ("/"),
  // redirect them to the dashboard.
  if (userId && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip)).*)",
    "/manifest.json",
    "/manifest.webmanifest",
    "/(api|trpc)(.*)",
  ],
};