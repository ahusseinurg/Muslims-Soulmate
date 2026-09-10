'use client';

import { useState } from 'react';
import { Bell, CalendarDays, Check, Clapperboard, Heart, Image, MapPin, Menu, MessageCircle, Plus, RefreshCw, Search, ShieldCheck, Users, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function MobileSocialHome({ me, profiles, statuses, query, setQuery, name, pendingCount = 0, connectionCount = 0, onMenu, onMessages, onStatus, onVideo, onGroup, onEvent, onRefresh, onViewStatus, onProfile, onLike }: any) {
  const [filter, setFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const photo = (p: any) => p?.photos?.find((x: any) => !x.expired && x.status === 'approved');
  const locality = (p: any) => String(p?.location || '').split(',')[0]?.trim().toLowerCase();
  const nearby = profiles.filter((p: any) => p.id.startsWith('example') || Number.isFinite(p.distanceKm) || (locality(me) && locality(p) === locality(me))).sort((a: any, b: any) => (Number.isFinite(a.distanceKm) ? a.distanceKm : 99999) - (Number.isFinite(b.distanceKm) ? b.distanceKm : 99999)).slice(0, 12);
  const visibleProfiles = profiles.filter((p: any) => filter === 'All' || (filter === 'Nearby' ? Number.isFinite(p.distanceKm) || locality(p) === locality(me) : p.gender === filter));
  async function refreshHome(){setRefreshing(true);try{await onRefresh?.();}finally{setTimeout(()=>setRefreshing(false),350);}}
  return <div className="mobile-social-home">
    <header className="feed-topbar">
      <button onClick={onMenu} aria-label="Open menu"><Menu/></button>
      <strong>muslims <span>soulmate.</span></strong>
      <div><DropdownMenu><DropdownMenuTrigger asChild><button aria-label="Create something"><Plus/></button></DropdownMenuTrigger><DropdownMenuContent className="soulmate-create-menu" align="end" sideOffset={9}><DropdownMenuLabel><strong>Create</strong><span>Share with purpose</span></DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem onSelect={onStatus}><span className="create-menu-icon status"><Image/></span><span><strong>Status update</strong><small>Share a thought, photo, or moment for 24 hours</small></span></DropdownMenuItem><DropdownMenuItem onSelect={onVideo}><span className="create-menu-icon video"><Clapperboard/></span><span><strong>Short video</strong><small>Let people see more of your personality</small></span></DropdownMenuItem><DropdownMenuItem onSelect={onGroup}><span className="create-menu-icon group"><Users/></span><span><strong>Matchmaking circle</strong><small>Bring trusted community members together</small></span></DropdownMenuItem><DropdownMenuItem onSelect={onEvent}><span className="create-menu-icon event"><CalendarDays/></span><span><strong>Community event</strong><small>Plan a respectful public gathering</small></span></DropdownMenuItem></DropdownMenuContent></DropdownMenu><DropdownMenu><DropdownMenuTrigger asChild><button className="notification-trigger" aria-label={`${pendingCount} new notifications`}><Bell/>{pendingCount > 0 && <b>{pendingCount}</b>}</button></DropdownMenuTrigger><DropdownMenuContent className="home-notification-menu" align="end" sideOffset={9}><DropdownMenuLabel><strong>Activity</strong><span>Your latest connections</span></DropdownMenuLabel><DropdownMenuSeparator/>{pendingCount > 0 ? <DropdownMenuItem onSelect={onMessages}><span className="activity-icon"><MessageCircle/></span><span><strong>{pendingCount} new Asc {pendingCount === 1 ? 'inquiry' : 'inquiries'}</strong><small>Open Messages to choose whether to reply</small></span></DropdownMenuItem> : <div className="activity-empty"><Check/><strong>You’re all caught up</strong><small>New inquiries and replies will appear here.</small></div>}{connectionCount > 0 && <DropdownMenuItem onSelect={onMessages}><span className="activity-icon accepted"><Heart/></span><span><strong>{connectionCount} active {connectionCount === 1 ? 'connection' : 'connections'}</strong><small>Continue your respectful conversations</small></span></DropdownMenuItem>}<DropdownMenuSeparator/><DropdownMenuItem onSelect={refreshHome}><RefreshCw/><span><strong>Refresh activity</strong><small>Check for the latest updates</small></span></DropdownMenuItem></DropdownMenuContent></DropdownMenu><button onClick={onMessages} aria-label="Messages"><MessageCircle/></button></div>
    </header>
    <section className="feed-composer">
      <button className="feed-avatar" onClick={() => onProfile(me)}>{photo(me) ? <img src={'/api/camera?id=' + photo(me).id} alt="Your profile"/> : me?.name?.charAt(0)}</button>
      <button className="feed-prompt" onClick={onStatus}>Share something meaningful…</button>
      <button className="feed-photo" onClick={onStatus} aria-label="Share photo or video"><Image/></button>
    </section>
    <section className="feed-stories" aria-label="Status updates">
      <button className="feed-story create" onClick={onStatus}><span><Plus/></span><strong>Create status</strong></button>
      {nearby.map((p: any) => { const portrait = photo(p), sample = p.id.startsWith('example'); return <button className="feed-story nearby" key={'nearby-' + p.id} onClick={() => onProfile(p)}>{p.image ? <img src={p.image} alt=""/> : portrait ? <img src={'/api/camera?id=' + portrait.id} alt=""/> : <span className="story-letter">{p.name.charAt(0)}</span>}<i><MapPin/></i><em>{sample ? 'DISCOVER' : 'NEARBY'}</em><strong>{p.name.split(' ')[0]}<small>{Number.isFinite(p.distanceKm) ? `About ${Math.round(p.distanceKm)} km` : p.location}</small></strong></button>; })}
      {statuses.slice(0, 10).map((s: any) => { const owner = profiles.find((p: any) => p.id === s.owner), portrait = photo(owner); return <button className="feed-story" key={s.id} onClick={() => onViewStatus(s)}>{portrait ? <img src={'/api/camera?id=' + portrait.id} alt=""/> : <span className="story-letter">{name(s.owner).charAt(0)}</span>}<i>{name(s.owner).charAt(0)}</i><strong>{s.owner === me?.id ? 'Your status' : name(s.owner).split(' ')[0]}</strong></button>; })}
    </section>
    <div className="feed-tools"><div className="feed-search"><Search/><input id="mobile-feed-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search people, interests, or city" aria-label="Search people"/>{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X/></button>}</div><button className={refreshing ? 'home-refresh refreshing' : 'home-refresh'} onClick={refreshHome} aria-label="Refresh profiles"><RefreshCw/></button></div>
    <div className="home-filters" aria-label="Filter profiles">{['All','Nearby','Woman','Man'].map(x => <button key={x} className={filter === x ? 'active' : ''} onClick={() => setFilter(x)}>{x === 'Nearby' && <MapPin/>}{x}</button>)}</div>
    <div className="feed-label"><span>Discover with intention</span><small><ShieldCheck/>Respectful community</small></div>
    <section className="connection-feed">
      {visibleProfiles.length ? visibleProfiles.map((p: any) => { const portrait = photo(p); return <article className="connection-post" key={p.id}>
        <button className="connection-author" onClick={() => onProfile(p)}><span>{portrait ? <img src={'/api/camera?id=' + portrait.id} alt=""/> : p.name.charAt(0)}</span><div><strong>{p.name}, {p.age}</strong><small>{p.location} · {p.religiosity}</small></div></button>
        <button className="connection-photo" onClick={() => onProfile(p)}>{portrait ? <img src={'/api/camera?id=' + portrait.id} alt={p.name}/> : <span>{p.name.split(' ').map((x: string) => x[0]).slice(0, 2).join('')}</span>}</button>
        <div className="connection-copy"><p>{p.bio}</p><div><span>{p.past}</span><span>{p.sect || 'Prefer not to say'}</span></div></div>
        <div className="connection-actions"><button onClick={() => onLike(p)}><Heart/>Say Asc</button><button onClick={() => onProfile(p)}><MessageCircle/>View profile</button></div>
      </article>; }) : <div className="feed-empty"><Search/><strong>No profiles match this view</strong><p>Try another filter or clear your search.</p><button className="outline" onClick={() => {setFilter('All');setQuery('');}}>Show everyone</button></div>}
    </section>
  </div>;
}
