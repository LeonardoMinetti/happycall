import { trips, fmt, nights } from "@/lib/data";
import TripDetail from "@/components/TripDetail";

export function generateStaticParams() {
  return trips.map(t => ({ id: t.id }));
}

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = trips.find(x => x.id === id) ?? trips[0];
  return <TripDetail id={t.id} dates={fmt(t)} nights={nights(t)} adults={t.adults} places={t.places} startISO={t.start.toISOString()} />;
}
