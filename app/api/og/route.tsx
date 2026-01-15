import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const score = searchParams.get('score') || '0';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: 'linear-gradient(to bottom right, #0052FF, #0033CC)',
            color: 'white',
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 60, marginBottom: 20 }}>SNAKEEEE GAMEEEE</div>
            <div style={{ fontSize: 40, opacity: 0.8 }}>I SCORED</div>
            <div style={{ fontSize: 130, fontWeight: '900' }}>{score}</div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}