'use client';

import { Eye, LockKeyhole } from 'lucide-react';

const labels: Record<string, string> = { all: 'All members', contacts: 'My connections', except: 'My connections except selected people', only: 'Only selected people' };

export default function StatusViewers({ status, user, name }: any) {
  if (status.owner !== user) return null;
  const viewers = status.viewers || [];
  return <div className="status-viewers">
    <span><LockKeyhole size={15}/>{labels[status.privacy] || 'All members'}</span>
    <div className="status-viewer-heading"><Eye size={17}/><strong>Viewed by {viewers.length}</strong></div>
    {viewers.length ? <div className="status-viewer-list">{viewers.map((v: any) => <div key={v.viewer}><span className="small-avatar">{name(v.viewer).charAt(0)}</span><strong>{name(v.viewer)}</strong><time>{new Date(v.viewed).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</time></div>)}</div> : <small>No one has viewed this status yet.</small>}
  </div>;
}
