import { Glass } from './Glass'

type Founder={name:string;role:string;description:string;phone:string;email:string;focus:string;portfolio:string;github:string;linkedin:string}

export function FounderCard({founder}:{founder:Founder}){
 const initials=founder.name.split(' ').map(x=>x[0]).slice(0,2).join('')
 return <Glass className="founder-card">
  <div className="card-kicker">{founder.focus}</div>
  <div className="portrait-wrap"><div style={{height:'100%',display:'grid',placeItems:'center',alignContent:'center',gap:8,background:'radial-gradient(circle at 50% 35%,rgba(112,143,255,.38),transparent 42%),linear-gradient(160deg,#64708c,#071329)'}}><span style={{fontSize:72,fontWeight:800,letterSpacing:'-.08em',color:'#eaf0ff',textShadow:'0 0 30px rgba(91,123,255,.55)'}}>{initials}</span><small style={{fontSize:8,letterSpacing:'.22em',color:'#bdc9e2'}}>MAKEWEBB / FOUNDER</small></div></div>
  <div className="role-chip">Co-Founder</div>
  <h3>{founder.name}</h3><p className="founder-role">{founder.role}</p><p className="founder-description">{founder.description}</p>
  <div className="contact-lines"><span>↗ <b>{founder.phone}</b></span><span>✉ <b>{founder.email}</b></span></div>
  <div className="link-row"><a href={founder.portfolio}>◉ <span>Portfolio</span></a><a href={founder.github}>◌ <span>GitHub</span></a><a href={founder.linkedin}>in <span>LinkedIn</span></a></div>
 </Glass>
}
