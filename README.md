# Portfolio Viewer

A public read-only viewer for an encrypted portfolio stored on Pinata IPFS.

## How it works

1. Your private portfolio app encrypts your holdings with AES-256-GCM and uploads to Pinata IPFS
2. The Pinata CID (content hash) is recorded on the Solana blockchain as proof of integrity
3. This viewer fetches the encrypted file from Pinata, decrypts it in the browser using your passphrase, and renders your portfolio in read-only mode
4. **No backend server needed** — everything runs in the browser

## Setup (one-time)

1. Push this folder to your GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Set **Root Directory** to `/` (the repo root, since this folder IS the repo)
4. Deploy — Vercel gives you a public URL like `https://yourname.vercel.app`

## Updating after a portfolio upload

Every time you click "Upload to Solana" in your main app, a new Pinata CID is generated.
You need to update the CID in `index.html`:

1. After uploading, check your terminal output for the new CID:
   ```
   ✓ Pinata upload successful
   CID: bafybeig...
   ```
   Or check `pinata-config.json` in your main app directory.

2. Open `index.html` and update this line:
   ```js
   window.__PINATA_CID__ = 'YOUR_NEW_CID_HERE';
   ```

3. Commit and push to GitHub — Vercel auto-deploys in ~30 seconds.

## Files

| File | Description |
|------|-------------|
| `index.html` | Main viewer page — update `__PINATA_CID__` here after each upload |
| `portfolio-app.jsx` | Portfolio UI component (copy from your main app when UI changes) |
| `vercel.json` | Vercel routing config |

## Keeping the viewer in sync with your main app

If you update the UI in `portfolio-app.jsx` in your main app, copy the updated file
into this folder and push to GitHub. Vercel will redeploy automatically.
