import {env} from 'cloudflare:workers';
export function database(){if(!env.DB)throw new Error('Storage is unavailable. Please try again.');return env.DB;}
export function clean(v:unknown,max=1000){if(typeof v!=='string'||v.trim().length>max)throw new Error('Please enter valid text.');const s=v.trim();if(/\b(fuck\w*|shit\w*|bitch\w*|asshole\w*|cunt\w*|nigg\w*|porn\w*)\b/i.test(s.normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g,'')))throw new Error('Please be respectful. Swear words and sexual content are not allowed.');return s;}
export async function blocked(a:string,b:string){return !!await database().prepare('SELECT id FROM blocks WHERE (owner=? AND target=?) OR (owner=? AND target=?)').bind(a,b,b,a).first();}
export async function allowedThread(id:string,u:string){const db=database();const q:any=await db.prepare("SELECT * FROM inquiries WHERE id=? AND status='accepted' AND (sender=? OR recipient=?)").bind(id,u,u).first();if(q)return !(await blocked(q.sender,q.recipient));return !!await db.prepare('SELECT id FROM members WHERE group_id=? AND user=?').bind(id,u).first();}
export const json=(d:unknown,status=200)=>Response.json(d,{status,headers:{'Cache-Control':'no-store'}});

export function isReviewer(user:any){const email=(env as unknown as {PROFILE_REVIEWER_EMAIL?:string}).PROFILE_REVIEWER_EMAIL;return !!email&&user?.email?.toLowerCase()===email.toLowerCase();}
