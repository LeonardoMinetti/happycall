import Link from "next/link";
import Redirect from "@/components/Redirect";
export default function Home() {
  return <main className="page"><Redirect to="/dashboard/" /><p>Opening the <Link href="/dashboard/" className="link">dashboard</Link>…</p></main>;
}
