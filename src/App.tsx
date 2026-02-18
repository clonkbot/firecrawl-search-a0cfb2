import { useState, useEffect, useCallback } from 'react';
import { Search, Globe, Zap, Database, ArrowRight, ExternalLink, Flame, Loader2, X, Filter } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  crawlTime: string;
  relevance: number;
}

interface CrawlStatus {
  stage: string;
  progress: number;
  pagesScanned: number;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Advanced Web Scraping Techniques',
    url: 'https://example.com/scraping-guide',
    snippet: 'Learn the most effective methods for extracting structured data from modern web applications using headless browsers and API interception.',
    crawlTime: '0.23s',
    relevance: 98,
  },
  {
    id: '2',
    title: 'Building Custom Search Engines',
    url: 'https://devblog.io/custom-search',
    snippet: 'A comprehensive guide to building your own search engine with crawling, indexing, and ranking algorithms from scratch.',
    crawlTime: '0.18s',
    relevance: 94,
  },
  {
    id: '3',
    title: 'Real-time Data Extraction APIs',
    url: 'https://api-docs.tech/extraction',
    snippet: 'Documentation for high-performance data extraction APIs with support for JavaScript rendering and anti-bot bypass.',
    crawlTime: '0.31s',
    relevance: 89,
  },
  {
    id: '4',
    title: 'Structured Data & Schema Parsing',
    url: 'https://webdata.org/schema',
    snippet: 'Tools and libraries for parsing structured data formats including JSON-LD, microdata, and RDFa from crawled pages.',
    crawlTime: '0.27s',
    relevance: 85,
  },
];

