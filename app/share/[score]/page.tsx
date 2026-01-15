// app/share/[score]/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { score: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const score = params.score;


  const appUrl = 'https://based-snake.vercel.app'; 
  
  // URL Gambar (Pastikan route API-nya benar)
  const imageUrl = `${appUrl}/api/og?score=${score}`;

  return {
    title: `I scored ${score} in Base Snake!`,
    description: 'Can you beat my high score? Play now on Base.',
    openGraph: {
      title: `I scored ${score} in Base Snake!`,
      description: 'Play Classic Snake on Base',
      images: [imageUrl], // Ini yang akan diambil Warpcast
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

export default function SharePage({ params }: Props) {
  // ... (Sisa kode komponen UI sama seperti sebelumnya)
  const score = params.score; // Pastikan ambil score untuk ditampilkan di UI juga
  
  return (
    <div style={{ /* style... */ }}>
       <h1>Score: {score}</h1>
       {/* ... sisa kode ... */}
    </div>
  )
}