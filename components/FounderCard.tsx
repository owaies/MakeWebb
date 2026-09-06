import { Glass } from './Glass'

type Founder={name:string;role:string;description:string;phone:string;email:string;focus:string;portfolio:string;github:string;linkedin:string}

function PortraitArt({name}:{name:string}){
  const first=name.includes('Owaies')
  return <div className={`portrait-art ${first?'portrait-owaies':'portrait-afaf'}`} aria-label={`${name} portrait placeholder`}>
    <div className="portrait-halo"/><div className="portrait-head"/><div className="portrait-hair"/><div className="portrait-body"/><div className="portrait-light"/>
  </div>
}

export function FounderCard({founder}:{founder:Founder}){
 return <Glass className="founder-card">
  <div className="card-kicker">{founder.focus}</div>
  <div className="portrait-wrap"><PortraitArt name={founder.name}/><span className="portrait-corner">↗</span></div>
  <div className="role-chip">Co-Founder</div>
  <h3>{founder.name}</h3><p className="founder-role">{founder.role}</p><p className="founder-description">{founder.description}</p>
  <div className="contact-lines"><span>☎ <b>{founder.phone}</b></span><span>✉ <b>{founder.email}</b></span></div>
  <div className="link-row"><a href={founder.portfolio}>◎ <span>Portfolio</span></a><a href={founder.github}>◉ <span>GitHub</span></a><a href={founder.linkedin}>in <span>LinkedIn</span></a></div>
 </Glass>
}
