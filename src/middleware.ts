import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]); // 定义哪些路由是公开的，不需要认证即可访问。设置了/sign-in及其所有子路由为公开路由

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", // 排除nextjs内部路由（_next）和静态文件如：css、图片、字体灯
    // Always run for API routes
    "/(api|trpc)(.*)", // 确保中间件会处理所有api路由（/api/*）和trpc路由（/trpc/*）
  ],
};
