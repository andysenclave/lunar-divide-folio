import { cdnUrl } from '@/config';
import { NextResponse } from 'next/server';

const RESUME_PATH = 'common/assets/anindya_mukherjee.andysenclave.20260222_192933.pdf';
const DOWNLOAD_FILENAME = 'Anindya_Mukherjee_Resume_2026.pdf';

export async function GET() {
  const url = cdnUrl(RESUME_PATH);
  const response = await fetch(url);

  if (!response.ok) {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }

  const blob = await response.blob();

  return new NextResponse(blob, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${DOWNLOAD_FILENAME}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
