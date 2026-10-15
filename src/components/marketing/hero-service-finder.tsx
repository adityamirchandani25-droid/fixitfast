"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, MapPin, Wrench } from "lucide-react";
import { CATEGORY_LABELS, CATEGORY_ORDER, type ServiceCategory } from "@/lib/categories";

export function HeroServiceFinder() {
  const router = useRouter();
  const [category, setCategory] = useState<ServiceCategory | "">("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = category ? `?category=${category}` : "";
    router.push(`/services${query}`);
  }

  return (
    <form className="landing-finder" onSubmit={handleSubmit}>
      <label className="landing-finder-select">
        <Wrench size={20} aria-hidden="true" />
        <span>
          <small>What do you need?</small>
          <select aria-label="Choose a home service" value={category} onChange={(event) => setCategory(event.target.value as ServiceCategory | "")}>
            <option value="">Choose a service</option>
            {CATEGORY_ORDER.map((item) => <option value={item} key={item}>{CATEGORY_LABELS[item]}</option>)}
          </select>
        </span>
        <ChevronDown size={18} aria-hidden="true" />
      </label>
      <button type="submit">See who&apos;s available <ArrowRight size={20} aria-hidden="true" /></button>
      <p><MapPin size={13} aria-hidden="true" /> Share your location to see pros nearby.</p>
    </form>
  );
}
