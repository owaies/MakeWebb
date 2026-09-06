import Image from 'next/image'
import { Glass } from './Glass'

type Founder = { name:string; role:string; description:string; phone:string; email:string; image:string; focus:string; portfolio:string; github:string; linkedin:string }

export function FounderCard({ founder }: { founder: Founder }) {
  return <Glass className="founder-card">
    <div className="card-kicker">{founder.focus}</div>
    <div className="portrait-wrap"><Image src={founder.image} alt={founder.name} fill sizes="(max-width: 767px) 90vw, 34vw" className="portrait" priority /></div>
    <div className="role-chip">Co-Founder</div>
    <h3>{founder.name}</h3><p className="founder-role">{founder.role}</p><p className="founder-description">{founder.description}</p>
    <div className="contact-lines"><span>↗ <b>{founder.phone}</b></span><span>✉ <b>{founder.email}</b></span></div>
    <div className="link-row"><a href={founder.portfolio}>◉ <span>Portfolio</span></a><a href={founder.github}>◌ <span>GitHub</span></a><a href={founder.linkedin}>in <span>LinkedIn</span></a></div>
  </Glass>
}
