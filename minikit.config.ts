const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjE5NzMyMiwidHlwZSI6ImF1dGgiLCJrZXkiOiIweGQ4RTAzRGIxMWRDOUJCYjVBMTNhZjQ4QTUxMTc0MGRjMTBjQjQ0RDUifQ",
    payload: "eyJkb21haW4iOiJiYXNlZC1zbmFrZS52ZXJjZWwuYXBwIn0",
    signature: "ROoWGhKE99nZpcxMfOMobZtefYvlRe/KKuy84Pf93QYdrnnPoXugeBy7RP47Pu3eNwZ5czNirwazAcE6fl31wxw="
  },
  miniapp: {
    version: "1",
    name: "Snakeeee Gameeee", 
    subtitle: "Snakor, who can win?", 
    description: "Ads",
    screenshotUrls: [`${ROOT_URL}/kersa.jpg`],
    iconUrl: `${ROOT_URL}/kersa.jpg`,
    splashImageUrl: `${ROOT_URL}/kersa.jpg`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["game", "quickstart", "snake", "playing"],
    heroImageUrl: `${ROOT_URL}/bg-base.png`, 
    tagline: "Who can beat my score?",
    ogTitle: "Snakor",
    ogDescription: "Classic Snake on Base! Choose skins like Brian & Jesse. Eat & grow!",
    ogImageUrl: `${ROOT_URL}/bg-base.png`,
  },
} as const;