function App() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [crawlStatus, setCrawlStatus] = useState<CrawlStatus | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    depth: 2,
    includeJs: true,
    extractLinks: true,
  });

  const simulateCrawl = useCallback(() => {
    const stages = [
      'Initializing crawlers...',
      'Scanning DNS records...',
      'Parsing HTML content...',
      'Extracting structured data...',
      'Indexing results...',
      'Ranking by relevance...',
    ];

    let currentStage = 0;
    let progress = 0;
    let pagesScanned = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      pagesScanned += Math.floor(Math.random() * 50 + 10);

      if (progress >= 100) {
        currentStage++;
        progress = 0;
      }

      if (currentStage >= stages.length) {
        clearInterval(interval);
        setCrawlStatus(null);
        setResults(mockResults);
        setIsSearching(false);
        return;
      }

      setCrawlStatus({
        stage: stages[currentStage],
        progress: Math.min(progress, 100),
        pagesScanned,
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResults([]);
    simulateCrawl();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 relative overflow-hidden">
      {/* Scan lines overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
      }} />

      {/* Gradient orbs */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-600/20 via-red-600/10 to-transparent blur-3xl" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-600/15 via-orange-600/5 to-transparent blur-3xl" />

      {/* Grid pattern */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-orange-500/20 bg-black/30 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 md:py-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Flame className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
                <div className="absolute inset-0 animate-pulse">
                  <Flame className="w-8 h-8 md:w-10 md:h-10 text-orange-400 blur-sm" />
                </div>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                  <span className="text-orange-500">Fire</span>
                  <span className="text-gray-100">Crawl</span>
                </h1>
                <p className="text-[10px] md:text-xs text-gray-500 font-mono tracking-widest uppercase">Custom Search Engine</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16">
          {/* Hero section */}
          {!isSearching && results.length === 0 && (
            <div className="text-center mb-8 md:mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
                  Crawl the Web
                </span>
                <br />
                <span className="text-gray-300 text-2xl md:text-4xl lg:text-5xl">Extract What Matters</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base font-mono px-4">
                Powerful web crawling with custom search capabilities.
                <br className="hidden md:block" />
                Parse, extract, and index content in milliseconds.
              </p>
            </div>
          )}

          {/* Search form */}
          <form onSubmit={handleSearch} className="w-full max-w-3xl mb-8 px-4 md:px-0">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/50 via-red-600/50 to-orange-600/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 group-focus-within:opacity-75 transition-opacity duration-500" />

              <div className="relative flex items-center bg-[#12121a] border border-orange-500/30 rounded-xl overflow-hidden focus-within:border-orange-500/60 transition-colors">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-3 md:p-4 text-gray-500 hover:text-orange-400 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter URL or search query..."
                  className="flex-1 bg-transparent py-4 md:py-5 text-base md:text-lg font-mono placeholder:text-gray-600 focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={isSearching || !query.trim()}
                  className="m-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-500 hover:to-red-500 transition-all flex items-center gap-2"
                >
                  {isSearching ? (
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                  ) : (
                    <>
                      <span className="hidden sm:inline">Crawl</span>
                      <Search className="w-4 h-4 md:w-5 md:h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Filters panel */}
              {showFilters && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 md:p-6 bg-[#12121a] border border-orange-500/30 rounded-xl z-20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-mono text-orange-400 uppercase tracking-wider">Crawl Options</h3>
                    <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-300">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 font-mono">Crawl Depth</label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={filters.depth}
                        onChange={(e) => setFilters({ ...filters, depth: parseInt(e.target.value) })}
                        className="w-full accent-orange-500"
                      />
                      <span className="text-orange-400 font-mono text-sm">{filters.depth} levels</span>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer py-2">
                      <input
                        type="checkbox"
                        checked={filters.includeJs}
                        onChange={(e) => setFilters({ ...filters, includeJs: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-600 text-orange-500 focus:ring-orange-500 bg-transparent"
                      />
                      <span className="text-sm text-gray-400">Execute JavaScript</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer py-2">
                      <input
                        type="checkbox"
                        checked={filters.extractLinks}
                        onChange={(e) => setFilters({ ...filters, extractLinks: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-600 text-orange-500 focus:ring-orange-500 bg-transparent"
                      />
                      <span className="text-sm text-gray-400">Extract Links</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Crawl status */}
          {crawlStatus && (
            <div className="w-full max-w-3xl mb-8 px-4 md:px-0">
              <div className="bg-[#12121a]/80 border border-orange-500/20 rounded-xl p-4 md:p-6 backdrop-blur">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <RadarAnimation />
                    <span className="font-mono text-orange-400 text-sm">{crawlStatus.stage}</span>
                  </div>
                  <span className="font-mono text-gray-500 text-xs">
                    {crawlStatus.pagesScanned.toLocaleString()} pages scanned
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-600 to-red-500 rounded-full transition-all duration-200"
                    style={{ width: `${crawlStatus.progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="w-full max-w-3xl px-4 md:px-0">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider">
                  {results.length} Results Found
                </h3>
                <button
                  onClick={() => { setResults([]); setQuery(''); }}
                  className="text-xs text-orange-400 hover:text-orange-300 font-mono flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                {results.map((result, index) => (
                  <ResultCard key={result.id} result={result} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Feature cards */}
          {!isSearching && results.length === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full mt-8 md:mt-16 px-4 md:px-0">
              <FeatureCard
                icon={<Globe className="w-6 h-6" />}
                title="Deep Crawling"
                description="Traverse entire websites with configurable depth and link extraction"
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="JS Rendering"
                description="Execute JavaScript to capture dynamically loaded content"
              />
              <FeatureCard
                icon={<Database className="w-6 h-6" />}
                title="Structured Data"
                description="Extract JSON-LD, microdata, and custom schemas automatically"
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-orange-500/10 py-4 md:py-6 px-4 md:px-8">
          <p className="text-center text-xs text-gray-600 font-mono">
            Requested by <span className="text-gray-500">@stringer_kade</span> · Built by <span className="text-gray-500">@clonkbot</span>
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function RadarAnimation() {
  return (
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 border-2 border-orange-500/30 rounded-full" />
      <div className="absolute inset-1 border border-orange-500/20 rounded-full" />
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-spin"
          style={{ animationDuration: '1s' }}
        />
      </div>
      <div className="absolute inset-[10px] bg-orange-500 rounded-full animate-pulse" />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-5 md:p-6 bg-[#12121a]/60 border border-orange-500/20 rounded-xl hover:border-orange-500/40 transition-colors backdrop-blur">
        <div className="text-orange-500 mb-3 md:mb-4">{icon}</div>
        <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-100">{title}</h3>
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ResultCard({ result, index }: { result: SearchResult; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Stagger animation
  }, [index]);

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-orange-600/30 to-red-600/30 rounded-xl blur transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      <div className="relative p-4 md:p-5 bg-[#12121a]/80 border border-orange-500/20 rounded-xl hover:border-orange-500/40 transition-all backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] md:text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                {result.relevance}% match
              </span>
              <span className="text-[10px] md:text-xs font-mono text-gray-600">{result.crawlTime}</span>
            </div>
            <h4 className="text-base md:text-lg font-semibold text-gray-100 mb-1 truncate group-hover:text-orange-400 transition-colors">
              {result.title}
            </h4>
            <p className="text-xs text-green-500/70 font-mono mb-2 truncate">{result.url}</p>
            <p className="text-xs md:text-sm text-gray-400 line-clamp-2">{result.snippet}</p>
          </div>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 md:p-3 text-gray-500 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
