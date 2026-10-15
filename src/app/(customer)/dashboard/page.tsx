import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Plus, ClipboardList } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "./dashboard.css";
import { auth } from "@/lib/auth";
import { listMyRequests, listMyAddresses } from "@/lib/actions/requests";
import { CATEGORY_LABELS } from "@/lib/categories";
import { CategoryIcon } from "@/components/category-icon";
import { RequestStatusBadge } from "@/components/request-status-badge";
import { UrgencyBadge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NearbyWorkersMap } from "@/components/customer/nearby-workers-map";

export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";
  const [requests, addresses] = await Promise.all([listMyRequests(), listMyAddresses()]);
  const homeBase = addresses.find((address) => address.isDefault) ?? addresses[0];

  return (
    <div className="cd-dashboard mx-auto w-full max-w-5xl px-6 py-12">
      <span className="site-overline">Hi {firstName}</span>
      <h1 className="site-display">Your requests</h1>
      <p className="site-lede">View your requests and their current status.</p>

      <div className="site-band mt-8 flex flex-col items-start justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#ffad90]">
            <Plus className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-white">Need help with something?</p>
            <p className="mt-0.5 text-[13px] leading-snug text-[#c8d9d9]">Choose a service and see a starting estimate before you send.</p>
          </div>
        </div>
        <Link href="/request/new">
          <Button size="md">
            New request
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Button>
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="site-heading">Workers near you</h2>
        <p className="mt-1 text-[13px] leading-snug text-ink-500">Live locations of workers currently on the clock within 50 miles.</p>
        <div className="mt-3">
          <NearbyWorkersMap fallback={homeBase ? { lat: homeBase.lat, lng: homeBase.lng } : null} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="site-heading">Request history</h2>

        {requests.length === 0 ? (
          <Card className="mt-3">
            <CardContent className="py-10 text-center">
              <ClipboardList size={30} className="mx-auto mb-4 text-ink-400" />
              <h3 className="text-[15px] font-semibold tracking-[-0.01em]">No requests yet</h3>
              <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-ink-500">Once you send a request, you’ll see its details, estimate, and assignment status here.</p>
              <Link href="/services" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Browse services <ArrowRight size={15} /></Link>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            {requests.map((request) => (
              <Link key={request.id} href={`/request/${request.id}`} className="cd-row">
                <Card className="cd-card">
                  <CardContent className="flex items-center gap-3.5 px-4 py-3.5">
                    <span className="cd-row-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                      <CategoryIcon category={request.category} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold tracking-[-0.006em] text-ink-900">
                          {CATEGORY_LABELS[request.category]}
                        </p>
                        <UrgencyBadge urgency={request.urgency} />
                      </div>
                      <p className="mt-0.5 truncate text-xs tracking-[0.005em] text-ink-500">
                        {request.address.line1} &middot;{" "}
                        <span className="tabular-nums">{format(request.createdAt, "MMM d, h:mm a")}</span>
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <RequestStatusBadge status={request.status} />
                      <span className="text-xs font-medium tabular-nums text-ink-600">
                        ${Number(request.priceEstimateLow)}&ndash;${Number(request.priceEstimateHigh)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
