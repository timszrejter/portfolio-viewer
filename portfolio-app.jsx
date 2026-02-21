const PortfolioApp = ({ viewerMode = false }) => {
  // Simple icon components
  const PlusCircle = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );

  const RefreshCw = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  );

  const ChevronDown = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  const ChevronRight = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );

  const FileText = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );

  const DollarSign = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );

  const BarChart3 = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"></path>
      <path d="M18 17V9"></path>
      <path d="M13 17V5"></path>
      <path d="M8 17v-3"></path>
    </svg>
  );

  const Trash2 = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );

  const Edit2 = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
  );

  const FolderOpen = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  );

  const [activeTab, setActiveTab] = React.useState('categories');
  const [categories, setCategories] = React.useState([]);
  const [holdings, setHoldings] = React.useState([]);
  const [expandedCategories, setExpandedCategories] = React.useState(new Set());
  const [showAddCategory, setShowAddCategory] = React.useState(false);
  const [showAddSubCategory, setShowAddSubCategory] = React.useState(null);
  const [showAddHolding, setShowAddHolding] = React.useState(false);
  const [showAddTransaction, setShowAddTransaction] = React.useState(null);
  const [showEditTransaction, setShowEditTransaction] = React.useState(null);
  const [showNotes, setShowNotes] = React.useState(null);
  const [showEditPrice, setShowEditPrice] = React.useState(null);
  const [showCategoryChange, setShowCategoryChange] = React.useState(null);
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
  const [filterCategory, setFilterCategory] = React.useState(null);
  const [filterSubCategories, setFilterSubCategories] = React.useState(new Set());
  const [expandedHoldings, setExpandedHoldings] = React.useState(new Set());
  const [holdingTabs, setHoldingTabs] = React.useState({}); // Track active tab per holding
  const [contextMenu, setContextMenu] = React.useState(null);
  const [showResearch, setShowResearch] = React.useState(null);
  const [tooltip, setTooltip] = React.useState(null);
  const [researchNotes, setResearchNotes] = React.useState({}); // Store research notes per holding
  const [newsItems, setNewsItems] = React.useState({}); // Store news items per holding
  const [importing, setImporting] = React.useState(false);
  const [importResults, setImportResults] = React.useState(null);
  const [fixingSubCategories, setFixingSubCategories] = React.useState(false);
  const [uploadingSolana, setUploadingSolana] = React.useState(false);
  const [solanaWallet, setSolanaWallet] = React.useState(null);
  const [lastPassphrase, setLastPassphrase] = React.useState(() => {
    // Load from localStorage on mount
    return localStorage.getItem('solana_passphrase') || '';
  });
  const [expandedNews, setExpandedNews] = React.useState(new Set()); // Track expanded news items
  const [showAddNews, setShowAddNews] = React.useState(null); // Track which holding is adding news

  // === Viewer Mode State ===
  const [viewerLoading, setViewerLoading] = React.useState(viewerMode);
  const [viewerError, setViewerError] = React.useState(null);
  const [viewerPassphrase, setViewerPassphrase] = React.useState('');
  const [viewerNeedsAuth, setViewerNeedsAuth] = React.useState(false);
  const [viewerTotalValue, setViewerTotalValue] = React.useState(100000);
  const [viewerRawData, setViewerRawData] = React.useState(null); // Store raw encrypted data for recalc

  // In the public viewer (Vercel), there is no backend — all decryption is browser-side.
  // VIEWER_API is intentionally empty; live price fetches use a CORS-friendly proxy.
  const VIEWER_API = '';
  const API_BASE_URL = 'https://127.0.0.1:3001/api'; // not used in viewer mode

  // === Viewer Mode: Transform encrypted data into UI-compatible format ===
  const transformEncryptedData = (data, totalVal) => {
    // Build categories array from compact format
    const cats = Object.entries(data.cat).map(([id, catData]) => ({
      id: parseInt(id),
      name: catData.n,
      subCategories: Object.entries(catData.s).map(([subId, subName]) => ({
        id: parseInt(subId),
        name: subName
      }))
    }));

    // Build holdings array from compact format
    // h: [[ticker, catId, subCatId, purchasePrice, currentPrice, allocation%, account]]
    const holds = data.h.map((h, idx) => {
      const [ticker, catId, subCatId, purchasePrice, storedPrice, allocation, account] = h;
      const currentPrice = storedPrice || 0;
      const value = (allocation / 100) * totalVal;
      const shares = currentPrice > 0 ? value / currentPrice : 0;

      return {
        id: idx + 1, // synthetic ID for UI keys
        ticker,
        companyName: ticker,
        categoryId: catId,
        subCategoryId: subCatId,
        currentPrice,
        shareBasis: purchasePrice,
        shares,
        accountType: account?.startsWith('R') ? 'Roth IRA' : 
                     account?.startsWith('T') ? 'Traditional IRA' : 'Taxable',
        accountName: account,
        dividendYield: null,
        initialDate: null,
        transactions: [],
        reason_for_buy: null,
        exit_plan: null,
        upcoming_catalysts: null,
        notes: null,
        _allocation: allocation // preserve original allocation for recalc
      };
    });

    return { categories: cats, holdings: holds };
  };

  // === Viewer Mode: Browser-side AES-256-GCM decryption (no backend needed) ===
  const browserDecrypt = async (encryptedBase64, passphrase) => {
    // Convert base64 → ArrayBuffer
    const binaryStr = atob(encryptedBase64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

    // Layout: salt(32) + iv(16) + authTag(16) + ciphertext
    const SALT_LEN = 32, IV_LEN = 16, TAG_LEN = 16;
    const salt = bytes.slice(0, SALT_LEN);
    const iv = bytes.slice(SALT_LEN, SALT_LEN + IV_LEN);
    const authTag = bytes.slice(SALT_LEN + IV_LEN, SALT_LEN + IV_LEN + TAG_LEN);
    const ciphertext = bytes.slice(SALT_LEN + IV_LEN + TAG_LEN);

    // Derive key using PBKDF2-SHA-512, 100k iterations
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveBits']
    );
    const keyBits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-512' },
      keyMaterial, 256
    );
    const aesKey = await crypto.subtle.importKey(
      'raw', keyBits, { name: 'AES-GCM' }, false, ['decrypt']
    );

    // AES-GCM decrypt — Web Crypto expects ciphertext+authTag concatenated
    const ciphertextWithTag = new Uint8Array(ciphertext.length + TAG_LEN);
    ciphertextWithTag.set(ciphertext);
    ciphertextWithTag.set(authTag, ciphertext.length);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv, tagLength: 128 },
      aesKey,
      ciphertextWithTag
    );

    return new TextDecoder().decode(decrypted);
  };

  // === Viewer Mode: Load portfolio from Pinata IPFS (browser-side, no backend) ===
  const loadViewerPortfolio = async (passphrase) => {
    try {
      setViewerLoading(true);
      setViewerError(null);

      // PINATA_CID is injected at build time by index.html
      const cid = window.__PINATA_CID__;
      if (!cid) throw new Error('No Pinata CID configured. Please re-deploy after uploading your portfolio.');

      // Fetch encrypted file from Pinata public gateway
      console.log('📌 Fetching encrypted portfolio from Pinata...');
      const gatewayUrl = `https://ipfs.io/ipfs/${cid}`;
      const response = await fetch(gatewayUrl);
      if (!response.ok) throw new Error(`Failed to fetch from Pinata: HTTP ${response.status}`);

      const encryptedBase64 = await response.text();
      console.log(`📦 Fetched ${encryptedBase64.length} bytes from Pinata`);

      // Decrypt in browser
      let decryptedJson;
      try {
        decryptedJson = await browserDecrypt(encryptedBase64, passphrase);
      } catch (e) {
        setViewerNeedsAuth(true);
        throw new Error('Incorrect passphrase. Please try again.');
      }

      const data = JSON.parse(decryptedJson);
      console.log('📊 Encrypted portfolio loaded:', data.h.length, 'holdings');

      setViewerRawData(data);

      // Always default to $100,000 for viewer
      const defaultTotal = 100000;

      // Transform and load into UI state
      const { categories: cats, holdings: holds } = transformEncryptedData(data, defaultTotal);
      setCategories(cats);
      setHoldings(holds);
      setViewerNeedsAuth(false);

      // Fetch live prices for all unique tickers
      await fetchViewerLivePrices(holds, data, defaultTotal);

    } catch (err) {
      console.error('Viewer load error:', err);
      setViewerError(err.message);
    } finally {
      setViewerLoading(false);
    }
  };

  // === Viewer Mode: Fetch live prices (browser-side, CORS-friendly) ===
  const fetchViewerLivePrices = async (currentHoldings, rawData, totalVal) => {
    const uniqueTickers = [...new Set(currentHoldings.map(h => h.ticker))];
    const prices = {};

    // Skip options (they have stored prices)
    const tickersToFetch = uniqueTickers.filter(t => !/^\w+\d{6}[CP]\d+/.test(t));

    console.log(`📡 Fetching live prices for ${tickersToFetch.length} tickers...`);

    for (const ticker of tickersToFetch) {
      try {
        // Use Yahoo Finance v8 API directly — works from browser
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`;
        const resp = await fetch(url);
        if (resp.ok) {
          const json = await resp.json();
          const price = json?.chart?.result?.[0]?.meta?.regularMarketPrice;
          if (price) prices[ticker] = price;
        }
      } catch (err) {
        console.warn(`Failed to fetch price for ${ticker}:`, err);
      }
    }

    console.log(`✅ Got prices for ${Object.keys(prices).length} tickers`);

    // Update holdings with live prices
    if (Object.keys(prices).length > 0) {
      const data = rawData || viewerRawData;
      const tv = totalVal || viewerTotalValue;
      
      const updatedHoldings = data.h.map((h, idx) => {
        const [ticker, catId, subCatId, purchasePrice, storedPrice, allocation, account] = h;
        const livePrice = prices[ticker] || storedPrice || 0;
        const value = (allocation / 100) * tv;
        const shares = livePrice > 0 ? value / livePrice : 0;

        return {
          id: idx + 1,
          ticker,
          companyName: ticker,
          categoryId: catId,
          subCategoryId: subCatId,
          currentPrice: livePrice,
          shareBasis: purchasePrice,
          shares,
          accountType: account?.startsWith('R') ? 'Roth IRA' : 
                       account?.startsWith('T') ? 'Traditional IRA' : 'Taxable',
          accountName: account,
          dividendYield: null,
          initialDate: null,
          transactions: [],
          reason_for_buy: null,
          exit_plan: null,
          upcoming_catalysts: null,
          notes: null,
          _allocation: allocation
        };
      });
      setHoldings(updatedHoldings);
    }
  };

  // === Viewer Mode: Recalculate shares when total value changes ===
  React.useEffect(() => {
    if (!viewerMode || !viewerRawData) return;
    
    const { categories: cats, holdings: holds } = transformEncryptedData(viewerRawData, viewerTotalValue);
    // Preserve any live prices we already have
    const currentPrices = {};
    holdings.forEach(h => { if (h.currentPrice > 0) currentPrices[h.ticker] = h.currentPrice; });
    
    const updated = holds.map(h => ({
      ...h,
      currentPrice: currentPrices[h.ticker] || h.currentPrice,
      shares: (currentPrices[h.ticker] || h.currentPrice) > 0 
        ? ((h._allocation / 100) * viewerTotalValue) / (currentPrices[h.ticker] || h.currentPrice)
        : h.shares
    }));
    
    setHoldings(updated);
  }, [viewerTotalValue]);

  // Load data on mount
  React.useEffect(() => {
    if (viewerMode) {
      // Viewer mode: check URL for passphrase key
      const params = new URLSearchParams(window.location.search);
      const key = params.get('key');
      if (key) {
        setViewerPassphrase(key);
        loadViewerPortfolio(key);
      } else {
        setViewerLoading(false);
        setViewerNeedsAuth(true);
      }
    } else {
      // Normal mode: load from database
      loadCategories();
      loadHoldings();
      loadSolanaWallet();
    }
    
    // Close context menu on click
    const handleClick = () => setContextMenu(null);
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      // Fallback to empty array
      setCategories([]);
    }
  };

  const loadHoldings = async () => {
    try {
      console.log('📥 Loading holdings from API...');
      const response = await fetch(`${API_BASE_URL}/holdings`);
      const data = await response.json();
      console.log('✓ Holdings loaded:', data.length, 'holdings');
      console.log('Full holdings data:', data);
      setHoldings(data);
    } catch (error) {
      console.error('Error loading holdings:', error);
      setHoldings([]);
    }
  };

  // Load research notes for a holding
  const loadResearchNotes = async (holdingId) => {
    const holding = holdings.find(h => h.id === holdingId);
    if (holding) {
      setResearchNotes(prev => ({
        ...prev,
        [holdingId]: {
          reason_for_buy: holding.reason_for_buy || '',
          exit_plan: holding.exit_plan || '',
          upcoming_catalysts: holding.upcoming_catalysts || '',
          notes: holding.notes || ''
        }
      }));
    }
  };

  // Load news items for a holding
  const loadNewsItems = async (holdingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/holdings/${holdingId}/news`);
      const data = await response.json();
      setNewsItems(prev => ({
        ...prev,
        [holdingId]: data
      }));
    } catch (error) {
      console.error('Error loading news:', error);
      setNewsItems(prev => ({
        ...prev,
        [holdingId]: []
      }));
    }
  };

  // Save research notes
  const saveResearchNotes = async (holdingId) => {
    try {
      const notes = researchNotes[holdingId];
      await fetch(`${API_BASE_URL}/holdings/${holdingId}/research`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notes)
      });
      await loadHoldings(); // Reload to get updated data
      alert('Research notes saved successfully');
    } catch (error) {
      console.error('Error saving research notes:', error);
      alert('Failed to save research notes');
    }
  };

  // Add manual news item
  const addNewsItem = async (holdingId, newsData) => {
    try {
      await fetch(`${API_BASE_URL}/holdings/${holdingId}/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData)
      });
      await loadNewsItems(holdingId);
      setShowAddNews(null);
    } catch (error) {
      console.error('Error adding news:', error);
      alert('Failed to add news');
    }
  };

  // Fetch AI news
  const fetchAINews = async (holdingId) => {
    try {
      const holding = holdings.find(h => h.id === holdingId);
      if (!holding) return;
      
      alert(`Fetching latest news for ${holding.ticker}...`);
      await fetch(`${API_BASE_URL}/holdings/${holdingId}/news/fetch`, {
        method: 'POST'
      });
      await loadNewsItems(holdingId);
      alert('News fetched successfully');
    } catch (error) {
      console.error('Error fetching AI news:', error);
      alert('Failed to fetch news');
    }
  };

  // Delete news item
  const deleteNewsItem = async (newsId, holdingId) => {
    if (!confirm('Delete this news item?')) return;
    try {
      await fetch(`${API_BASE_URL}/news/${newsId}`, {
        method: 'DELETE'
      });
      await loadNewsItems(holdingId);
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Failed to delete news');
    }
  };

  // Calculate portfolio totals
  const calculateTotals = () => {
    const totalValue = holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
    return { totalValue };
  };

  // Calculate category totals
  const getCategoryTotal = (categoryId) => {
    return holdings
      .filter(h => h.categoryId === categoryId)
      .reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  };

  // Calculate sub-category totals
  const getSubCategoryTotal = (subCategoryId) => {
    return holdings
      .filter(h => h.subCategoryId === subCategoryId)
      .reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  };

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Add category
  const addCategory = async (name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const newCategory = await response.json();
      await loadCategories();
      setShowAddCategory(false);
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category');
    }
  };

  // Add sub-category
  const addSubCategory = async (categoryId, name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/sub-categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      await loadCategories();
      setShowAddSubCategory(null);
    } catch (error) {
      console.error('Error adding sub-category:', error);
      alert('Failed to add sub-category');
    }
  };

  // Sort holdings
  const sortedHoldings = React.useMemo(() => {
    let sortable = [...holdings];
    
    // Apply category filter
    if (filterCategory) {
      sortable = sortable.filter(h => h.categoryId === filterCategory.id);
      
      // Apply sub-category filter ONLY if any are explicitly selected
      // If none selected, show all holdings from the category
      if (filterSubCategories.size > 0) {
        sortable = sortable.filter(h => filterSubCategories.has(h.subCategoryId));
      }
    }
    
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        // Calculate derived values
        if (sortConfig.key === 'currentValue') {
          aVal = a.shares * a.currentPrice;
          bVal = b.shares * b.currentPrice;
        } else if (sortConfig.key === 'profitLoss') {
          aVal = (a.shares * a.currentPrice) - (a.shares * a.shareBasis);
          bVal = (b.shares * b.currentPrice) - (b.shares * b.shareBasis);
        } else if (sortConfig.key === 'profitLossPercent') {
          aVal = ((a.currentPrice - a.shareBasis) / a.shareBasis) * 100;
          bVal = ((b.currentPrice - b.shareBasis) / b.shareBasis) * 100;
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [holdings, sortConfig, filterCategory, filterSubCategories]);

  // Handle category filter change
  const handleCategoryFilterChange = (categoryId) => {
    if (!categoryId) {
      setFilterCategory(null);
      setFilterSubCategories(new Set());
    } else {
      const category = categories.find(c => c.id === parseInt(categoryId));
      setFilterCategory(category);
      // Start with NO sub-categories selected - show all holdings from category
      setFilterSubCategories(new Set());
    }
  };

  // Toggle sub-category filter
  const toggleSubCategoryFilter = (subCategoryId) => {
    const newFilters = new Set(filterSubCategories);
    if (newFilters.has(subCategoryId)) {
      newFilters.delete(subCategoryId);
    } else {
      newFilters.add(subCategoryId);
    }
    setFilterSubCategories(newFilters);
  };

  // Toggle holding expansion
  const toggleHoldingExpansion = (holdingId) => {
    const newExpanded = new Set(expandedHoldings);
    if (newExpanded.has(holdingId)) {
      newExpanded.delete(holdingId);
    } else {
      newExpanded.add(holdingId);
      // Load research notes and news when expanding
      loadResearchNotes(holdingId);
      loadNewsItems(holdingId);
      // Set default tab to Transactions
      setHoldingTabs(prev => ({
        ...prev,
        [holdingId]: prev[holdingId] || 'transactions'
      }));
    }
    setExpandedHoldings(newExpanded);
  };

  // Request sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Refresh market data
  const refreshMarketData = async () => {
    try {
      console.log('Starting market data refresh...');
      const response = await fetch(`${API_BASE_URL}/market-data/refresh`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Market data refresh result:', result);
      
      await loadHoldings();
      
      // Show detailed results
      const successCount = result.updated || 0;
      const failCount = result.updates?.filter(u => !u.success).length || 0;
      
      if (failCount > 0) {
        const failures = result.updates.filter(u => !u.success);
        console.error('Failed updates:', failures);
        alert(`Market data refreshed: ${successCount} succeeded, ${failCount} failed. Check console for details.`);
      } else {
        alert(`Market data refreshed successfully for ${successCount} holdings!`);
      }
    } catch (error) {
      console.error('Error refreshing market data:', error);
      alert(`Failed to refresh market data: ${error.message}`);
    }
  };

  // CSV Import
  const handleImportCSV = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImporting(true);
    setImportResults(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/holdings/import`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setImportResults(result);
        
        // Check if there are holdings missing from the CSV
        if (result.missingHoldings && result.missingHoldings.length > 0) {
          const missingList = result.missingHoldings.map(h => 
            `${h.ticker} (${h.accountType}) - ${h.transactionCount} transaction(s)`
          ).join('\n');
          
          const shouldDelete = confirm(
            `Import complete!\n\nProcessed: ${result.processed}\nSkipped: ${result.skipped}\n\n` +
            `⚠️ The following holdings exist in your database but were NOT in the CSV file:\n\n${missingList}\n\n` +
            `This usually means you sold these stocks.\n\n` +
            `Would you like to DELETE these holdings and their transactions?\n\n` +
            `Click OK to delete them, or Cancel to keep them.`
          );
          
          if (shouldDelete) {
            // Delete each missing holding
            for (const holding of result.missingHoldings) {
              try {
                await fetch(`${API_BASE_URL}/holdings/${holding.id}`, {
                  method: 'DELETE'
                });
                console.log(`Deleted ${holding.ticker} (${holding.accountType})`);
              } catch (error) {
                console.error(`Failed to delete ${holding.ticker}:`, error);
              }
            }
            alert(`Deleted ${result.missingHoldings.length} holdings that were missing from CSV.`);
          }
        } else {
          alert(`Import complete!\n\nProcessed: ${result.processed}\nSkipped: ${result.skipped}`);
        }
        
        // Refresh holdings and categories
        await loadHoldings();
        await loadCategories();
      } else {
        alert(`Import failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error importing CSV:', error);
      alert(`Failed to import CSV: ${error.message}`);
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  // Fix blank sub-categories
  const handleFixSubCategories = async () => {
    if (!confirm('This will use AI to assign sub-categories to all holdings that are missing them. Continue?')) {
      return;
    }

    setFixingSubCategories(true);

    try {
      const response = await fetch(`${API_BASE_URL}/holdings/fix-subcategories`, {
        method: 'POST'
      });

      const result = await response.json();

      if (result.success) {
        let message = `Sub-category fix complete!\n\nUpdated: ${result.updated} holdings`;
        
        if (result.errors && result.errors.length > 0) {
          message += `\nErrors: ${result.errors.length}`;
        }

        if (result.results && result.results.length > 0) {
          message += '\n\nUpdated holdings:';
          result.results.slice(0, 10).forEach(r => {
            message += `\n• ${r.ticker}: ${r.subCategory}`;
          });
          if (result.results.length > 10) {
            message += `\n... and ${result.results.length - 10} more`;
          }
        }

        alert(message);
        await loadHoldings();
      } else {
        alert(`Fix failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error fixing sub-categories:', error);
      alert(`Failed to fix sub-categories: ${error.message}`);
    } finally {
      setFixingSubCategories(false);
    }
  };

  // Load Solana wallet info
  const loadSolanaWallet = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/solana/wallet`);
      const data = await response.json();
      setSolanaWallet(data);
    } catch (error) {
      console.error('Error loading Solana wallet:', error);
    }
  };

  // Upload to Solana
  const handleUploadToSolana = async () => {
    // Prompt for passphrase
    const passphrase = prompt(
      'Enter passphrase to encrypt your portfolio:\n\n' +
      '⚠️ IMPORTANT:\n' +
      '• This passphrase encrypts your data on the blockchain\n' +
      '• Anyone viewing needs this passphrase\n' +
      '• If you lose it, your data is PERMANENTLY LOCKED\n' +
      '• Write it down somewhere safe!\n\n' +
      (lastPassphrase ? 'Leave blank to use last passphrase' : ''),
      lastPassphrase
    );
    
    if (passphrase === null) {
      return; // User cancelled
    }
    
    const finalPassphrase = passphrase.trim() || lastPassphrase;
    
    if (!finalPassphrase) {
      alert('Passphrase is required to upload.');
      return;
    }
    
    if (!confirm(
      `Upload portfolio to Solana blockchain?\n\n` +
      `This will:\n` +
      `• Encrypt with passphrase: ${finalPassphrase.substring(0, 3)}***\n` +
      `• Upload ${holdings.length} holdings\n` +
      `• Use generic account names (T1, R1, X1)\n` +
      `• Cost ~$0.0001 in fees\n\n` +
      `Continue?`
    )) {
      return;
    }

    setUploadingSolana(true);

    try {
      const response = await fetch(`${API_BASE_URL}/solana/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase: finalPassphrase })
      });

      const result = await response.json();

      if (result.success) {
        // Save passphrase to localStorage
        localStorage.setItem('solana_passphrase', finalPassphrase);
        setLastPassphrase(finalPassphrase);
        
        // Show results in a better format
        const explorerUrl = result.viewUrl || `https://explorer.solana.com/address/${result.walletAddress}?cluster=${result.network}`;
        
        // Create a copyable summary
        const summary = [
          `✅ Portfolio uploaded to Solana!`,
          ``,
          `🔐 Encrypted: ${result.encrypted ? 'Yes' : 'No'}`,
          `Network: ${result.network}`,
          `Holdings: ${result.holdingsCount}`,
          `Categories: ${result.categoriesCount}`,
          `Data size: ${result.dataSize.final} bytes`,
          ``,
          `📋 SAVE THIS INFORMATION:`,
          `Address: ${result.walletAddress}`,
          `Passphrase: ${finalPassphrase}`,
          ``
        ];
        
        if (result.accountMappings && result.accountMappings.length > 0) {
          summary.push(`Account Mappings:`);
          result.accountMappings.slice(0, 5).forEach(m => {
            summary.push(`• ${m.generic}`);
          });
          if (result.accountMappings.length > 5) {
            summary.push(`... and ${result.accountMappings.length - 5} more`);
          }
        }
        
        console.log(summary.join('\n'));
        console.log(`\nSolana Explorer: ${explorerUrl}`);
        
        // Copy to clipboard
        const textToCopy = summary.join('\n') + `\n\nSolana Explorer:\n${explorerUrl}`;
        
        try {
          await navigator.clipboard.writeText(textToCopy);
          alert(
            `✅ Upload successful!\n\n` +
            `📋 Details copied to clipboard!\n\n` +
            `Address: ${result.walletAddress}\n` +
            `Passphrase: ${finalPassphrase}\n\n` +
            `Check browser console for full details and Solana Explorer link.`
          );
        } catch (err) {
          alert(summary.join('\n') + `\n\nSolana Explorer:\n${explorerUrl}`);
        }
        
        // Open Solana Explorer in new tab
        window.open(explorerUrl, '_blank');
        
        // Reload wallet info
        await loadSolanaWallet();
      } else {
        alert(`Upload failed: ${result.error}\n\n${result.details || ''}`);
      }
    } catch (error) {
      console.error('Error uploading to Solana:', error);
      alert(`Failed to upload to Solana: ${error.message}`);
    } finally {
      setUploadingSolana(false);
    }
  };

  // Add holding
  const addHolding = async (holdingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/holdings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(holdingData)
      });
      const newHolding = await response.json();
      await loadHoldings();
      setShowAddHolding(false);
    } catch (error) {
      console.error('Error adding holding:', error);
      alert('Failed to add holding');
    }
  };

  // Add transaction
  const addTransaction = async (holdingId, transaction) => {
    try {
      const holding = holdings.find(h => h.id === holdingId);
      const isCashTransaction = holding?.ticker === 'FDRXX';
      
      // Find FDRXX cash holding
      const cashHolding = holdings.find(h => h.ticker === 'FDRXX');
      
      const response = await fetch(`${API_BASE_URL}/holdings/${holdingId}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
      });

      const result = await response.json();
      
      // Don't auto-update cash if this IS the cash transaction itself
      if (!isCashTransaction && cashHolding) {
        
        // SELL: Add proceeds to cash
        if (transaction.type === 'SELL') {
          const proceeds = (transaction.shares * transaction.price) - (transaction.fees || 0);
          
          try {
            await fetch(`${API_BASE_URL}/holdings/${cashHolding.id}/transactions`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'BUY',
                shares: proceeds, // Use proceeds as shares (since FDRXX = $1/share)
                price: 1.00,
                fees: 0,
                date: new Date().toISOString().split('T')[0] // Today's date
              })
            });
            
            alert(`Sold ${transaction.shares} ${holding?.ticker || 'shares'} for $${proceeds.toFixed(2)}.\n\nAdded $${proceeds.toFixed(2)} to cash (FDRXX).`);
          } catch (cashError) {
            console.error('Error updating cash:', cashError);
            alert(`Sale recorded, but failed to update cash. Please manually add $${proceeds.toFixed(2)} to FDRXX.`);
          }
        }
        
        // BUY: Deduct cost from cash
        if (transaction.type === 'BUY') {
          const cost = (transaction.shares * transaction.price) + (transaction.fees || 0);
          
          try {
            await fetch(`${API_BASE_URL}/holdings/${cashHolding.id}/transactions`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'SELL',
                shares: cost, // Use cost as shares (since FDRXX = $1/share)
                price: 1.00,
                fees: 0,
                date: new Date().toISOString().split('T')[0] // Today's date
              })
            });
            
            alert(`Bought ${transaction.shares} ${holding?.ticker || 'shares'} for $${cost.toFixed(2)}.\n\nDeducted $${cost.toFixed(2)} from cash (FDRXX).`);
          } catch (cashError) {
            console.error('Error updating cash:', cashError);
            alert(`Purchase recorded, but failed to update cash. Please manually deduct $${cost.toFixed(2)} from FDRXX.`);
          }
        }
      } else if (!isCashTransaction && !cashHolding) {
        // No cash holding found
        if (transaction.type === 'SELL') {
          const proceeds = (transaction.shares * transaction.price) - (transaction.fees || 0);
          alert(`Sold ${transaction.shares} ${holding?.ticker || 'shares'} for $${proceeds.toFixed(2)}.\n\nNote: FDRXX cash holding not found. Please create it to track cash automatically.`);
        } else if (transaction.type === 'BUY') {
          const cost = (transaction.shares * transaction.price) + (transaction.fees || 0);
          alert(`Bought ${transaction.shares} ${holding?.ticker || 'shares'} for $${cost.toFixed(2)}.\n\nNote: FDRXX cash holding not found. Please create it to track cash automatically.`);
        }
      }
      
      await loadHoldings();
      setShowAddTransaction(null);
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction');
    }
  };

  // Delete holding
  const deleteHolding = async (holdingId, ticker) => {
    if (!confirm(`Are you sure you want to delete ${ticker} and all its transactions? This cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/holdings/${holdingId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete holding');
      }

      await loadHoldings();
      alert(`${ticker} deleted successfully`);
    } catch (error) {
      console.error('Error deleting holding:', error);
      alert('Failed to delete holding');
    }
  };

  // Edit transaction
  const editTransaction = async (transactionId, transactionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData)
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      await loadHoldings();
      setShowEditTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('Failed to update transaction');
    }
  };

  // Delete transaction
  const deleteTransaction = async (transactionId) => {
    if (!confirm('Are you sure you want to delete this transaction? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      await loadHoldings();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    }
  };

  // Research stocks in sub-category using Perplexity AI
  const researchSubCategory = async (subCategoryId, subCategoryName) => {
    setContextMenu(null);
    
    // Get holdings in this sub-category
    const subCatHoldings = holdings.filter(h => h.subCategoryId === subCategoryId);
    
    if (subCatHoldings.length === 0) {
      alert('No holdings found in this sub-category');
      return;
    }

    // Set loading state
    setShowResearch({
      subCategoryName,
      loading: true,
      content: null
    });

    try {
      const tickers = subCatHoldings.map(h => `${h.ticker} (${h.companyName || h.ticker})`).join(', ');
      
      const response = await fetch(`${API_BASE_URL}/research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subCategoryName,
          tickers
        })
      });

      if (!response.ok) {
        throw new Error('Research request failed');
      }

      const data = await response.json();
      
      setShowResearch({
        subCategoryName,
        loading: false,
        content: data.research
      });
    } catch (error) {
      console.error('Error researching stocks:', error);
      setShowResearch({
        subCategoryName,
        loading: false,
        content: 'Failed to generate research. Please try again.'
      });
    }
  };

  // Change holding category/sub-category
  const changeCategory = async (holdingId, categoryId, subCategoryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/holdings/${holdingId}/category`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId,
          subCategoryId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to change category');
      }

      await loadHoldings();
      setShowCategoryChange(null);
    } catch (error) {
      console.error('Error changing category:', error);
      alert('Failed to change category');
    }
  };

  const { totalValue } = calculateTotals();

  // === Viewer Mode: Loading Screen ===
  if (viewerMode && viewerLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        fontFamily: '"Clash Display", "Inter", system-ui, sans-serif',
        color: '#e8edf4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <div style={{ fontSize: '1.5rem', color: '#64ffda', fontWeight: '600' }}>Loading Portfolio...</div>
          <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.5rem' }}>Decrypting encrypted data</div>
        </div>
      </div>
    );
  }

  // === Viewer Mode: Auth Screen (no key or bad key) ===
  if (viewerMode && viewerNeedsAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        fontFamily: '"Clash Display", "Inter", system-ui, sans-serif',
        color: '#e8edf4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          borderRadius: '16px',
          padding: '3rem',
          maxWidth: '450px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>Portfolio Viewer</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Enter passphrase to view encrypted portfolio</p>
          
          {viewerError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#f87171',
              fontSize: '0.875rem',
              marginBottom: '1.5rem'
            }}>
              {viewerError}
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              type="password"
              value={viewerPassphrase}
              onChange={(e) => setViewerPassphrase(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && viewerPassphrase && loadViewerPortfolio(viewerPassphrase)}
              placeholder="Enter passphrase"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(100, 255, 218, 0.3)',
                borderRadius: '8px',
                color: '#e8edf4',
                fontSize: '1rem'
              }}
            />
            <button
              onClick={() => viewerPassphrase && loadViewerPortfolio(viewerPassphrase)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#0a0e27',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === Viewer Mode: Error screen (non-auth errors) ===
  if (viewerMode && viewerError && !viewerNeedsAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        fontFamily: '"Clash Display", "Inter", system-ui, sans-serif',
        color: '#e8edf4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid #ef4444',
          borderRadius: '16px',
          padding: '3rem',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
          <h2 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Error Loading Portfolio</h2>
          <p style={{ color: '#f87171', marginBottom: '1.5rem' }}>{viewerError}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#0a0e27',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      fontFamily: '"Clash Display", "Inter", system-ui, sans-serif',
      color: '#e8edf4'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                margin: 0,
                background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}>
                Portfolio {viewerMode ? 'Viewer' : 'Tracker'}
              </h1>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#94a3b8',
                marginTop: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span>Total Value: <strong style={{ color: '#64ffda', fontSize: '1.125rem' }}>${(viewerMode ? viewerTotalValue : totalValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></span>
                {viewerMode && (
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(147, 51, 234, 0.15)',
                    border: '1px solid rgba(147, 51, 234, 0.4)',
                    borderRadius: '20px',
                    color: '#c084fc',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    letterSpacing: '0.03em'
                  }}>
                    🔐 Encrypted • Read-only
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {viewerMode && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Portfolio Value:
                    </label>
                    <input
                      type="number"
                      value={viewerTotalValue}
                      onChange={(e) => setViewerTotalValue(parseFloat(e.target.value) || 0)}
                      step="1000"
                      style={{
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        borderRadius: '8px',
                        color: '#64ffda',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        width: '150px',
                        textAlign: 'right'
                      }}
                    />
                  </div>
                  <button
                    onClick={() => viewerRawData && fetchViewerLivePrices(holdings, viewerRawData, viewerTotalValue)}
                    style={{
                      padding: '0.625rem 1.25rem',
                      background: 'rgba(74, 222, 128, 0.1)',
                      border: '1px solid #4ade80',
                      borderRadius: '8px',
                      color: '#4ade80',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseOver={e => e.target.style.background = 'rgba(74, 222, 128, 0.2)'}
                    onMouseOut={e => e.target.style.background = 'rgba(74, 222, 128, 0.1)'}
                  >
                    <RefreshCw size={16} />
                    Refresh Prices
                  </button>
                </>
              )}
              {!viewerMode && (
                <>
              <button
                onClick={handleUploadToSolana}
                disabled={uploadingSolana}
                style={{
                  padding: '0.625rem 1.25rem',
                  background: 'rgba(147, 51, 234, 0.1)',
                  border: '1px solid #9333ea',
                  borderRadius: '8px',
                  color: '#9333ea',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: uploadingSolana ? 'wait' : 'pointer',
                  opacity: uploadingSolana ? 0.6 : 1,
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={e => !uploadingSolana && (e.target.style.background = 'rgba(147, 51, 234, 0.2)')}
                onMouseOut={e => !uploadingSolana && (e.target.style.background = 'rgba(147, 51, 234, 0.1)')}
                title={solanaWallet?.address ? `Solana: ${solanaWallet.address.substring(0, 8)}...` : 'Upload to Solana'}
              >
                <BarChart3 size={16} />
                {uploadingSolana ? 'Uploading...' : 'Upload to Solana'}
              </button>
              <button
                onClick={refreshMarketData}
                style={{
                  padding: '0.625rem 1.25rem',
                  background: 'rgba(74, 222, 128, 0.1)',
                  border: '1px solid #4ade80',
                  borderRadius: '8px',
                  color: '#4ade80',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={e => e.target.style.background = 'rgba(74, 222, 128, 0.2)'}
                onMouseOut={e => e.target.style.background = 'rgba(74, 222, 128, 0.1)'}
              >
                <RefreshCw size={16} />
                Refresh Market Data
              </button>
                </>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem',
            borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
            paddingBottom: '0'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['categories', 'holdings'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: activeTab === tab ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab ? '2px solid #64ffda' : '2px solid transparent',
                    color: activeTab === tab ? '#64ffda' : '#64748b',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Action buttons aligned with tabs */}
            {!viewerMode && activeTab === 'categories' && (
              <button
                onClick={() => setShowAddCategory(true)}
                style={{
                  padding: '0.625rem 1.25rem',
                  background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#0a0e27',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <PlusCircle size={16} />
                Add Category
              </button>
            )}
            {!viewerMode && activeTab === 'holdings' && (
              <>
                <button
                  onClick={() => setShowAddHolding(true)}
                  style={{
                    padding: '0.625rem 1.25rem',
                    background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#0a0e27',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <PlusCircle size={16} />
                  Add Holding
                </button>

                <label 
                  htmlFor="csv-upload"
                  style={{
                    padding: '0.625rem 1.25rem',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid #3b82f6',
                    borderRadius: '8px',
                    color: '#3b82f6',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: importing ? 'wait' : 'pointer',
                    opacity: importing ? 0.6 : 1,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={e => !importing && (e.target.style.background = 'rgba(59, 130, 246, 0.2)')}
                  onMouseOut={e => !importing && (e.target.style.background = 'rgba(59, 130, 246, 0.1)')}
                >
                  <FileText size={16} />
                  {importing ? 'Importing...' : 'Import CSV'}
                </label>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleImportCSV}
                  disabled={importing}
                  style={{ display: 'none' }}
                />

                <button
                  onClick={handleFixSubCategories}
                  disabled={fixingSubCategories}
                  style={{
                    padding: '0.625rem 1.25rem',
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid #a855f7',
                    borderRadius: '8px',
                    color: '#a855f7',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: fixingSubCategories ? 'wait' : 'pointer',
                    opacity: fixingSubCategories ? 0.6 : 1,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={e => !fixingSubCategories && (e.target.style.background = 'rgba(168, 85, 247, 0.2)')}
                  onMouseOut={e => !fixingSubCategories && (e.target.style.background = 'rgba(168, 85, 247, 0.1)')}
                >
                  <BarChart3 size={16} />
                  {fixingSubCategories ? 'Fixing...' : 'Fix Blank Sub-Categories'}
                </button>

                {importResults && (
                  <span style={{ 
                    fontSize: '0.875rem',
                    color: '#4ade80',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    ✓ Imported {importResults.processed} holdings
                    {importResults.skipped > 0 && ` (${importResults.skipped} errors)`}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '2rem' }}>
        {activeTab === 'categories' && (
          <div style={{ 
            height: 'calc(100vh - 240px)', 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            {/* Categories Table */}
            <div style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(100, 255, 218, 0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ flex: 1, overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                  <thead style={{ 
                    position: 'sticky', 
                    top: 0, 
                    zIndex: 10,
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <tr style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
                    <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64ffda', textTransform: 'uppercase', letterSpacing: '0.05em', width: '35%' }}>Category</th>
                    <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64ffda', textTransform: 'uppercase', letterSpacing: '0.05em', width: '20%' }}>Total Value</th>
                    <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64ffda', textTransform: 'uppercase', letterSpacing: '0.05em', width: '15%' }}>% Allocation</th>
                    {!viewerMode && <th style={{ padding: '0.5rem 0.75rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64ffda', textTransform: 'uppercase', letterSpacing: '0.05em', width: '30%' }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => {
                    const categoryTotal = getCategoryTotal(category.id);
                    const categoryPercent = totalValue > 0 ? (categoryTotal / totalValue * 100) : 0;
                    const isExpanded = expandedCategories.has(category.id);

                    return (
                      <React.Fragment key={category.id}>
                        <tr style={{ 
                          borderTop: '1px solid rgba(100, 255, 218, 0.05)',
                          transition: 'background 0.2s'
                        }}>
                          <td style={{ padding: '0.375rem 0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <button
                                onClick={() => toggleCategory(category.id)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#64ffda',
                                  cursor: 'pointer',
                                  padding: '0.25rem',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                              </button>
                              <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{category.name}</span>
                            </div>
                          </td>
                          <td style={{ padding: '0.375rem 0.75rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '500' }}>
                            ${categoryTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td style={{ padding: '0.375rem 0.75rem', textAlign: 'right', fontSize: '0.75rem' }}>
                            <span style={{
                              padding: '0.25rem 0.75rem',
                              background: 'rgba(100, 255, 218, 0.1)',
                              borderRadius: '6px',
                              fontWeight: '600',
                              color: '#64ffda'
                            }}>
                              {categoryPercent.toFixed(2)}%
                            </span>
                          </td>
                          {!viewerMode && (
                          <td style={{ padding: '0.375rem 0.75rem', textAlign: 'center' }}>
                            <button
                              onClick={() => setShowAddSubCategory(category.id)}
                              style={{
                                padding: '0.375rem 0.75rem',
                                background: 'rgba(74, 222, 128, 0.1)',
                                border: '1px solid rgba(74, 222, 128, 0.3)',
                                borderRadius: '6px',
                                color: '#4ade80',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              + Sub-Category
                            </button>
                          </td>
                          )}
                        </tr>

                        {/* Sub-categories */}
                        {isExpanded && category.subCategories.map(subCat => {
                          const subCatTotal = getSubCategoryTotal(subCat.id);
                          const subCatPercent = categoryTotal > 0 ? (subCatTotal / categoryTotal * 100) : 0;
                          
                          // Get holdings for this sub-category
                          const subCatHoldings = holdings.filter(h => h.subCategoryId === subCat.id);

                          return (
                            <tr 
                              key={subCat.id} 
                              style={{ 
                                borderTop: '1px solid rgba(100, 255, 218, 0.03)',
                                background: 'rgba(15, 23, 42, 0.2)',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                if (subCatHoldings.length > 0) {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  
                                  // Position tooltip to the right of cursor position
                                  setTooltip({
                                    x: e.clientX + 20,
                                    y: rect.top,
                                    subCategoryName: subCat.name,
                                    holdings: subCatHoldings,
                                    total: subCatTotal
                                  });
                                }
                              }}
                              onMouseLeave={(e) => {
                                // Only hide if not moving to tooltip
                                const relatedTarget = e.relatedTarget;
                                if (!relatedTarget || !relatedTarget.closest('.tooltip-container')) {
                                  setTooltip(null);
                                }
                              }}
                            >
                              <td style={{ padding: '0.375rem 0.75rem', paddingLeft: '3rem' }}>
                                <span style={{ 
                                  fontSize: '0.75rem', 
                                  color: '#94a3b8',
                                  fontWeight: '500'
                                }}>
                                  ↳ {subCat.name}
                                </span>
                              </td>
                              <td style={{ padding: '0.375rem 0.75rem', textAlign: 'right', fontSize: '0.75rem', color: '#94a3b8' }}>
                                ${subCatTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                              <td style={{ padding: '0.375rem 0.75rem', textAlign: 'right', fontSize: '0.75rem' }}>
                                <span style={{
                                  padding: '0.25rem 0.625rem',
                                  background: 'rgba(74, 222, 128, 0.1)',
                                  borderRadius: '6px',
                                  fontWeight: '600',
                                  color: '#4ade80',
                                  fontSize: '0.75rem'
                                }}>
                                  {subCatPercent.toFixed(2)}%
                                </span>
                              </td>
                              {!viewerMode && <td></td>}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}

        {activeTab === 'holdings' && (
          <div style={{ 
            height: 'calc(100vh - 240px)', 
            display: 'flex', 
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Category Filter */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <label style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '600',
                  color: '#64ffda',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Filter by Category:
                </label>
                <select
                  value={filterCategory?.id || ''}
                  onChange={(e) => handleCategoryFilterChange(e.target.value)}
                  style={{
                    padding: '0.625rem 1rem',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(100, 255, 218, 0.2)',
                    borderRadius: '8px',
                    color: '#e8edf4',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    minWidth: '200px'
                  }}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                
                {filterCategory && (
                  <button
                    onClick={() => handleCategoryFilterChange(null)}
                    style={{
                      padding: '0.625rem 1rem',
                      background: 'rgba(248, 113, 113, 0.1)',
                      border: '1px solid rgba(248, 113, 113, 0.3)',
                      borderRadius: '8px',
                      color: '#f87171',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Clear Filter
                  </button>
                )}

                {/* Account Type Legend */}
                <div style={{ 
                  marginLeft: 'auto',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  fontSize: '0.75rem',
                  color: '#94a3b8'
                }}>
                  <span style={{ fontWeight: '600', color: '#64ffda' }}>Account Type:</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ color: '#ef4444', fontWeight: '600' }}>●</span> Roth IRA
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ color: '#22c55e', fontWeight: '600' }}>●</span> Traditional IRA
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ color: '#eab308', fontWeight: '600' }}>●</span> Taxable
                  </span>
                </div>
              </div>

              {/* Sub-Category Filter Cards */}
              {filterCategory && filterCategory.subCategories.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'rgba(15, 23, 42, 0.3)',
                  borderRadius: '12px',
                  border: '1px solid rgba(100, 255, 218, 0.1)'
                }}>
                  <div style={{
                    width: '100%',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64ffda',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.25rem'
                  }}>
                    Sub-Categories:
                  </div>
                  {filterCategory.subCategories.map(subCat => {
                    const isActive = filterSubCategories.has(subCat.id);
                    const subCatHoldings = holdings.filter(h => h.subCategoryId === subCat.id);
                    const subCatCount = subCatHoldings.length;
                    
                    return (
                      <button
                        key={subCat.id}
                        onClick={() => toggleSubCategoryFilter(subCat.id)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setContextMenu({
                            x: e.clientX,
                            y: e.clientY,
                            subCategoryId: subCat.id,
                            subCategoryName: subCat.name
                          });
                        }}
                        style={{
                          padding: '0.625rem 1rem',
                          background: isActive 
                            ? 'linear-gradient(135deg, rgba(100, 255, 218, 0.15) 0%, rgba(74, 222, 128, 0.15) 100%)' 
                            : 'rgba(15, 23, 42, 0.4)',
                          border: isActive 
                            ? '2px solid #64ffda' 
                            : '2px solid rgba(100, 116, 139, 0.3)',
                          borderRadius: '8px',
                          color: isActive ? '#64ffda' : '#64748b',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          opacity: isActive ? 1 : 0.7
                        }}
                        onMouseOver={e => {
                          if (!isActive) {
                            e.target.style.opacity = '1';
                            e.target.style.borderColor = 'rgba(100, 255, 218, 0.5)';
                          }
                        }}
                        onMouseOut={e => {
                          if (!isActive) {
                            e.target.style.opacity = '0.7';
                            e.target.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                          }
                        }}
                      >
                        <span>{subCat.name}</span>
                        <span style={{
                          padding: '0.125rem 0.5rem',
                          background: isActive ? 'rgba(100, 255, 218, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '700'
                        }}>
                          {subCatCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
              
              {/* Filter Summary */}
              {(filterCategory || filterSubCategories.size > 0) && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(100, 255, 218, 0.05)',
                  borderRadius: '6px',
                  fontSize: '0.8125rem',
                  color: '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <BarChart3 size={14} style={{ color: '#64ffda' }} />
                  <span>
                    Showing <strong style={{ color: '#64ffda' }}>{sortedHoldings.length}</strong> holdings
                    {filterCategory && ` in ${filterCategory.name}`}
                    {filterSubCategories.size > 0 && filterCategory && 
                      ` (${filterSubCategories.size} of ${filterCategory.subCategories.length} sub-categories)`}
                  </span>
                </div>
              )}
            </div>

            {/* Holdings Table */}
            <div style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(100, 255, 218, 0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ flex: 1, overflow: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '0.75rem'
                }}>
                  <thead style={{ 
                    position: 'sticky', 
                    top: 0, 
                    zIndex: 10,
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <tr style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
                    {[
                      { key: 'ticker', label: 'Ticker' },
                      { key: 'subCategory', label: 'Sub-Category' },
                      { key: 'currentPrice', label: 'Price' },
                      { key: 'initialDate', label: 'Initial Date' },
                      { key: 'shares', label: 'Shares' },
                      { key: 'shareBasis', label: 'Share Basis' },
                      { key: 'costBasis', label: 'Cost Basis' },
                      { key: 'currentValue', label: 'Current Value' },
                      { key: 'profitLoss', label: 'P/L $' },
                      { key: 'profitLossPercent', label: 'P/L %' },
                      { key: 'portfolioAllocation', label: '% Portfolio' },
                      { key: 'dividendYield', label: 'Div Yield' },
                      ...(viewerMode ? [] : [{ key: 'actions', label: 'Actions' }])
                    ].map(col => (
                      <th
                        key={col.key}
                        onClick={() => col.key !== 'actions' && col.key !== 'subCategory' && requestSort(col.key)}
                        style={{
                          padding: '0.375rem 0.5rem',
                          textAlign: col.key === 'ticker' ? 'left' : 'right',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          color: '#64ffda',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          cursor: col.key !== 'actions' ? 'pointer' : 'default',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {col.label}
                        {sortConfig.key === col.key && (
                          <span style={{ marginLeft: '0.25rem' }}>
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedHoldings.length === 0 ? (
                    <tr>
                      <td colSpan={viewerMode ? 12 : 13} style={{ 
                        padding: '2rem', 
                        textAlign: 'center', 
                        color: '#64748b',
                        fontSize: '0.875rem'
                      }}>
                        No holdings yet. Add your first holding to get started.
                      </td>
                    </tr>
                  ) : (
                    sortedHoldings.map(holding => {
                      const currentPrice = holding.currentPrice || 0;
                      const shareBasis = holding.shareBasis || 0;
                      const shares = holding.shares || 0;
                      
                      const currentValue = shares * currentPrice;
                      const costBasis = shares * shareBasis;
                      const profitLoss = currentValue - costBasis;
                      const profitLossPercent = costBasis > 0 ? (profitLoss / costBasis * 100) : 0;
                      const portfolioAllocation = totalValue > 0 ? (currentValue / totalValue * 100) : 0;
                      const isProfitable = profitLoss >= 0;
                      const isExpanded = expandedHoldings.has(holding.id);

                      return (
                        <React.Fragment key={holding.id}>
                          <tr style={{ 
                            borderTop: '1px solid rgba(100, 255, 218, 0.05)',
                            transition: 'background 0.2s',
                            background: isExpanded ? 'rgba(100, 255, 218, 0.03)' : 'transparent'
                          }}>
                            <td style={{ 
                              padding: '0.375rem 0.5rem',
                              fontWeight: '600',
                              color: '#e8edf4'
                            }} title={holding.companyName || holding.ticker}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {!viewerMode && (
                                <button
                                  onClick={() => toggleHoldingExpansion(holding.id)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#64ffda',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'transform 0.2s'
                                  }}
                                  title={isExpanded ? 'Hide transactions' : 'Show transactions'}
                                >
                                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </button>
                                )}
                                <span style={{
                                  color: holding.accountType === 'Roth IRA' ? '#ef4444' : 
                                         holding.accountType === 'Traditional IRA' ? '#22c55e' : 
                                         '#eab308',
                                  fontWeight: '600'
                                }}>{holding.ticker}</span>
                              </div>
                            </td>
                          <td style={{ padding: '0.375rem 0.5rem', color: '#94a3b8', fontSize: '0.75rem' }}>
                            {(() => {
                              const category = categories.find(c => c.id === holding.categoryId);
                              const subCategory = category?.subCategories?.find(sc => sc.id === holding.subCategoryId);
                              return subCategory?.name || '-';
                            })()}
                          </td>
                          <td style={{ padding: '0.375rem 0.5rem', textAlign: 'right' }}>
                            ${(holding.currentPrice || 0).toFixed(2)}
                          </td>
                          <td style={{ padding: '0.375rem 0.5rem', textAlign: 'right', color: '#94a3b8' }}>
                            {holding.initialDate ? 
                              new Intl.DateTimeFormat('en-US').format(new Date(holding.initialDate.replace(/-/g, '/') + ' 00:00:00'))
                              : 'N/A'}
                          </td>
                          <td style={{ padding: '0.375rem 0.5rem', textAlign: 'right' }}>
                            {shares.toLocaleString()}
                          </td>
                          <td style={{ padding: '0.375rem 0.5rem', textAlign: 'right' }}>
                            ${(holding.shareBasis || 0).toFixed(2)}
                          </td>
                          <td style={{ padding: '0.375rem 0.5rem', textAlign: 'right' }}>
                            ${costBasis.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td style={{ padding: '0.375rem 0.5rem', textAlign: 'right', fontWeight: '600' }}>
                            ${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td style={{ 
                            padding: '0.375rem 0.5rem', 
                            textAlign: 'right',
                            color: isProfitable ? '#4ade80' : '#f87171',
                            fontWeight: '600'
                          }}>
                            {isProfitable ? '+' : ''}{profitLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td style={{ 
                            padding: '0.375rem 0.5rem', 
                            textAlign: 'right'
                          }}>
                            <span style={{
                              padding: '0.25rem 0.5rem',
                              background: isProfitable ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                              borderRadius: '4px',
                              color: isProfitable ? '#4ade80' : '#f87171',
                              fontWeight: '600',
                              fontSize: '0.75rem'
                            }}>
                              {isProfitable ? '+' : ''}{profitLossPercent.toFixed(2)}%
                            </span>
                          </td>
                          <td style={{ padding: '0.375rem 0.5rem', textAlign: 'right', fontSize: '0.75rem' }}>
                            {portfolioAllocation.toFixed(2)}%
                          </td>
                          <td style={{ padding: '0.375rem 0.5rem', textAlign: 'right', color: '#94a3b8' }}>
                            {holding.dividendYield ? `${holding.dividendYield.toFixed(2)}%` : '-'}
                          </td>
                          {!viewerMode && (
                          <td style={{ padding: '0.375rem 0.5rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setShowAddTransaction({ ...holding, type: 'BUY' })}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: 'rgba(74, 222, 128, 0.1)',
                                  border: '1px solid rgba(74, 222, 128, 0.3)',
                                  borderRadius: '4px',
                                  color: '#4ade80',
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                +
                              </button>
                              <button
                                onClick={() => setShowAddTransaction({ ...holding, type: 'SELL' })}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: 'rgba(248, 113, 113, 0.1)',
                                  border: '1px solid rgba(248, 113, 113, 0.3)',
                                  borderRadius: '4px',
                                  color: '#f87171',
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                -
                              </button>
                              <button
                                onClick={() => setShowNotes(holding)}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: 'rgba(100, 255, 218, 0.1)',
                                  border: '1px solid rgba(100, 255, 218, 0.3)',
                                  borderRadius: '4px',
                                  color: '#64ffda',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <FileText size={12} />
                              </button>
                              <button
                                onClick={() => setShowEditPrice(holding)}
                                title="Edit Current Price"
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: 'rgba(168, 85, 247, 0.1)',
                                  border: '1px solid rgba(168, 85, 247, 0.3)',
                                  borderRadius: '4px',
                                  color: '#a855f7',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <DollarSign size={12} />
                              </button>
                              <button
                                onClick={() => setShowCategoryChange(holding)}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: 'rgba(251, 191, 36, 0.1)',
                                  border: '1px solid rgba(251, 191, 36, 0.3)',
                                  borderRadius: '4px',
                                  color: '#fbbf24',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                                title="Change category"
                              >
                                <FolderOpen size={12} />
                              </button>
                              <button
                                onClick={() => deleteHolding(holding.id, holding.ticker)}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: 'rgba(248, 113, 113, 0.1)',
                                  border: '1px solid rgba(248, 113, 113, 0.3)',
                                  borderRadius: '4px',
                                  color: '#f87171',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                                title="Delete holding"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                          )}
                        </tr>


                        {/* Tabbed Content Row */}
                        {isExpanded && (
                          <tr style={{ 
                            background: 'rgba(15, 23, 42, 0.4)',
                            borderTop: '1px solid rgba(100, 255, 218, 0.1)'
                          }}>
                            <td colSpan={viewerMode ? 12 : 13} style={{ padding: '0' }}>
                              {/* Tab Navigation */}
                              <div style={{
                                display: 'flex',
                                borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
                                background: 'rgba(10, 14, 39, 0.6)'
                              }}>
                                {['transactions', 'research', 'news'].map(tab => (
                                  <button
                                    key={tab}
                                    onClick={() => setHoldingTabs(prev => ({ ...prev, [holding.id]: tab }))}
                                    style={{
                                      padding: '0.75rem 1.5rem',
                                      background: (holdingTabs[holding.id] || 'transactions') === tab 
                                        ? 'rgba(100, 255, 218, 0.1)' 
                                        : 'transparent',
                                      border: 'none',
                                      borderBottom: (holdingTabs[holding.id] || 'transactions') === tab 
                                        ? '2px solid #64ffda' 
                                        : '2px solid transparent',
                                      color: (holdingTabs[holding.id] || 'transactions') === tab 
                                        ? '#64ffda' 
                                        : '#94a3b8',
                                      cursor: 'pointer',
                                      fontSize: '0.875rem',
                                      fontWeight: '600',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.05em',
                                      transition: 'all 0.2s'
                                    }}
                                  >
                                    {tab === 'transactions' && `Transactions (${holding.transactions?.length || 0})`}
                                    {tab === 'research' && 'Research Notes'}
                                    {tab === 'news' && `News (${newsItems[holding.id]?.length || 0})`}
                                  </button>
                                ))}
                              </div>

                              {/* Tab Content */}
                              <div style={{ padding: '1rem 2rem' }}>
                                {/* TRANSACTIONS TAB */}
                                {(holdingTabs[holding.id] || 'transactions') === 'transactions' && (
                                  <div>
                                    {holding.transactions && holding.transactions.length > 0 ? (
                                      <div style={{ 
                                        display: 'grid',
                                        gridTemplateColumns: 'auto auto auto auto auto auto 1fr auto',
                                        gap: '0.75rem 1.5rem',
                                        fontSize: '0.8125rem'
                                      }}>
                                        {/* Header */}
                                        <div style={{ fontWeight: '600', color: '#64ffda' }}>Date</div>
                                        <div style={{ fontWeight: '600', color: '#64ffda' }}>Type</div>
                                        <div style={{ fontWeight: '600', color: '#64ffda', textAlign: 'right' }}>Shares</div>
                                        <div style={{ fontWeight: '600', color: '#64ffda', textAlign: 'right' }}>Price</div>
                                        <div style={{ fontWeight: '600', color: '#64ffda', textAlign: 'right' }}>Fees</div>
                                        <div style={{ fontWeight: '600', color: '#64ffda', textAlign: 'right' }}>Total</div>
                                        <div style={{ fontWeight: '600', color: '#64ffda' }}>Account</div>
                                        <div style={{ fontWeight: '600', color: '#64ffda' }}>Actions</div>

                                        {/* Transactions */}
                                        {holding.transactions.map((transaction, idx) => {
                                          const total = (transaction.shares * transaction.price_per_share) + (transaction.fees || 0);
                                          return (
                                            <React.Fragment key={idx}>
                                              <div style={{ color: '#94a3b8' }}>
                                                {transaction.transaction_date ? 
                                                  new Intl.DateTimeFormat('en-US').format(new Date(transaction.transaction_date.replace(/-/g, '/') + ' 00:00:00'))
                                                  : 'N/A'}
                                              </div>
                                              <div>
                                                <span style={{
                                                  padding: '0.125rem 0.5rem',
                                                  background: transaction.transaction_type === 'BUY' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                                                  color: transaction.transaction_type === 'BUY' ? '#4ade80' : '#f87171',
                                                  borderRadius: '4px',
                                                  fontSize: '0.75rem',
                                                  fontWeight: '600'
                                                }}>
                                                  {transaction.transaction_type}
                                                </span>
                                              </div>
                                              <div style={{ textAlign: 'right', color: '#e8edf4' }}>
                                                {transaction.shares.toLocaleString()}
                                              </div>
                                              <div style={{ textAlign: 'right', color: '#e8edf4' }}>
                                                ${transaction.price_per_share.toFixed(4)}
                                              </div>
                                              <div style={{ textAlign: 'right', color: '#94a3b8' }}>
                                                ${(transaction.fees || 0).toFixed(2)}
                                              </div>
                                              <div style={{ textAlign: 'right', fontWeight: '600', color: '#e8edf4' }}>
                                                ${total.toFixed(2)}
                                              </div>
                                              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                                                {transaction.account_name || '-'}
                                              </div>
                                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                  onClick={() => setShowEditTransaction({
                                                    id: transaction.id,
                                                    holdingId: holding.id,
                                                    ticker: holding.ticker,
                                                    type: transaction.transaction_type,
                                                    shares: transaction.shares,
                                                    price: transaction.price_per_share,
                                                    fees: transaction.fees || 0,
                                                    date: transaction.transaction_date
                                                  })}
                                                  style={{
                                                    padding: '0.25rem 0.5rem',
                                                    background: 'rgba(100, 255, 218, 0.1)',
                                                    border: '1px solid rgba(100, 255, 218, 0.3)',
                                                    borderRadius: '4px',
                                                    color: '#64ffda',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                  }}
                                                  title="Edit transaction"
                                                >
                                                  <Edit2 size={12} />
                                                </button>
                                                <button
                                                  onClick={() => deleteTransaction(transaction.id)}
                                                  style={{
                                                    padding: '0.25rem 0.5rem',
                                                    background: 'rgba(248, 113, 113, 0.1)',
                                                    border: '1px solid rgba(248, 113, 113, 0.3)',
                                                    borderRadius: '4px',
                                                    color: '#f87171',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                  }}
                                                  title="Delete transaction"
                                                >
                                                  <Trash2 size={12} />
                                                </button>
                                              </div>
                                            </React.Fragment>
                                          );
                                        })}
                                      </div>
                                    ) : (
                                      <div style={{ 
                                        textAlign: 'center', 
                                        padding: '2rem',
                                        color: '#94a3b8'
                                      }}>
                                        No transactions yet
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* RESEARCH NOTES TAB */}
                                {(holdingTabs[holding.id] || 'transactions') === 'research' && (
                                  <div style={{ maxWidth: '900px' }}>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '0.5rem',
                                        color: '#64ffda',
                                        fontSize: '0.875rem',
                                        fontWeight: '600'
                                      }}>
                                        Reason for Buy
                                      </label>
                                      <textarea
                                        value={researchNotes[holding.id]?.reason_for_buy || ''}
                                        onChange={(e) => setResearchNotes(prev => ({
                                          ...prev,
                                          [holding.id]: {
                                            ...prev[holding.id],
                                            reason_for_buy: e.target.value
                                          }
                                        }))}
                                        rows={5}
                                        style={{
                                          width: '100%',
                                          padding: '0.75rem',
                                          background: 'rgba(30, 33, 57, 0.8)',
                                          border: '1px solid rgba(100, 255, 218, 0.2)',
                                          borderRadius: '4px',
                                          color: '#e8edf4',
                                          fontSize: '0.875rem',
                                          fontFamily: 'inherit',
                                          resize: 'vertical'
                                        }}
                                        placeholder="Why did you buy this stock?"
                                      />
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '0.5rem',
                                        color: '#64ffda',
                                        fontSize: '0.875rem',
                                        fontWeight: '600'
                                      }}>
                                        Exit Plan
                                      </label>
                                      <textarea
                                        value={researchNotes[holding.id]?.exit_plan || ''}
                                        onChange={(e) => setResearchNotes(prev => ({
                                          ...prev,
                                          [holding.id]: {
                                            ...prev[holding.id],
                                            exit_plan: e.target.value
                                          }
                                        }))}
                                        rows={5}
                                        style={{
                                          width: '100%',
                                          padding: '0.75rem',
                                          background: 'rgba(30, 33, 57, 0.8)',
                                          border: '1px solid rgba(100, 255, 218, 0.2)',
                                          borderRadius: '4px',
                                          color: '#e8edf4',
                                          fontSize: '0.875rem',
                                          fontFamily: 'inherit',
                                          resize: 'vertical'
                                        }}
                                        placeholder="At what point will you take profits or close the position?"
                                      />
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '0.5rem',
                                        color: '#64ffda',
                                        fontSize: '0.875rem',
                                        fontWeight: '600'
                                      }}>
                                        Upcoming Catalysts
                                      </label>
                                      <textarea
                                        value={researchNotes[holding.id]?.upcoming_catalysts || ''}
                                        onChange={(e) => setResearchNotes(prev => ({
                                          ...prev,
                                          [holding.id]: {
                                            ...prev[holding.id],
                                            upcoming_catalysts: e.target.value
                                          }
                                        }))}
                                        rows={5}
                                        style={{
                                          width: '100%',
                                          padding: '0.75rem',
                                          background: 'rgba(30, 33, 57, 0.8)',
                                          border: '1px solid rgba(100, 255, 218, 0.2)',
                                          borderRadius: '4px',
                                          color: '#e8edf4',
                                          fontSize: '0.875rem',
                                          fontFamily: 'inherit',
                                          resize: 'vertical'
                                        }}
                                        placeholder="What catalysts could affect stock valuation?"
                                      />
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '0.5rem',
                                        color: '#64ffda',
                                        fontSize: '0.875rem',
                                        fontWeight: '600'
                                      }}>
                                        Notes
                                      </label>
                                      <textarea
                                        value={researchNotes[holding.id]?.notes || ''}
                                        onChange={(e) => setResearchNotes(prev => ({
                                          ...prev,
                                          [holding.id]: {
                                            ...prev[holding.id],
                                            notes: e.target.value
                                          }
                                        }))}
                                        rows={5}
                                        style={{
                                          width: '100%',
                                          padding: '0.75rem',
                                          background: 'rgba(30, 33, 57, 0.8)',
                                          border: '1px solid rgba(100, 255, 218, 0.2)',
                                          borderRadius: '4px',
                                          color: '#e8edf4',
                                          fontSize: '0.875rem',
                                          fontFamily: 'inherit',
                                          resize: 'vertical'
                                        }}
                                        placeholder="Additional notes..."
                                      />
                                    </div>

                                    <button
                                      onClick={() => saveResearchNotes(holding.id)}
                                      style={{
                                        padding: '0.75rem 1.5rem',
                                        background: '#64ffda',
                                        border: 'none',
                                        borderRadius: '4px',
                                        color: '#0a0e27',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                      }}
                                      onMouseEnter={(e) => e.target.style.background = '#4dd4b8'}
                                      onMouseLeave={(e) => e.target.style.background = '#64ffda'}
                                    >
                                      Save Research Notes
                                    </button>
                                  </div>
                                )}

                                {/* NEWS TAB */}
                                {(holdingTabs[holding.id] || 'transactions') === 'news' && (
                                  <div>
                                    <div style={{ 
                                      display: 'flex', 
                                      gap: '0.75rem', 
                                      marginBottom: '1.5rem' 
                                    }}>
                                      <button
                                        onClick={() => setShowAddNews(holding.id)}
                                        style={{
                                          padding: '0.5rem 1rem',
                                          background: 'rgba(100, 255, 218, 0.1)',
                                          border: '1px solid rgba(100, 255, 218, 0.3)',
                                          borderRadius: '4px',
                                          color: '#64ffda',
                                          fontSize: '0.875rem',
                                          fontWeight: '600',
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '0.5rem'
                                        }}
                                      >
                                        <PlusCircle size={16} />
                                        Add News
                                      </button>
                                      <button
                                        onClick={() => fetchAINews(holding.id)}
                                        style={{
                                          padding: '0.5rem 1rem',
                                          background: 'rgba(147, 51, 234, 0.1)',
                                          border: '1px solid rgba(147, 51, 234, 0.3)',
                                          borderRadius: '4px',
                                          color: '#a78bfa',
                                          fontSize: '0.875rem',
                                          fontWeight: '600',
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '0.5rem'
                                        }}
                                      >
                                        🤖 Fetch Latest News
                                      </button>
                                    </div>

                                    {newsItems[holding.id] && newsItems[holding.id].length > 0 ? (
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {newsItems[holding.id].map((news) => (
                                          <div
                                            key={news.id}
                                            style={{
                                              background: 'rgba(30, 33, 57, 0.6)',
                                              border: '1px solid rgba(100, 255, 218, 0.1)',
                                              borderRadius: '4px',
                                              padding: '0.75rem',
                                              cursor: 'pointer'
                                            }}
                                            onClick={() => {
                                              const newExpanded = new Set(expandedNews);
                                              if (newExpanded.has(news.id)) {
                                                newExpanded.delete(news.id);
                                              } else {
                                                newExpanded.add(news.id);
                                              }
                                              setExpandedNews(newExpanded);
                                            }}
                                          >
                                            <div style={{ 
                                              display: 'flex', 
                                              justifyContent: 'space-between',
                                              alignItems: 'flex-start',
                                              marginBottom: expandedNews.has(news.id) ? '0.75rem' : '0'
                                            }}>
                                              <div style={{ flex: 1 }}>
                                                <div style={{ 
                                                  fontSize: '0.75rem', 
                                                  color: '#94a3b8',
                                                  marginBottom: '0.25rem'
                                                }}>
                                                  {new Date(news.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                  })}
                                                  {news.is_ai_generated && (
                                                    <span style={{
                                                      marginLeft: '0.5rem',
                                                      padding: '0.125rem 0.375rem',
                                                      background: 'rgba(147, 51, 234, 0.1)',
                                                      border: '1px solid rgba(147, 51, 234, 0.3)',
                                                      borderRadius: '3px',
                                                      fontSize: '0.625rem',
                                                      color: '#a78bfa'
                                                    }}>
                                                      AI
                                                    </span>
                                                  )}
                                                </div>
                                                <div style={{ 
                                                  color: '#e8edf4', 
                                                  fontWeight: '600',
                                                  fontSize: '0.875rem'
                                                }}>
                                                  {news.headline}
                                                </div>
                                              </div>
                                              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                                                {expandedNews.has(news.id) ? (
                                                  <ChevronDown size={16} style={{ color: '#64ffda' }} />
                                                ) : (
                                                  <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                                                )}
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteNewsItem(news.id, holding.id);
                                                  }}
                                                  style={{
                                                    padding: '0.25rem',
                                                    background: 'rgba(248, 113, 113, 0.1)',
                                                    border: '1px solid rgba(248, 113, 113, 0.3)',
                                                    borderRadius: '4px',
                                                    color: '#f87171',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                  }}
                                                  title="Delete news"
                                                >
                                                  <Trash2 size={12} />
                                                </button>
                                              </div>
                                            </div>

                                            {expandedNews.has(news.id) && (
                                              <div>
                                                <div style={{ 
                                                  color: '#94a3b8',
                                                  fontSize: '0.8125rem',
                                                  lineHeight: '1.5',
                                                  marginBottom: '0.5rem'
                                                }}>
                                                  {news.summary}
                                                </div>
                                                {news.source_url && (
                                                  <a
                                                    href={news.source_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    style={{
                                                      color: '#64ffda',
                                                      fontSize: '0.75rem',
                                                      textDecoration: 'none'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                                  >
                                                    View Source →
                                                  </a>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div style={{ 
                                        textAlign: 'center', 
                                        padding: '2rem',
                                        color: '#94a3b8'
                                      }}>
                                        No news items yet. Add manually or fetch with AI.
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Modals */}
      {showAddCategory && (
        <Modal onClose={() => setShowAddCategory(false)}>
          <CategoryForm onSubmit={addCategory} onCancel={() => setShowAddCategory(false)} />
        </Modal>
      )}

      {showAddSubCategory && (
        <Modal onClose={() => setShowAddSubCategory(null)}>
          <SubCategoryForm 
            categoryId={showAddSubCategory}
            onSubmit={(name) => addSubCategory(showAddSubCategory, name)} 
            onCancel={() => setShowAddSubCategory(null)} 
          />
        </Modal>
      )}

      {showAddHolding && (
        <Modal onClose={() => setShowAddHolding(false)}>
          <HoldingForm 
            categories={categories}
            onSubmit={addHolding} 
            onCancel={() => setShowAddHolding(false)} 
          />
        </Modal>
      )}

      {showAddTransaction && (
        <Modal onClose={() => setShowAddTransaction(null)}>
          <TransactionForm 
            holding={showAddTransaction}
            onSubmit={(transaction) => addTransaction(showAddTransaction.id, transaction)}
            onCancel={() => setShowAddTransaction(null)} 
          />
        </Modal>
      )}

      {showEditTransaction && (
        <Modal onClose={() => setShowEditTransaction(null)}>
          <EditTransactionForm 
            transaction={showEditTransaction}
            onSubmit={(transactionData) => editTransaction(showEditTransaction.id, transactionData)}
            onCancel={() => setShowEditTransaction(null)} 
          />
        </Modal>
      )}

      {showNotes && (
        <Modal onClose={() => setShowNotes(null)}>
          <NotesForm 
            holding={showNotes}
            onClose={() => setShowNotes(null)} 
          />
        </Modal>
      )}

      {showEditPrice && (
        <Modal onClose={() => setShowEditPrice(null)}>
          <EditPriceForm 
            holding={showEditPrice}
            onSubmit={async (price) => {
              try {
                await fetch(`${API_BASE_URL}/holdings/${showEditPrice.id}/price`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ currentPrice: price })
                });
                await loadHoldings();
                setShowEditPrice(null);
              } catch (error) {
                console.error('Error updating price:', error);
                alert('Failed to update price');
              }
            }}
            onCancel={() => setShowEditPrice(null)} 
          />
        </Modal>
      )}

      {showCategoryChange && (
        <Modal onClose={() => setShowCategoryChange(null)}>
          <ChangeCategoryForm 
            holding={showCategoryChange}
            categories={categories}
            onSubmit={(categoryId, subCategoryId) => changeCategory(showCategoryChange.id, categoryId, subCategoryId)}
            onCancel={() => setShowCategoryChange(null)} 
          />
        </Modal>
      )}

      {showAddNews && (
        <Modal onClose={() => setShowAddNews(null)}>
          <AddNewsForm 
            holdingId={showAddNews}
            holdings={holdings}
            onSubmit={(newsData) => addNewsItem(showAddNews, newsData)}
            onCancel={() => setShowAddNews(null)} 
          />
        </Modal>
      )}

      {showResearch && (
        <Modal onClose={() => setShowResearch(null)}>
          <ResearchModal 
            research={showResearch}
            onClose={() => setShowResearch(null)} 
          />
        </Modal>
      )}

      {/* Context Menu */}
      {!viewerMode && contextMenu && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(100, 255, 218, 0.3)',
            borderRadius: '8px',
            padding: '0.5rem',
            zIndex: 10000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => researchSubCategory(contextMenu.subCategoryId, contextMenu.subCategoryName)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              background: 'transparent',
              border: 'none',
              color: '#e8edf4',
              fontSize: '0.875rem',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(100, 255, 218, 0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            🔬 Research Stocks I Own
          </button>
        </div>
      )}

      {/* Research Modal */}
      {showResearch && (
        <Modal onClose={() => setShowResearch(null)}>
          <ResearchModal research={showResearch} onClose={() => setShowResearch(null)} />
        </Modal>
      )}

      {/* Sub-Category Holdings Tooltip */}
      {tooltip && (() => {
        const holdingsCount = tooltip.holdings.length;
        const isCompact = holdingsCount > 20;
        const isSuperCompact = holdingsCount > 30;
        
        // Calculate tooltip height estimate
        const headerHeight = 40;
        const rowHeight = isSuperCompact ? 16 : (isCompact ? 20 : 28);
        const estimatedHeight = headerHeight + (holdingsCount * rowHeight) + 30;
        
        // Check if tooltip would go off bottom of screen
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - tooltip.y;
        const spaceAbove = tooltip.y;
        const shouldPositionAbove = spaceBelow < estimatedHeight && spaceAbove > estimatedHeight;
        
        // Calculate top position
        let tooltipTop;
        if (shouldPositionAbove) {
          // Position above, but not above viewport top
          tooltipTop = Math.max(10, tooltip.y - estimatedHeight - 10);
        } else {
          // Position below, but ensure it doesn't go below viewport
          tooltipTop = tooltip.y;
          // If it would go off bottom, cap at max scrollable height
          if (tooltipTop + estimatedHeight > viewportHeight) {
            tooltipTop = Math.max(10, viewportHeight - estimatedHeight - 20);
          }
        }
        
        return (
          <div
            className="tooltip-container"
            style={{
              position: 'fixed',
              left: tooltip.x,
              top: tooltipTop,
              background: 'rgba(15, 23, 42, 0.98)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(100, 255, 218, 0.3)',
              borderRadius: '8px',
              padding: isSuperCompact ? '0.5rem 0.75rem' : '0.75rem 1rem',
              zIndex: 10000,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
              minWidth: '500px',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto',
              pointerEvents: 'auto',
              cursor: 'default'
            }}
            onMouseLeave={() => setTooltip(null)}
          >
            <div style={{
              fontSize: isSuperCompact ? '0.7rem' : '0.75rem',
              fontWeight: '600',
              color: '#64ffda',
              marginBottom: isSuperCompact ? '0.375rem' : '0.5rem',
              borderBottom: '1px solid rgba(100, 255, 218, 0.2)',
              paddingBottom: isSuperCompact ? '0.375rem' : '0.5rem'
            }}>
              {tooltip.subCategoryName} Holdings ({holdingsCount}):
            </div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: isSuperCompact ? '0.1rem' : (isCompact ? '0.15rem' : '0.375rem')
            }}>
              {tooltip.holdings
                .map(holding => {
                  const holdingValue = (holding.shares || 0) * (holding.currentPrice || 0);
                  const holdingPercent = tooltip.total > 0 ? (holdingValue / tooltip.total * 100) : 0;
                  return { holding, holdingValue, holdingPercent };
                })
                .sort((a, b) => b.holdingPercent - a.holdingPercent) // Sort by allocation % (highest first)
                .map(({ holding, holdingValue, holdingPercent }) => {
                const costBasis = (holding.shares || 0) * (holding.shareBasis || 0);
                const profitLoss = holdingValue - costBasis;
                const profitLossPercent = costBasis > 0 ? (profitLoss / costBasis * 100) : 0;
                const isPositive = profitLoss >= 0;
                
                return (
                  <div
                    key={holding.id}
                    style={{
                      fontSize: isSuperCompact ? '0.65rem' : (isCompact ? '0.7rem' : '0.75rem'),
                      color: '#cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: isSuperCompact ? '0.375rem' : '0.5rem',
                      padding: isSuperCompact ? '0.075rem 0' : (isCompact ? '0.125rem 0' : '0.25rem 0')
                    }}
                  >
                    <span style={{ color: '#64ffda', flexShrink: 0 }}>•</span>
                    <span style={{ 
                      fontWeight: '600', 
                      color: '#e8edf4',
                      minWidth: isSuperCompact ? '55px' : '60px',
                      flexShrink: 0,
                      fontSize: isSuperCompact ? '0.65rem' : undefined
                    }}>
                      {holding.ticker}
                    </span>
                    <span style={{ 
                      color: '#94a3b8', 
                      fontSize: isSuperCompact ? '0.6rem' : (isCompact ? '0.65rem' : '0.7rem'),
                      flex: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      ({holding.companyName || holding.ticker})
                    </span>
                    <span style={{ 
                      marginLeft: 'auto', 
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#e8edf4' }}>
                        ${holdingValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span style={{ 
                        color: '#4ade80', 
                        fontWeight: '600',
                        minWidth: '55px',
                        textAlign: 'right'
                      }}>
                        ({holdingPercent.toFixed(1)}%)
                      </span>
                      <span style={{ 
                        color: isPositive ? '#4ade80' : '#f87171',
                        fontWeight: '600',
                        minWidth: '65px',
                        textAlign: 'right'
                      }}>
                        ({isPositive ? '+' : ''}{profitLossPercent.toFixed(1)}%)
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// Modal Component
const Modal = ({ children, onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      border: '1px solid rgba(100, 255, 218, 0.2)',
      borderRadius: '16px',
      padding: '2rem',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto'
    }}>
      {children}
    </div>
  </div>
);

// Category Form
const CategoryForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = React.useState('');

  return (
    <div>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#e8edf4', fontSize: '1.25rem', fontWeight: '600' }}>
        Add Category
      </h3>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          borderRadius: '8px',
          color: '#e8edf4',
          fontSize: '0.875rem',
          marginBottom: '1.5rem'
        }}
      />
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'rgba(100, 116, 139, 0.1)',
            border: '1px solid rgba(100, 116, 139, 0.3)',
            borderRadius: '8px',
            color: '#94a3b8',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => name && onSubmit(name)}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#0a0e27',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

// Sub-Category Form
const SubCategoryForm = ({ categoryId, onSubmit, onCancel }) => {
  const [name, setName] = React.useState('');

  return (
    <div>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#e8edf4', fontSize: '1.25rem', fontWeight: '600' }}>
        Add Sub-Category
      </h3>
      <input
        type="text"
        placeholder="Sub-Category Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          borderRadius: '8px',
          color: '#e8edf4',
          fontSize: '0.875rem',
          marginBottom: '1.5rem'
        }}
      />
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={{
          padding: '0.625rem 1.25rem',
          background: 'rgba(100, 116, 139, 0.1)',
          border: '1px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button
          onClick={() => name && onSubmit(name)}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#0a0e27',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Add Sub-Category
        </button>
      </div>
    </div>
  );
};

// Holding Form
const HoldingForm = ({ categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    ticker: '',
    categoryId: '',
    subCategoryId: '',
    accountType: 'Taxable'
  });

  const selectedCategory = categories.find(c => c.id === parseInt(formData.categoryId));

  return (
    <div>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#e8edf4', fontSize: '1.25rem', fontWeight: '600' }}>
        Add Holding
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Ticker Symbol"
          value={formData.ticker}
          onChange={e => setFormData({ ...formData, ticker: e.target.value.toUpperCase() })}
          style={{
            padding: '0.75rem',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            borderRadius: '8px',
            color: '#e8edf4',
            fontSize: '0.875rem'
          }}
        />
        
        <select
          value={formData.categoryId}
          onChange={e => setFormData({ ...formData, categoryId: e.target.value, subCategoryId: '' })}
          style={{
            padding: '0.75rem',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            borderRadius: '8px',
            color: '#e8edf4',
            fontSize: '0.875rem'
          }}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {selectedCategory && selectedCategory.subCategories.length > 0 && (
          <select
            value={formData.subCategoryId}
            onChange={e => setFormData({ ...formData, subCategoryId: e.target.value })}
            style={{
              padding: '0.75rem',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(100, 255, 218, 0.2)',
              borderRadius: '8px',
              color: '#e8edf4',
              fontSize: '0.875rem'
            }}
          >
            <option value="">Select Sub-Category</option>
            {selectedCategory.subCategories.map(subCat => (
              <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
            ))}
          </select>
        )}

        <select
          value={formData.accountType}
          onChange={e => setFormData({ ...formData, accountType: e.target.value })}
          style={{
            padding: '0.75rem',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            borderRadius: '8px',
            color: '#e8edf4',
            fontSize: '0.875rem'
          }}
        >
          <option value="Taxable">Taxable</option>
          <option value="Traditional IRA">Traditional IRA</option>
          <option value="ROTH IRA">ROTH IRA</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button onClick={onCancel} style={{
          padding: '0.625rem 1.25rem',
          background: 'rgba(100, 116, 139, 0.1)',
          border: '1px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button
          onClick={() => {
            if (formData.ticker && formData.categoryId) {
              onSubmit(formData);
            }
          }}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#0a0e27',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Add Holding
        </button>
      </div>
    </div>
  );
};

// Mic Icon Component (needed for voice input)
const Mic = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

// Transaction Form
const TransactionForm = ({ holding, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    type: holding.type,
    shares: '',
    price: '',
    fees: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [isListening, setIsListening] = React.useState(false);
  const [voiceStatus, setVoiceStatus] = React.useState('');

  const sharesInputRef = React.useRef(null);

  // Auto-focus on shares input when component mounts
  React.useEffect(() => {
    if (sharesInputRef.current) {
      sharesInputRef.current.focus();
    }
  }, []);

  // Parse voice input and fill form fields
  const parseVoiceInput = (transcript) => {
    console.log('Voice transcript:', transcript);
    const lowerTranscript = transcript.toLowerCase();

    const updates = { ...formData };

    // Parse shares (look for numbers followed by "shares" or just first number)
    const sharesMatch = lowerTranscript.match(/(\d+(?:,\d{3})*(?:\.\d+)?)\s*shares?/i) || 
                        lowerTranscript.match(/^(\d+(?:,\d{3})*(?:\.\d+)?)/);
    if (sharesMatch) {
      updates.shares = sharesMatch[1].replace(/,/g, '');
    }

    // Parse price (look for "at", "price", "dollar", "cents", "@")
    const pricePatterns = [
      /(?:at|price|@)\s*\$?(\d+(?:\.\d+)?)/i,
      /(\d+(?:\.\d+)?)\s*(?:dollars?|cents?)/i,
      /\$(\d+(?:\.\d+)?)/
    ];
    
    for (const pattern of pricePatterns) {
      const priceMatch = lowerTranscript.match(pattern);
      if (priceMatch) {
        let price = parseFloat(priceMatch[1]);
        // If they said "cents", convert to dollars
        if (lowerTranscript.includes('cent')) {
          price = price / 100;
        }
        updates.price = price.toString();
        break;
      }
    }

    // Parse fees
    if (lowerTranscript.includes('no fee') || lowerTranscript.includes('zero fee')) {
      updates.fees = '0';
    } else {
      const feesMatch = lowerTranscript.match(/fees?\s*\$?(\d+(?:\.\d+)?)/i);
      if (feesMatch) {
        updates.fees = feesMatch[1];
      }
    }

    // Parse date (various formats)
    const datePatterns = [
      // MM/DD/YYYY or M/D/YYYY
      /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
      // Month name DD, YYYY or Month DD YYYY
      /(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/i,
      // Month DD (assume current year)
      /(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th)?/i
    ];

    for (const pattern of datePatterns) {
      const dateMatch = lowerTranscript.match(pattern);
      if (dateMatch) {
        if (pattern.source.includes('january')) {
          // Month name format
          const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 
                             'july', 'august', 'september', 'october', 'november', 'december'];
          const month = monthNames.indexOf(dateMatch[1].toLowerCase()) + 1;
          const day = parseInt(dateMatch[2]);
          const year = dateMatch[3] || new Date().getFullYear();
          updates.date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        } else {
          // Numeric format
          const month = dateMatch[1].padStart(2, '0');
          const day = dateMatch[2].padStart(2, '0');
          const year = dateMatch[3];
          updates.date = `${year}-${month}-${day}`;
        }
        break;
      }
    }

    setFormData(updates);
    setVoiceStatus('Fields updated! Review and edit if needed.');
  };

  // Start voice recognition
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceStatus('Listening... Speak now!');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      parseVoiceInput(transcript);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setVoiceStatus(`Error: ${event.error}`);
      console.error('Speech recognition error:', event);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const labelStyle = {
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#64ffda',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'block'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(100, 255, 218, 0.2)',
    borderRadius: '8px',
    color: '#e8edf4',
    fontSize: '0.875rem',
    boxSizing: 'border-box'
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, color: '#e8edf4', fontSize: '1.25rem', fontWeight: '600' }}>
          {formData.type === 'BUY' ? 'Buy' : 'Sell'} {holding.ticker}
        </h3>
        
        {/* Voice Input Button */}
        <button
          onClick={startVoiceInput}
          disabled={isListening}
          style={{
            padding: '0.5rem 1rem',
            background: isListening ? 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)' : 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
            border: 'none',
            borderRadius: '8px',
            color: isListening ? '#fff' : '#0a0e27',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: isListening ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
            animation: isListening ? 'pulse 1.5s infinite' : 'none'
          }}
          title="Click and speak to fill form"
        >
          <Mic size={16} />
          {isListening ? 'Listening...' : 'Voice Input'}
        </button>
      </div>

      {voiceStatus && (
        <div style={{
          padding: '0.75rem',
          background: voiceStatus.includes('Error') ? 'rgba(248, 113, 113, 0.1)' : 'rgba(74, 222, 128, 0.1)',
          border: `1px solid ${voiceStatus.includes('Error') ? 'rgba(248, 113, 113, 0.3)' : 'rgba(74, 222, 128, 0.3)'}`,
          borderRadius: '8px',
          color: voiceStatus.includes('Error') ? '#f87171' : '#4ade80',
          fontSize: '0.8125rem',
          marginBottom: '1rem'
        }}>
          {voiceStatus}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Number of Shares</label>
          <input
            ref={sharesInputRef}
            type="number"
            placeholder="0"
            value={formData.shares}
            onChange={e => setFormData({ ...formData, shares: e.target.value })}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Price per Share</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Fees (Optional)</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.fees}
            onChange={e => setFormData({ ...formData, fees: e.target.value })}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Transaction Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            style={inputStyle}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button onClick={onCancel} style={{
          padding: '0.625rem 1.25rem',
          background: 'rgba(100, 116, 139, 0.1)',
          border: '1px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button
          onClick={() => {
            const shares = parseFloat(formData.shares) || 0;
            const price = parseFloat(formData.price) || 0;
            const fees = parseFloat(formData.fees) || 0;
            
            if (shares > 0 && price > 0) {
              onSubmit({ 
                type: formData.type,
                shares,
                price,
                fees,
                date: formData.date
              });
            } else {
              alert('Please enter valid shares and price');
            }
          }}
          style={{
            padding: '0.625rem 1.25rem',
            background: formData.type === 'BUY' ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' : 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {formData.type === 'BUY' ? 'Buy' : 'Sell'} Shares
        </button>
      </div>
    </div>
  );
};

// Edit Transaction Form
const EditTransactionForm = ({ transaction, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    type: transaction.type,
    shares: transaction.shares,
    price: transaction.price,
    fees: transaction.fees,
    date: transaction.date
  });

  const sharesInputRef = React.useRef(null);

  React.useEffect(() => {
    if (sharesInputRef.current) {
      sharesInputRef.current.focus();
    }
  }, []);

  const labelStyle = {
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#64ffda',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'block'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(100, 255, 218, 0.2)',
    borderRadius: '8px',
    color: '#e8edf4',
    fontSize: '0.875rem',
    boxSizing: 'border-box'
  };

  return (
    <div>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#e8edf4', fontSize: '1.25rem', fontWeight: '600' }}>
        Edit {formData.type === 'BUY' ? 'Buy' : 'Sell'} - {transaction.ticker}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Number of Shares</label>
          <input
            ref={sharesInputRef}
            type="number"
            placeholder="0"
            value={formData.shares}
            onChange={e => setFormData({ ...formData, shares: e.target.value })}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Price per Share</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Fees (Optional)</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.fees}
            onChange={e => setFormData({ ...formData, fees: e.target.value })}
            style={inputStyle}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Transaction Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button onClick={onCancel} style={{
          padding: '0.625rem 1.25rem',
          background: 'rgba(100, 116, 139, 0.1)',
          border: '1px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button
          onClick={() => {
            const shares = parseFloat(formData.shares) || 0;
            const price = parseFloat(formData.price) || 0;
            const fees = parseFloat(formData.fees) || 0;
            
            if (shares > 0 && price > 0) {
              onSubmit({ 
                type: formData.type,
                shares,
                price,
                fees,
                date: formData.date
              });
            } else {
              alert('Please enter valid shares and price');
            }
          }}
          style={{
            padding: '0.625rem 1.25rem',
            background: formData.type === 'BUY' ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' : 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Notes Form
const NotesForm = ({ holding, onClose }) => {
  const [notes, setNotes] = React.useState(holding.notes || '');

  return (
    <div>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#e8edf4', fontSize: '1.25rem', fontWeight: '600' }}>
        Notes for {holding.ticker}
      </h3>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Add notes about this holding..."
        style={{
          width: '100%',
          minHeight: '200px',
          padding: '0.75rem',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          borderRadius: '8px',
          color: '#e8edf4',
          fontSize: '0.875rem',
          fontFamily: 'inherit',
          resize: 'vertical'
        }}
      />
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button
          onClick={onClose}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#0a0e27',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Save Notes
        </button>
      </div>
    </div>
  );
};

// Edit Price Form
const EditPriceForm = ({ holding, onSubmit, onCancel }) => {
  const [price, setPrice] = React.useState(holding.currentPrice || 0);

  return (
    <div>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#e8edf4', fontSize: '1.25rem', fontWeight: '600' }}>
        Edit Price - {holding.ticker}
      </h3>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          fontSize: '0.8125rem',
          fontWeight: '600',
          color: '#64ffda',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'block'
        }}>
          Current Price
        </label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(parseFloat(e.target.value))}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            borderRadius: '8px',
            color: '#e8edf4',
            fontSize: '0.875rem',
            fontFamily: 'inherit'
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.3)',
            borderRadius: '8px',
            color: '#f87171',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit(price)}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'linear-gradient(135deg, #64ffda 0%, #4ade80 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#0a0e27',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Save Price
        </button>
      </div>
    </div>
  );
};

// Change Category Form
const ChangeCategoryForm = ({ holding, categories, onSubmit, onCancel }) => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(holding.categoryId || '');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = React.useState(holding.subCategoryId || '');

  const selectedCategory = categories.find(c => c.id === parseInt(selectedCategoryId));
  const currentCategory = categories.find(c => c.id === holding.categoryId);
  const currentSubCategory = currentCategory?.subCategories?.find(sc => sc.id === holding.subCategoryId);

  const labelStyle = {
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#64ffda',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'block'
  };

  const selectStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(100, 255, 218, 0.2)',
    borderRadius: '8px',
    color: '#e8edf4',
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    cursor: 'pointer'
  };

  return (
    <div>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#e8edf4', fontSize: '1.25rem', fontWeight: '600' }}>
        Change Category - {holding.ticker}
      </h3>

      {currentCategory && (
        <div style={{
          padding: '0.75rem',
          background: 'rgba(100, 255, 218, 0.05)',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          color: '#94a3b8'
        }}>
          Currently in: <span style={{ color: '#64ffda', fontWeight: '600' }}>
            {currentCategory.name} → {currentSubCategory?.name || 'None'}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Category</label>
          <select
            value={selectedCategoryId}
            onChange={e => {
              setSelectedCategoryId(e.target.value);
              setSelectedSubCategoryId(''); // Reset sub-category when category changes
            }}
            style={selectStyle}
          >
            <option value="">Select Category...</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {selectedCategoryId && selectedCategory?.subCategories?.length > 0 && (
          <div>
            <label style={labelStyle}>Sub-Category *</label>
            <select
              value={selectedSubCategoryId}
              onChange={e => setSelectedSubCategoryId(e.target.value)}
              style={selectStyle}
            >
              <option value="">Select Sub-Category...</option>
              {selectedCategory.subCategories.map(subCat => (
                <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button onClick={onCancel} style={{
          padding: '0.625rem 1.25rem',
          background: 'rgba(100, 116, 139, 0.1)',
          border: '1px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button
          onClick={() => {
            if (!selectedSubCategoryId) {
              alert('Please select a sub-category');
              return;
            }
            onSubmit(parseInt(selectedCategoryId), parseInt(selectedSubCategoryId));
          }}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#0a0e27',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Move Holding
        </button>
      </div>
    </div>
  );
};


// Add News Form Component
const AddNewsForm = ({ holdingId, holdings, onSubmit, onCancel }) => {
  const holding = holdings.find(h => h.id === holdingId);
  const [formData, setFormData] = React.useState({
    headline: '',
    summary: '',
    source_url: '',
    date: new Date().toISOString().split('T')[0] // Default to today's date in EST
  });

  const handleSubmit = () => {
    if (!formData.headline) {
      alert('Please enter a headline');
      return;
    }
    onSubmit(formData);
  };

  const labelStyle = {
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#64ffda',
    marginBottom: '0.5rem',
    display: 'block'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(100, 255, 218, 0.2)',
    borderRadius: '8px',
    color: '#e8edf4',
    fontSize: '0.875rem',
    boxSizing: 'border-box'
  };

  return (
    <div>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#e8edf4', fontSize: '1.25rem', fontWeight: '600' }}>
        Add News for {holding?.ticker}
      </h3>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={labelStyle}>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={labelStyle}>Headline *</label>
        <input
          type="text"
          value={formData.headline}
          onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
          style={inputStyle}
          placeholder="Enter news headline..."
        />
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={labelStyle}>Summary</label>
        <textarea
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          rows={5}
          style={{
            ...inputStyle,
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
          placeholder="Enter news summary..."
        />
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={labelStyle}>Source URL (optional)</label>
        <input
          type="url"
          value={formData.source_url}
          onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
          style={inputStyle}
          placeholder="https://..."
        />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'rgba(30, 33, 57, 0.8)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            borderRadius: '8px',
            color: '#94a3b8',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: '0.625rem 1.25rem',
            background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#0a0e27',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Add News
        </button>
      </div>
    </div>
  );
};


// Research Modal Component
const ResearchModal = ({ research, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(research.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: "800px", maxHeight: "80vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ margin: 0, color: "#e8edf4", fontSize: "1.25rem", fontWeight: "600" }}>
          🔬 Research: {research.subCategoryName}
        </h3>
        {!research.loading && research.content && (
          <button
            onClick={copyToClipboard}
            style={{
              padding: "0.5rem 1rem",
              background: copied ? "rgba(74, 222, 128, 0.1)" : "rgba(100, 255, 218, 0.1)",
              border: `1px solid ${copied ? "rgba(74, 222, 128, 0.3)" : "rgba(100, 255, 218, 0.3)"}`,
              borderRadius: "6px",
              color: copied ? "#4ade80" : "#64ffda",
              fontSize: "0.875rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
        )}
      </div>

      <div style={{ 
        flex: 1,
        overflow: "auto",
        background: "rgba(15, 23, 42, 0.4)",
        borderRadius: "8px",
        padding: "1.5rem",
        border: "1px solid rgba(100, 255, 218, 0.1)"
      }}>
        {research.loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔄</div>
            <div>Researching your stocks...</div>
            <div style={{ fontSize: "0.875rem", marginTop: "0.5rem", opacity: 0.7 }}>
              This may take 10-20 seconds
            </div>
          </div>
        ) : (
          <div 
            style={{ 
              color: "#e8edf4", 
              lineHeight: "1.7",
              fontSize: "0.9375rem"
            }}
            dangerouslySetInnerHTML={{ 
              __html: research.content ? markdownToHtml(research.content) : "No research available" 
            }}
          />
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
        <button
          onClick={onClose}
          style={{
            padding: "0.625rem 1.25rem",
            background: "linear-gradient(135deg, #64ffda 0%, #4ade80 100%)",
            border: "none",
            borderRadius: "8px",
            color: "#0a0e27",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Simple Markdown to HTML converter
const markdownToHtml = (markdown) => {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3 style="color: #64ffda; font-size: 1.125rem; font-weight: 600; margin: 1.5rem 0 0.75rem 0;">$1</h3>');
  html = html.replace(/^#### (.*$)/gm, '<h4 style="color: #4ade80; font-size: 1rem; font-weight: 600; margin: 1.25rem 0 0.5rem 0;">$1</h4>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #e8edf4; font-weight: 600;">$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em style="color: #94a3b8;">$1</em>');
  
  // Bullet points
  html = html.replace(/^- (.*$)/gm, '<li style="margin: 0.375rem 0; color: #cbd5e1;">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul style="margin: 0.75rem 0; padding-left: 1.5rem; list-style-type: disc;">$1</ul>');
  
  // Paragraphs
  html = html.split('\n\n').map(para => {
    if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<li')) {
      return para;
    }
    return `<p style="margin: 0.75rem 0; color: #cbd5e1;">${para}</p>`;
  }).join('');
  
  // Line breaks
  html = html.replace(/\n/g, '<br />');
  
  return html;
};
-e 
// Render the app (only in default/editor mode)
// viewer.html will render with viewerMode={true} separately
if (!window.__VIEWER_MODE__) {
  ReactDOM.render(<PortfolioApp />, document.getElementById('root'));
}
