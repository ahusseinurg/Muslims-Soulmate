import { getChatGPTUser } from '@/app/chatgpt-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin) {
    return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  const existing = await getChatGPTUser();
  if (existing) return Response.json({ ok: true, tester: !!existing.isTester });

  const id = crypto.randomUUID();
  return Response.json(
    { ok: true, tester: true },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Set-Cookie': `ms_tester=${id}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`,
      },
    },
  );
}
