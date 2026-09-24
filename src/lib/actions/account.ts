"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ActionResult } from "@/lib/actions/auth";

/**
 * Self-service "delete my data" request. We de-identify personal fields
 * rather than hard-deleting the User row: ServiceRequest/Job/Payment rows
 * reference it (and legally need to be kept for accounting/dispute records
 * for a retention period), so a hard delete would either be blocked by
 * foreign keys or destroy financial history we're required to keep. This
 * is the same "erase personal identifiers, keep the minimum transaction
 * record" approach described in the Privacy Policy's retention section.
 */
export async function deleteMyAccount(): Promise<ActionResult> {
  const session = await auth();
  if (!session) {
    return { ok: false, error: "Sign in to request account deletion." };
  }

  const userId = session.user.id;

  try {
    const deletedEmail = `deleted-${userId}@deleted.fixitfast.invalid`;

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          name: "Deleted user",
          email: deletedEmail,
          phone: null,
          passwordHash: null,
          image: null,
        },
      }),
      // Saved addresses never attached to a request carry no retention
      // need — remove them outright.
      prisma.address.deleteMany({
        where: { userId, serviceRequests: { none: {} } },
      }),
      // Addresses tied to a past request stay (the request/job/payment
      // history references them), but strip the street-level detail.
      prisma.address.updateMany({
        where: { userId, serviceRequests: { some: {} } },
        data: { label: "Deleted", line1: "[redacted]", line2: null, lat: 0, lng: 0 },
      }),
      prisma.provider.updateMany({
        where: { userId },
        data: { bio: null, isOnline: false, currentLat: null, currentLng: null, locationUpdatedAt: null },
      }),
      prisma.company.updateMany({
        where: { userId },
        data: { name: "Deleted company", phone: null },
      }),
    ]);

    // Disable the login itself so the account can't be used again.
    try {
      const admin = createSupabaseAdminClient();
      await admin.auth.admin.deleteUser(userId);
    } catch (error) {
      console.error("Supabase auth user deletion failed during account deletion", error);
    }

    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut({ scope: "global" });

    return { ok: true };
  } catch (error) {
    console.error("Account deletion failed", error);
    return {
      ok: false,
      error: "We couldn't complete deletion automatically. Email support and we'll do it by hand.",
    };
  }
}
