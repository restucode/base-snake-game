import type { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { score: string };
};

// Fungsi ini yang membuat gambar preview jadi dinamis sesuai skor di URL
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Untuk Next.js 15+, params harus di-await jika type-nya Promise, 
  // tapi di struktur standar ini biasanya langsung object.
  // Jika error, gunakan: const score = (await params).score;
  const score = params.score;

  // Pastikan URL domain sesuai environment (Production vs Local)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://based-snake.vercel.app'; 
  
  return {
    title: `I scored ${score} in Base Snake!`,
    description: 'Can you beat my high score? Play now on Base.',
    openGraph: {
      title: `I scored ${score} in Base Snake!`,
      description: 'Play Classic Snake on Base',
      images: [`${appUrl}/api/og?score=${score}`], // Panggil API gambar tadi
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": `${appUrl}/api/og?score=${score}`,
      "fc:frame:button:1": "Play Now",
      "fc:frame:button:1:action": "link",
      "fc:frame:button:1:target": appUrl,
    },
  };
}

export default function SharePage({ params }: Props) {
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
      <h1>Score: {params.score}</h1>
      <p>Your friend challenged you to beat their score!</p>
      
      <Link href="/" style={{
        marginTop: '20px',
        padding: '15px 30px',
        background: 'white',
        color: '#0052FF',
        textDecoration: 'none',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '1.2rem'
      }}>
        Play Game
      </Link>
    </div>
  );
}