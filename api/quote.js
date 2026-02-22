/**
 * api/quote.js - Vercel serverless function
 * Proxies Yahoo Finance quote fetches to avoid CORS issues in the browser
 * Returns price, company name, and dividend yield calculated from dividend events
 * 
 * Usage: GET /api/quote?ticker=AAPL
 */

export default async function handler(req, res) {
  const { ticker } = req.query;

  if (!ticker) {
    return res.status(400).json({ error: 'Missing ticker parameter' });
  }

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json',
    'Referer': 'https://finance.yahoo.com/'
  };

  try {
    // Fetch 1 year of chart data with dividend events
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1y&events=dividends`;

    const response = await fetch(url, { headers });

    if (!response.ok) {
      return res.status(404).json({ ticker, price: null, name: null, dividendYield: null, error: `HTTP ${response.status}` });
    }

    const json = await response.json();
    const result = json?.chart?.result?.[0];
    const meta = result?.meta || {};
    const price = meta.regularMarketPrice || null;
    const name = meta.shortName || meta.longName || null;

    // Calculate dividend yield from most recent payment x detected frequency
    let dividendYield = null;
    const dividendEvents = result?.events?.dividends || {};
    const allDividends = Object.values(dividendEvents).sort((a, b) => a.date - b.date);

    if (allDividends.length > 0 && price > 0) {
      const mostRecentAmount = allDividends[allDividends.length - 1].amount;

      // Detect payment frequency from gaps between recent payments
      let frequency = 4; // default: quarterly
      if (allDividends.length >= 2) {
        const gaps = [];
        for (let i = Math.max(0, allDividends.length - 4); i < allDividends.length - 1; i++) {
          gaps.push((allDividends[i + 1].date - allDividends[i].date) / (60 * 60 * 24));
        }
        const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
        if (avgGap < 45) frequency = 12;       // monthly
        else if (avgGap < 120) frequency = 4;  // quarterly
        else if (avgGap < 240) frequency = 2;  // semi-annual
        else frequency = 1;                     // annual
      }

      const annualDividend = mostRecentAmount * frequency;
      dividendYield = (annualDividend / price) * 100;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return res.status(200).json({ ticker, price, name, dividendYield });

  } catch (err) {
    console.error(`Quote proxy error for ${ticker}:`, err);
    return res.status(500).json({ ticker, price: null, name: null, dividendYield: null, error: err.message });
  }
}
