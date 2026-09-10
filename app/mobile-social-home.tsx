'use client';

import { CalendarDays, Clapperboard, Heart, Image, MapPin, Menu, MessageCircle, Plus, Search, ShieldCheck, Users } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function MobileSocialHome({ me, profiles, statuses, query, setQuery, name, onMenu, onMessages, onStatus, onVideo, onGroup, onEvent, onViewStatus, onProfile, onLike }: any) {
  const photo = (p: any) => p?.photos?.find((x: any) => !x.expired && x.status === 'approved');
  const locality = (p: any) => String(p?.location || '').split(',')[0]?.trim().toLowerCase();
  const nearby = profiles.filter((p: any) => Number.isFinite(p.distanceKm) || (locality(me) && locality(p) === locality(me))).sort((a: any, b: any) => (Number.isFinite(a.distanceKm) ? a.distanceKm : 99999) - (Number.isFinite(b.distanceKm) ? b.distanceKm : 99999)).slice(0, 6);
  return <div className="mobile-social-home">
    <header className="feed-topbar">
      <button onClick={onMenu} aria-label="Open menu"><Menu/></button>
      <strong>muslims <span>soulmate.</span></strong>
      <div><DropdownMenu><DropdownMenuTrigger asChild><button aria-label="Create something"><Plus/></button></DropdownMenuTrigger><DropdownMenuContent className="soulmate-create-menu" align="end" sideOffset={9}><DropdownMenuLabel><strong>Create</strong><span>Share with purpose</span></DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem onSelect={onStatus}><span className="create-menu-icon status"><Image/></span><span><strong>Status update</strong><small>Share a thought, photo, or moment for 24 hours</small></span></DropdownMenuItem><DropdownMenuItem onSelect={onVideo}><span className="create-menu-icon video"><Clapperboard/></span><span><strong>Short video</strong><small>Let people see more of your personality</small></span></DropdownMenuItem><DropdownMenuItem onSelect={onGroup}><span className="create-menu-icon group"><Users/></span><span><strong>Matchmaking circle</strong><small>Bring trusted community members together</small></span></DropdownMenuItem><DropdownMenuItem onSelect={onEvent}><span className="create-menu-icon event"><CalendarDays/></span><span><strong>Community event</strong><small>Plan a respectful public gathering</small></span></DropdownMenuItem></DropdownMenuContent></DropdownMenu><button onClick={() => document.getElementById('mobile-feed-search')?.focus()} aria-label="Search"><Search/></button><button onClick={onMessages} aria-label="Messages"><MessageCircle/></button></div>
    </header>
    <section className="feed-composer">
      <button className="feed-avatar" onClick={() => onProfile(me)}>{photo(me) ? <img src={'/api/camera?id=' + photo(me).id} alt="Your profile"/> : me?.name?.charAt(0)}</button>
      <button className="feed-prompt" onClick={onStatus}>Share a status update…</button>
      <button className="feed-photo" onClick={onStatus} aria-label="Share photo or video"><Image/></button>
    </section>
    <section className="feed-stories" aria-label="Status updates">
      <button className="feed-story create" onClick={onStatus}><span><Plus/></span><strong>Create status</strong></button>
      {nearby.map((p: any) => { const portrait = photo(p); return <button className="feed-story nearby" key={'nearby-' + p.id} onClick={() => onProfile(p)}>{portrait ? <img src={'/api/camera?id=' + portrait.id} alt=""/> : <span className="story-letter">{p.name.charAt(0)}</span>}<i><MapPin/></i><em>NEARBY</em><strong>{p.name.split(' ')[0]}<small>{Number.isFinite(p.distanceKm) ? `About ${Math.round(p.distanceKm)} km` : p.location}</small></strong></button>; })}
      {statuses.slice(0, 10).map((s: any) => { const owner = profiles.find((p: any) => p.id === s.owner), portrait = photo(owner); return <button className="feed-story" key={s.id} onClick={() => onViewStatus(s)}>{portrait ? <img src={'/api/camera?id=' + portrait.id} alt=""/> : <span className="story-letter">{name(s.owner).charAt(0)}</span>}<i>{name(s.owner).charAt(0)}</i><strong>{s.owner === me?.id ? 'Your status' : name(s.owner).split(' ')[0]}</strong></button>; })}
    </section>
    <div className="feed-search"><Search/><input id="mobile-feed-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search people, interests, or city" aria-label="Search people"/></div>
    <div className="feed-label"><span>People you may connect with</span><small><ShieldCheck/>Respectful community</small></div>
    <section className="connection-feed">
      {profiles.length ? profiles.map((p: any) => { const portrait = photo(p); return <article className="connection-post" key={p.id}>
        <button className="connection-author" onClick={() => onProfile(p)}><span>{portrait ? <img src={'/api/camera?id=' + portrait.id} alt=""/> : p.name.charAt(0)}</span><div><strong>{p.name}, {p.age}</strong><small>{p.location} · {p.religiosity}</small></div></button>
        <button className="connection-photo" onClick={() => onProfile(p)}>{portrait ? <img src={'/api/camera?id=' + portrait.id} alt={p.name}/> : <span>{p.name.split(' ').map((x: string) => x[0]).slice(0, 2).join('')}</span>}</button>
        <div className="connection-copy"><p>{p.bio}</p><div><span>{p.past}</span><span>{p.sect || 'Prefer not to say'}</span></div></div>
        <div className="connection-actions"><button onClick={() => onLike(p)}><Heart/>Say Asc</button><button onClick={() => onProfile(p)}><MessageCircle/>View profile</button></div>
      </article>; }) : <div className="feed-empty"><Heart/><strong>Your community is growing</strong><p>New member profiles will appear here when other testers join.</p></div>}
    </section>
  </div>;
}
