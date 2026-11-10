import { trips } from "@/lib/data";
import TripDetail from "@/components/TripDetail";

export function generateStaticParams() {
  return trips.map(t => ({ id: t.id }));
}
export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TripDetail trip={trips.find(x => x.id === id) ?? trips[0]} />;
}
