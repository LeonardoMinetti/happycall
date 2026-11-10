"use client";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { pins } from "@/lib/data";

export default function MapPanel() {
  const el = useRef<HTMLDivElement>(null);
  const [big, setBig] = useState(false);
  const mapRef = useRef<import("leaflet").Map | undefined>(undefined);
  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el.current) return;
      map = L.map(el.current, { zoomControl: false, attributionControl: true, zoomSnap: 0.5 }).setView([36.6, -120.3], 5.5);
      mapRef.current = map;
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);
      pins.forEach(p => L.circleMarker([p.lat, p.lng], { radius: 9, color: "#1f3a9e", weight: 2, fillColor: "#3a5fd9", fillOpacity: .9 })
        .addTo(map!).bindTooltip(p.name, { permanent: true, direction: "right", className: "pin" }));
    })();
    return () => { cancelled = true; map?.remove(); mapRef.current = undefined; };
  }, []);
  useEffect(() => { setTimeout(() => mapRef.current?.invalidateSize(), 50); }, [big]);
  return (
    <div className="mapwrap" style={{ height: big ? 520 : 250 }}>
      <button className="expand" onClick={() => setBig(b => !b)}>{big ? "Collapse map" : "Expand map"}</button>
      <div ref={el} style={{ height: "100%" }} />
    </div>
  );
}
