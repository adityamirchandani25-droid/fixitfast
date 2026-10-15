import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig, hasSupabaseConfig } from "@/lib/supabase/config";

// These render signed-in account data. Next's own default for dynamic
// pages (`no-cache, must-revalidate`) still lets a browser keep a copy and
// reuse it after a 304, and doesn't reliably stop back-forward-cache from
// restoring a rendered snapshot — so after logout, including via the back
// button on a shared computer, a cached page could still be shown. This is
// set here, in middleware, because it has to win over that default; a
// static next.config.ts headers() rule for the same paths is overwritten
// by it instead of the other way around.
const NO_STORE_PREFIXES = ["/dashboard", "/data-request", "/request", "/worker", "/company"];

function applyNoStore(request: NextRequest, response: NextResponse) {
  if (NO_STORE_PREFIXES.some((prefix) => request.nextUrl.pathname.startsWith(prefix))) {
    response.headers.set("Cache-Control", "no-store");
  }
  return response;
}

export async function refreshSupabaseSession(request: NextRequest) {
  if (!hasSupabaseConfig()) return applyNoStore(request, NextResponse.next({ request }));

  let response = NextResponse.next({ request });
  const { url, publishableKey } = getSupabaseConfig();
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([name, value]) =>
          response.headers.set(name, value),
        );
      },
    },
  });

  // Validate the JWT and refresh it when necessary before doing other work.
  await supabase.auth.getClaims();

  return applyNoStore(request, response);
}
