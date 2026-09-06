import Hero from '@/components/Hero'
import { AboutTeam, Contact, Marquee, Projects, Services, Technology } from '@/components/Sections'

export default function Home(){return <main><Hero/><Marquee/><Services/><Projects/><Technology/><AboutTeam/><Contact/><footer><div className="brand"><span className="brand-mark">M</span><span>MakeWebb</span></div><span>Ideas into real products.</span><span>© {new Date().getFullYear()} MakeWebb</span></footer></main>}
