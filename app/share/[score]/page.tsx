import type { Metadata } from 'next';
import Link from 'next/link';

// 1. TYPE DEFINITION
type Props = {
  params: Promise<{ score: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { score } = await params;

  // URL Website Anda
  const appUrl = 'https://based-snake.vercel.app'; 
  
  // A. URL UNTUK GAMBAR (Visual Score)
  // Ini harus mengarah ke API OG agar muncul gambar biru dengan angka skor
  const imageUrl = `${appUrl}/api/og?score=${score}`;

  // B. URL UNTUK TOMBOL (Action)
  // Ini link yang Anda berikan (Link ke direktori Mini App)
  const miniAppLink = `https://farcaster.xyz/miniapps/V811TN_FcAWi/snakeeee-gameeee`;

  return {
    title: `I scored ${score} in Base Snake!`,
    description: 'Can you beat my high score? Play now on Base.',
    openGraph: {
      title: `I scored ${score} in Base Snake!`,
      description: 'Play Classic Snake on Base',
      // PERBAIKAN: Gunakan imageUrl di sini, BUKAN link aplikasi
      images: [miniAppLink], 
    },
    other: {
      "fc:frame": "vNext",
      // PERBAIKAN: Gunakan imageUrl di sini agar preview muncul
      "fc:frame:image": miniAppLink, 
      "fc:frame:button:1": "Play Now",
      "fc:frame:button:1:action": "link",
      // PERBAIKAN: Gunakan link aplikasi HANYA di target tombol
      "fc:frame:button:1:target": miniAppLink, 
    },
  };
}

// 3. KOMPONEN UI
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