import Link from "next/link";
import { Trip, fmt } from "@/lib/data";
export default function TripCard({ t }: { t: Trip }) {
  return (
    <Link href={`/trips/${t.id}`} className="tripcard" aria-label={`See details: step ${t.step} of 4, ${t.stepLabel}`}>
      <div className="dates"><span className="dot" />{fmt(t)}</div>
      <div className="places">{t.places}</div>
      <div className="chips"><span className="chip">{t.adults} adults</span><span className="chip">{t.price}</span></div>
      <div className="steps">{[1,2,3,4].map(i => <i key={i} className={i < t.step ? "done" : i === t.step ? "now" : ""} />)}</div>
      <div className="tripfoot"><span>{t.stepLabel}</span><span className="pillbtn">See details</span></div>
    </Link>
  );
}
