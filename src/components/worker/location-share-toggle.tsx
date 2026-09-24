"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, MapPinOff } from "lucide-react";

// A fresh update every 30 seconds keeps the worker comfortably inside the
// five-minute freshness window without reacting to every bit of GPS jitter.
const PING_INTERVAL_MS = 30_000;
const RETRY_START_MS = 2_000;
const RETRY_MAX_MS = 30_000;
const REQUEST_TIMEOUT_MS = 12_000;
const GEO_PERMISSION_DENIED = 1;

function isGeolocationError(error: unknown): error is GeolocationPositionError {
  return typeof error === "object" && error !== null && "code" in error;
}

function getCurrentPosition() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      maximumAge: 15_000,
      timeout: 10_000,
    });
  });
}

export function LocationShareToggle({ initialOnline }: { initialOnline: boolean }) {
  const [sharing, setSharing] = useState(initialOnline);
  const [error, setError] = useState<string | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!sharing || !("geolocation" in navigator)) return;

    let disposed = false;
    let inFlight = false;
    let retryDelay = RETRY_START_MS;

    function schedule(delay: number) {
      if (disposed) return;
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      retryTimerRef.current = setTimeout(() => void ping(), delay);
    }

    async function ping() {
      if (disposed || inFlight) return;
      if (!navigator.onLine) {
        setError("You’re offline. Location sharing will resume automatically.");
        schedule(RETRY_MAX_MS);
        return;
      }

      inFlight = true;
      try {
        const position = await getCurrentPosition();
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
        let response: Response;
        try {
          response = await fetch("/api/providers/location", {
            method: "POST",
            credentials: "same-origin",
            cache: "no-store",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeout);
        }

        if (!response.ok) {
          const body = await response.json().catch(() => null) as { error?: string } | null;
          if (response.status === 401 || response.status === 403) {
            setSharing(false);
            setError(response.status === 401
              ? "Your session expired. Sign in again to resume location sharing."
              : (body?.error ?? "This account can’t share a location right now."));
            return;
          }
          throw new Error(body?.error ?? `Location update failed (${response.status})`);
        }

        if (!disposed) {
          retryDelay = RETRY_START_MS;
          setError(null);
          schedule(PING_INTERVAL_MS);
        }
      } catch (cause) {
        if (disposed) return;
        if (isGeolocationError(cause) && cause.code === GEO_PERMISSION_DENIED) {
          setSharing(false);
          setError("Location permission is off. Turn it on to share your location.");
          void fetch("/api/providers/location", {
            method: "DELETE",
            credentials: "same-origin",
          }).catch(() => {});
          return;
        }

        const locationUnavailable = isGeolocationError(cause);
        setError(locationUnavailable
          ? "Your location is temporarily unavailable — retrying automatically."
          : "Server connection was interrupted — retrying automatically.");
        schedule(retryDelay);
        retryDelay = Math.min(retryDelay * 2, RETRY_MAX_MS);
      } finally {
        inFlight = false;
      }
    }

    function retryNow() {
      if (!disposed && navigator.onLine && document.visibilityState === "visible") schedule(0);
    }

    void ping();
    window.addEventListener("online", retryNow);
    document.addEventListener("visibilitychange", retryNow);
    return () => {
      disposed = true;
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
      window.removeEventListener("online", retryNow);
      document.removeEventListener("visibilitychange", retryNow);
    };
  }, [sharing]);

  async function handleToggle() {
    if (sharing) {
      setSharing(false);
      try {
        const response = await fetch("/api/providers/location", {
          method: "DELETE",
          credentials: "same-origin",
          cache: "no-store",
        });
        if (!response.ok) throw new Error("location stop failed");
        setError(null);
      } catch {
        setError("We couldn’t update your status. Your location will disappear automatically within five minutes.");
      }
      return;
    }
    if (!("geolocation" in navigator)) {
      setError("This browser doesn’t support location sharing.");
      return;
    }
    setError(null);
    setSharing(true);
  }

  return (
    <div className="ts-location-toggle">
      <button type="button" onClick={handleToggle} className={sharing ? "is-sharing" : ""}>
        {sharing ? <MapPin size={16} /> : <MapPinOff size={16} />}
        {sharing ? "Sharing your location" : "Share my location"}
      </button>
      <p>{error ?? (sharing ? "Customers within 50 miles can see you on the map." : "Turn this on so nearby customers can see you.")}</p>
    </div>
  );
}
