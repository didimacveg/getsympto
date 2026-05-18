import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const report = body['csp-report'] || body;

    // En producción enviarías esto a un servicio de logging
    console.warn('[CSP VIOLATION]', {
      blockedUri: report['blocked-uri'],
      violatedDirective: report['violated-directive'],
      documentUri: report['document-uri'],
      sourceFile: report['source-file'],
      time: new Date().toISOString(),
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}