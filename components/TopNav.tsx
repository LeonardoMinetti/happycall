"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const tabs = [["Dashboard", "/dashboard"], ["Invites", "/offers"], ["Trips", "/trips"]] as const;
export default function TopNav() {
  const path = usePathname();
  return (
    <>
      <nav className="topnav">
        <Link href="/dashboard" className="brand"><Logo />Driftwell</Link>
        <Link href="/dashboard" className="newtrip" aria-label="Add a new trip">+ New trip</Link>
        <div className="tabs">
          {tabs.map(([l, h]) => <Link key={h} href={h} aria-current={path === h ? "page" : undefined}>{l}</Link>)}
        </div>
        <div className="toplinks">
          <Link href="/dashboard">About</Link><Link href="/dashboard">How it works</Link>
          <Link href="/dashboard">For hotels</Link><Link href="/dashboard">Guest demand</Link>
          <span className="avatar" aria-label="Account and settings">L</span>
        </div>
      </nav>
      <Link href="/dashboard" className="fab">+ New trip</Link>
    </>
  );
}
