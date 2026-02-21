/**
 * api/pinata.js - Vercel serverless function
 * Proxies Pinata IPFS fetch to avoid CORS issues in the browser
 * 
 * Usage: GET /api/pinata?cid=bafkreiaz4vhm...
 */

export default async function handler(req, res) {
  const { cid } = req.query;

  if (!cid) {
    return res.status(400).json({ error: 'Missing cid parameter' });
  }

  try {
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'text/plain, application/octet-stream, */*'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Pinata gateway returned ${response.status}` 
      });
    }

    const data = await response.text();

    // Allow browser to call this from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(data);

  } catch (err) {
    console.error('Pinata proxy error:', err);
    return res.status(500).json({ error: err.message });
  }
}
