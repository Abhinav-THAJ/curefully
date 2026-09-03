import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://curefully-backend-production-eijmhh.laravel.cloud';

/**
 * Catch-all server-side proxy.
 * Forwards every request from /api/proxy/[...path] to the real Laravel backend.
 * Because this runs on the Next.js server (not the browser), there are zero CORS issues.
 */
async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const targetPath = '/' + path.join('/');

  // Forward query string as-is
  const qs = request.nextUrl.searchParams.toString();
  const targetUrl = `${BACKEND_URL}${targetPath}${qs ? `?${qs}` : ''}`;

  // --- Build headers to forward ---
  const forwardedHeaders: Record<string, string> = {
    Accept: 'application/json',
    lang:   'en',
  };

  const auth        = request.headers.get('Authorization');
  const contentType = request.headers.get('Content-Type');

  if (auth)         forwardedHeaders['Authorization'] = auth;
  if (contentType) {
    forwardedHeaders['Content-Type'] = contentType;
  }

  // --- Read body as stream ---
  const body = request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined;

  // --- Proxy the request ---
  try {
    const response = await fetch(targetUrl, {
      method:  request.method,
      headers: forwardedHeaders,
      body,
      duplex: 'half', // Required for Node.js fetch with streams
    } as any);

    const responseText = await response.text();

    // Try to return JSON; fall back to raw text
    try {
      const json = JSON.parse(responseText);
      return NextResponse.json(json, { status: response.status });
    } catch {
      return new NextResponse(responseText, {
        status:  response.status,
        headers: { 'Content-Type': response.headers.get('Content-Type') ?? 'text/plain' },
      });
    }
  } catch (error) {
    console.error('[Proxy] Network error reaching backend:', error);
    return NextResponse.json(
      { success: false, message: 'Could not reach the backend server. Please try again.' },
      { status: 502 }
    );
  }
}

export const GET     = handler;
export const POST    = handler;
export const PUT     = handler;
export const PATCH   = handler;
export const DELETE  = handler;
export const OPTIONS = handler;
