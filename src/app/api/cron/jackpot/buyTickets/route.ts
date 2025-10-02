import { verifyCronAuthHeader } from '@/lib/utils/cronAuth';

export async function POST(request: Request) {
  const unauthorized = verifyCronAuthHeader(request);
  if (unauthorized) return unauthorized;

  // TODO: implement buy tickets logic here
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

export const dynamic = 'force-dynamic';



