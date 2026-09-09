'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LockKeyhole, UsersRound } from 'lucide-react';

export default function StatusPrivacy({ profiles, user, privacy, audience, onPrivacy, onAudience }: any) {
  const choices = profiles.filter((p: any) => p.id !== user && !String(p.id).startsWith('example'));
  const needsPeople = privacy === 'except' || privacy === 'only';
  const toggle = (id: string, checked: boolean) => onAudience(checked ? [...new Set([...audience, id])] : audience.filter((x: string) => x !== id));
  return <div className="status-privacy-box">
    <div className="status-privacy-heading"><LockKeyhole size={19}/><div><strong>Status privacy</strong><small>Choose who can see this update</small></div></div>
    <Select value={privacy} onValueChange={(value) => { onPrivacy(value); onAudience([]); }}>
      <SelectTrigger aria-label="Who can see this status"><SelectValue/></SelectTrigger>
      <SelectContent>
        <SelectItem value="contacts">My connections</SelectItem>
        <SelectItem value="except">My connections except…</SelectItem>
        <SelectItem value="only">Only share with…</SelectItem>
        <SelectItem value="all">All members</SelectItem>
      </SelectContent>
    </Select>
    {needsPeople && <div className="status-people"><span><UsersRound size={16}/>{privacy === 'only' ? 'Select people who can view it' : 'Select people to hide it from'}</span>{choices.length ? choices.map((p: any) => <label key={p.id}><Checkbox checked={audience.includes(p.id)} onCheckedChange={(v) => toggle(p.id, v === true)}/><span>{p.name}</span></label>) : <p>No other member profiles are available yet.</p>}</div>}
    <p>{privacy === 'all' ? 'Every unblocked member can view this status.' : privacy === 'contacts' ? 'Only members with an accepted Asc conversation can view it.' : privacy === 'except' ? `Your connections can view it except ${audience.length} selected.` : `Only ${audience.length} selected ${audience.length === 1 ? 'person' : 'people'} can view it.`}</p>
  </div>;
}
