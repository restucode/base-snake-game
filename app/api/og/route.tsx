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
          {/* Background Pattern */}
          <div style={{
             position: 'absolute',
             top: 0, left: 0, right: 0, bottom: 0,
             opacity: 0.1,
             backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)',
             backgroundSize: '100px 100px',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
            <div style={{ fontSize: 60, marginBottom: 20 }}>SNAKEEEE GAMEEEE</div>
            <div style={{ fontSize: 40, opacity: 0.8 }}>I SCORED</div>
            <div style={{ fontSize: 130, fontWeight: '900', textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}>
              {score}
            </div>
            <div style={{ fontSize: 30, marginTop: 20, backgroundColor: 'white', color:'#0052FF', padding: '10px 30px', borderRadius: 20 }}>
              Can you beat me?
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
    // PERBAIKAN DI SINI: ganti (e) jadi (_e)
  } catch (e) {
    return new Response(`${e} Failed to generate the image`, {
      status: 500,
    });
  }
}