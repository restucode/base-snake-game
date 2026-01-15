import type { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ score: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { score } = await params;

  // 1. URL Website Vercel Anda (Hardcode agar aman)
  const appUrl = 'https://based-snake.vercel.app'; 
  
  // 2. URL GAMBAR (Visual Score)
  // Ini mengarah ke route.tsx di atas untuk generate gambar
  const imageUrl = `${appUrl}/api/og?score=${score}`;

  // 3. URL TARGET KLIK (Deep Link Mini App)
  // Ini link yang Anda berikan agar tidak pindah aplikasi
  const miniAppLink = `https://farcaster.xyz/miniapps/V811TN_FcAWi/snakeeee-gameeee`;

  return {
    title: `I scored ${score} in Base Snake!`,
    description: 'Can you beat my high score? Play now on Base.',
    openGraph: {
      title: `I scored ${score} in Base Snake!`,
      description: 'Play Classic Snake on Base',
      images: [imageUrl], // Tampilkan gambar skor dinamis di preview link biasa
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": imageUrl, // Tampilkan gambar skor dinamis di Farcaster
      "fc:frame:button:1": "Play Now",
      "fc:frame:button:1:action": "link", // Aksi tipe link
      "fc:frame:button:1:target": miniAppLink, // TAPI targetnya ke Mini App, bukan website
    },
  };
}

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
      
      {/* Tombol Play Game untuk user yang membuka via browser biasa */}
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