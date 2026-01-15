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
            backgroundColor: '#0052FF', // Base Blue
            backgroundImage: 'linear-gradient(to bottom right, #0052FF, #0033CC)',
            color: 'white',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Hiasan Background */}
          <div style={{
             position: 'absolute',
             top: 0, left: 0, right: 0, bottom: 0,
             opacity: 0.2,
             backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)',
             backgroundSize: '100px 100px',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
            <h2 style={{ fontSize: 60, margin: 0, marginBottom: 20, letterSpacing: '-0.05em' }}>SNAKEEEE GAMEEEE</h2>
            <p style={{ fontSize: 40, margin: 0, opacity: 0.8 }}>I SCORED</p>
            <h1 style={{ fontSize: 160, fontWeight: '900', margin: 0, textShadow: '5px 5px 0px rgba(0,0,0,0.2)' }}>
              {score}
            </h1>
            <div style={{ 
              marginTop: 40, 
              padding: '15px 40px', 
              backgroundColor: 'white', 
              color: '#0052FF', 
              fontSize: 30, 
              borderRadius: 50,
              fontWeight: 'bold'
            }}>
              Can you beat me?
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (_e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}