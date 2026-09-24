import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const locationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

async function authenticatedUserId() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  return error || typeof userId !== "string" ? null : userId;
}

function unavailable(error: unknown) {
  console.error("Worker location update failed", error);
  return NextResponse.json(
    { error: "Location service is temporarily unavailable" },
    { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "2" } },
  );
}

/** The worker dashboard calls this periodically while location sharing is on.
 * A route handler fits this background heartbeat better than a form action. */
export async function POST(request: Request) {
  try {
    const userId = await authenticatedUserId();
    if (!userId) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    const body = await request.json().catch(() => null);
    const parsed = locationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "lat/lng out of range" }, { status: 400 });
    }

    const result = await prisma.provider.updateMany({
      where: { userId, approvalStatus: "APPROVED" },
      data: {
        currentLat: parsed.data.lat,
        currentLng: parsed.data.lng,
        locationUpdatedAt: new Date(),
        isOnline: true,
      },
    });
    if (result.count === 0) {
      return NextResponse.json(
        { error: "Your worker account isn’t approved for location sharing" },
        { status: 403 },
      );
    }

    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return unavailable(error);
  }
}

/** "Stop sharing my location" — takes the worker off the customer-facing
 * map immediately without discarding their last known position. */
export async function DELETE() {
  try {
    const userId = await authenticatedUserId();
    if (!userId) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    await prisma.provider.updateMany({
      where: { userId },
      data: { isOnline: false },
    });

    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return unavailable(error);
  }
}
