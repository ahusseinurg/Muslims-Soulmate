'use client';

import { CheckCheck, ChevronRight, Clock, MessageCircle, Users } from 'lucide-react';

type Props = {
  data: any;
  inquiries: any[];
  now: number;
  busy: boolean;
  name: (id: string) => string;
  activeId?: string;
  openThread: (thread: any) => void;
  reply: (id: string, accept: boolean) => void;
};

function preview(last: any, fallback: string) {
  if (!last) return fallback;
  if (last.attachment_kind === 'audio') return '🎤 Voice message';
  if (last.attachment_kind === 'image') return '📷 Photo';
  if (last.attachment_kind === 'video') return '🎥 Video';
  return last.body || fallback;
}

function timeLabel(value: number) {
  if (!value) return '';
  const date = new Date(value);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function ChatList({ data, inquiries, now, busy, name, activeId, openThread, reply }: Props) {
  const latest = new Map((data.lastMessages || []).map((m: any) => [m.thread, m]));
  const rows = [
    ...inquiries.filter((q: any) => q.status === 'accepted').map((q: any) => {
      const personId = q.sender === data.user ? q.recipient : q.sender;
      const last: any = latest.get(q.id);
      return { id: q.id, kind: 'person', title: name(personId), subtitle: preview(last, 'You can now message each other'), updated: last?.created || q.created, mine: last?.sender === data.user, thread: { ...q, name: name(personId) } };
    }),
    ...data.groups.filter((g: any) => g.joined).map((g: any) => {
      const last: any = latest.get(g.id);
      return { id: g.id, kind: 'group', title: g.name, subtitle: preview(last, `${g.count} members`), updated: last?.created || 0, mine: last?.sender === data.user, thread: g };
    }),
  ].sort((a: any, b: any) => b.updated - a.updated);
  const requests = inquiries.filter((q: any) => q.status === 'pending');

  return <section className="panel chat-inbox">
    <div className="inbox-heading"><div><h2>Chats</h2><p>People and groups in one place</p></div><span>{rows.length + requests.length}</span></div>
    <div className="chat-search"><MessageCircle size={17}/><span>Recent conversations</span></div>
    {requests.map((q: any) => {
      const other = q.sender === data.user ? q.recipient : q.sender;
      const incoming = q.recipient === data.user;
      return <div className="chat-row request-row" key={q.id}>
        <span className="chat-avatar request"><Clock size={20}/></span>
        <div className="chat-row-copy"><div><strong>{name(other)}</strong><time>{Math.max(1, Math.ceil((q.expires - now) / 3600000))}h</time></div><p>{incoming ? 'Sent you Asc 👋' : 'Asc sent · waiting for reply'}</p>
          {incoming && <div className="request-actions"><button disabled={busy} onClick={() => reply(q.id, true)}>Accept</button><button disabled={busy} onClick={() => reply(q.id, false)}>Decline</button></div>}
        </div>
      </div>;
    })}
    {rows.map((row: any) => <button className={'chat-row '+(activeId === row.id ? 'active' : '')} key={row.id} onClick={() => openThread(row.thread)}>
      <span className={'chat-avatar '+row.kind}>{row.kind === 'group' ? <Users size={22}/> : row.title.charAt(0)}</span>
      <span className="chat-row-copy"><span><strong>{row.title}</strong><time>{timeLabel(row.updated)}</time></span><span className="chat-preview">{row.mine && <CheckCheck size={15}/>}<span>{row.subtitle}</span></span></span>
      <ChevronRight className="chat-chevron" size={18}/>
    </button>)}
    {!rows.length && !requests.length && <div className="inbox-empty"><MessageCircle/><h3>No chats yet</h3><p>Say Asc to someone or join a matchmaking group. New conversations will appear here.</p></div>}
  </section>;
}
