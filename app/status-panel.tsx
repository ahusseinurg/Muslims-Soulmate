'use client';

import { Camera, Clock, Plus, Sparkles } from 'lucide-react';

export default function StatusPanel({ statuses, user, now, name, onCreate, onView }: any) {
  const mine = statuses.filter((s: any) => s.owner === user);
  const others = statuses.filter((s: any) => s.owner !== user);
  const card = (s: any, index: number) => <button className={`status-card status-tone-${index % 5}`} key={s.id} onClick={() => onView(s)}>
    <span className="status-ring"><span>{name(s.owner).charAt(0)}</span></span>
    <span className="status-copy"><strong>{s.owner === user ? 'My status' : name(s.owner)}</strong><span>{s.body || (s.media ? 'Shared a photo or video' : 'New status')}</span><small><Clock size={13}/>{Math.max(1, Math.ceil((s.expires - now) / 3600000))}h left</small></span>
  </button>;
  return <div className="status-page">
    <section className="status-create">
      <div className="snap-camera"><Camera size={34}/><Sparkles size={18}/></div>
      <div><span className="beta-badge">24-HOUR STATUS</span><h2>Share what’s happening</h2><p>Post a photo, short video, or a few words. Your update disappears automatically after 24 hours.</p></div>
      <button className="primary" onClick={onCreate}><Plus size={19}/>Add status</button>
    </section>
    {mine.length > 0 && <section><div className="status-section-title"><h2>My status</h2><span>{mine.length}</span></div><div className="status-grid">{mine.map(card)}</div></section>}
    <section><div className="status-section-title"><h2>Recent updates</h2><span>{others.length}</span></div>{others.length ? <div className="status-grid">{others.map(card)}</div> : <div className="status-empty"><span className="status-ring add"><Plus/></span><h3>No recent updates</h3><p>Status updates from people in the community will appear here.</p><button className="outline" onClick={onCreate}>Be the first to post</button></div>}</section>
    <div className="safety-inline">Status is visible to members. Do not share your home address, phone number, financial information, or live location.</div>
  </div>;
}
