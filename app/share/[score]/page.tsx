import type { Metadata } from 'next';
import Link from 'next/link';

// 1. UPDATE TYPE DEFINITION: params harus Promise
type Props = {
  params: Promise<{ score: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 2. AWAIT PARAMS: Ambil score setelah di-await
  const { score } = await params;

  // Pastikan URL ini sesuai dengan URL produksi Anda (hardcoded lebih aman)
  const appUrl = 'https://based-snake.vercel.app'; 
  
  const imageUrl = `${appUrl}/api/og?score=${score}`;

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
      "fc:frame:button:1:action": "link",
      "fc:frame:button:1:target": appUrl,
    },
  };
}

// 3. JADIKAN KOMPONEN ASYNC: Tambahkan 'async' di depan function
export default async function SharePage({ params }: Props) {
  // 4. AWAIT PARAMS DI SINI JUGA
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