"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, LocateFixed, MapPin } from "lucide-react";
import type * as Leaflet from "leaflet";

type Point = { lat: number; lng: number };
type LocationState = "idle" | "locating" | "ready" | "denied" | "error";

/** A neighborhood illustration until the visitor chooses to share their location. */
function MapPreview() {
  return (
    <svg className="landing-map-preview" viewBox="0 0 680 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="680" height="600" fill="#e8efeb" />
      <path d="M0 0h285l70 95-22 91-158 48L0 178zM470 0h210v180l-112 45-106-58zM0 381l185-59 105 76-46 202H0zM471 323l209-45v322H349l29-167z" fill="#dce8de" />
      <path d="M0 122c103 33 158 103 247 91s145-95 234-77 138 100 199 75M-35 399c104-83 207-84 294-32s164 58 246 16 117-55 210-29M190-20c63 98 79 157 62 229s-40 155-18 231 73 127 102 186M503-20c-51 87-67 171-55 266s43 176 12 258-67 105-93 150" fill="none" stroke="#cbd9d3" strokeWidth="48" />
      <path d="M0 122c103 33 158 103 247 91s145-95 234-77 138 100 199 75M-35 399c104-83 207-84 294-32s164 58 246 16 117-55 210-29M190-20c63 98 79 157 62 229s-40 155-18 231 73 127 102 186M503-20c-51 87-67 171-55 266s43 176 12 258-67 105-93 150" fill="none" stroke="#fff" strokeWidth="35" />
      <path d="M27 262l121-36M25 510l125-34M338 41l76 54M334 288l83-29M536 444l113 19M551 71l98-15" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
      <g fill="#c6d8cc" opacity=".75">
        <rect x="37" y="29" width="92" height="45" rx="7" transform="rotate(13 37 29)" />
        <rect x="77" y="286" width="88" height="30" rx="6" transform="rotate(-17 77 286)" />
        <rect x="317" y="325" width="95" height="31" rx="6" transform="rotate(15 317 325)" />
        <rect x="514" y="264" width="111" height="33" rx="6" transform="rotate(-12 514 264)" />
        <rect x="524" y="520" width="88" height="36" rx="6" transform="rotate(8 524 520)" />
      </g>
      <path d="M5 566c74-65 146-43 186 34H0zM581 0h99v123c-68-11-95-48-99-123z" fill="#b8d6c1" />
      <circle cx="340" cy="278" r="62" fill="#e95122" opacity=".08" />
      <circle cx="340" cy="278" r="38" fill="#e95122" opacity=".12" />
      <circle cx="340" cy="278" r="18" fill="#fff" />
      <circle cx="340" cy="278" r="12" fill="#e95122" />
      <circle cx="340" cy="278" r="4" fill="#fff" />
    </svg>
  );
}

export function HeroLocationMap() {
  const container = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState<Point | null>(null);
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!center || !container.current) return;
    let disposed = false;
    let map: Leaflet.Map | null = null;
    let resize: ResizeObserver | null = null;

    void import("leaflet").then((L) => {
      if (disposed || !container.current) return;
      map = L.map(container.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: false,
      }).setView([center.lat, center.lng], 12);
      L.control.attribution({ position: "topright", prefix: false }).addTo(map);
      L.tileLayer(process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).on("tileerror", () => setMapError(true)).addTo(map);
      L.circle([center.lat, center.lng], { radius: 1000, color: "#e95122", weight: 1, fillColor: "#e95122", fillOpacity: .1, interactive: false }).addTo(map);
      L.circleMarker([center.lat, center.lng], { radius: 10, color: "#fff", weight: 4, fillColor: "#e95122", fillOpacity: 1 }).addTo(map).bindTooltip("You are here");
      resize = new ResizeObserver(() => map?.invalidateSize());
      resize.observe(container.current);
    }).catch(() => {
      if (!disposed) setMapError(true);
    });

    return () => {
      disposed = true;
      resize?.disconnect();
      map?.remove();
    };
  }, [center]);

  function showMyArea() {
    if (!("geolocation" in navigator)) {
      setLocationState("error");
      return;
    }
    setLocationState("locating");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCenter({ lat: coords.latitude, lng: coords.longitude });
        setLocationState("ready");
        setMapError(false);
      },
      (error) => setLocationState(error.code === error.PERMISSION_DENIED ? "denied" : "error"),
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 10_000 },
    );
  }

  return (
    <div className="landing-hero-visual landing-map-card">
      <MapPreview />
      {center && <div ref={container} role="img" className={`landing-map-canvas${mapError ? " is-unavailable" : ""}`} aria-label="Map centered on your approximate location" />}
      <div className="landing-map-topline"><MapPin size={14} /> {center ? "YOUR AREA" : "MAP PREVIEW"}</div>
      <div className="landing-map-caption">
        <div className="landing-map-caption-icon"><LocateFixed size={22} /></div>
        <div className="landing-map-caption-copy">
          <strong>{center ? "Right where you are." : "Good help starts close to home."}</strong>
          <p>{center ? "Your neighborhood is on the map. Explore the pros around you." : "Share your location to see your neighborhood on the map."}</p>
          {locationState === "denied" && <small role="status">Allow location in your browser settings to show your area.</small>}
          {locationState === "error" && <small role="status">We couldn&apos;t get your location. Please try again.</small>}
          {mapError && <small role="status">Map tiles couldn&apos;t load. You can still browse local services.</small>}
        </div>
        {center ? (
          <Link href="/services" className="landing-map-action">Explore pros <ArrowRight size={17} /></Link>
        ) : (
          <button type="button" onClick={showMyArea} disabled={locationState === "locating"} className="landing-map-action">
            {locationState === "locating" ? "Finding you…" : "Show my area"} <ArrowRight size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
