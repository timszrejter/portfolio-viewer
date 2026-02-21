/**
 * api/quote.js - Vercel serverless function
 * Proxies Yahoo Finance quote fetches to avoid CORS issues in the browser
 * 
 * Usage: GET /api/quote?ticker=AAPL
 */

export default async function handler(req, res) {
  const { ticker } = req.query;

  if (!ticker) {
    return res.status(400).json({ error: 'Missing ticker parameter' });
  }

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(404).json({ ticker, price: null, error: `HTTP ${response.status}` });
    }

    const json = await response.json();
    const price = json?.chart?.result?.[0]?.meta?.regularMarketPrice || null;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30'); // cache 1 min
    return res.status(200).json({ ticker, price });

  } catch (err) {
    console.error(`Quote proxy error for ${ticker}:`, err);
    return res.status(500).json({ ticker, price: null, error: err.message });
  }
}
