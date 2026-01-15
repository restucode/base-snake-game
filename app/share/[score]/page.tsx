import type { Metadata } from 'next';
import Link from 'next/link';

// 1. TYPE DEFINITION (Tetap)
type Props = {
  params: Promise<{ score: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 2. AWAIT PARAMS (Tetap)
  const { score } = await params;

  // --- PERBAIKAN DI SINI ---
  // Pastikan tidak ada slash (/) di akhir URL agar rapi
  const appUrl = 'https://based-snake.vercel.app'; 
  
  // URL untuk gambar Score
  const imageUrl = `${appUrl}/api/og?score=${score}`;

  // URL DEEP LINK WARPCAST
  // Ini kuncinya: Membungkus URL game Anda ke dalam format launch frame Warpcast
  const warpcastDeepLink = `https://farcaster.xyz/~/frames/launch?url=${encodeURIComponent(appUrl)}`;

  return {
    title: `I scored ${score} in Base Snake!`,
    description: 'Can you beat my high score? Play now on Base.',
    openGraph: {
      title: `I scored ${score} in Base Snake!`,
      description: 'Play Classic Snake on Base',
      images: [imageUrl],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": imageUrl,
      "fc:frame:button:1": "Play Now",
      "fc:frame:button:1:action": "link", // Tetap 'link', tapi targetnya khusus
      "fc:frame:button:1:target": warpcastDeepLink, // Gunakan Deep Link di sini
    },
  };
}

// 3. KOMPONEN UI (Tetap sama)
export default async function SharePage({ params }: Props) {
  const { score } = await params;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      background: '#0052FF', 
      color: 'white', 
      fontFamily: 'sans-serif'
    }}>
      <h1>Score: {score}</h1>
      <p style={{ marginBottom: '20px' }}>Your friend challenged you to beat their score!</p>
      
      {/* Tombol ini tetap mengarah ke home biasa, karena jika user membuka
          halaman share ini di browser biasa, mereka akan diarahkan ke game utama */}
      <Link href="/" style={{
        marginTop: '10px',
        padding: '15px 30px',
        background: 'white',
        color: '#0052FF',
        textDecoration: 'none',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        cursor: 'pointer'
      }}>
        Play Game
      </Link>
    </div>
  );
}