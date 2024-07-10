import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Search, MessageSquare, Send, Settings, XCircle } from 'lucide-react';
import Lottie from 'react-lottie-player';
import initialAnimation from '../assets/animations/bot.json';
import Logo from '../assets/images/Logo';
import ThemeSelector from './ThemeSelector';
import SkeletonLoader from './search/SkeletonLoader';
import ChatBubble from './search/ChatBubble';
import ValidationIcon from './search/ValidationIcon';
import { useTheme } from '../styles/theme';
import { searchAPI } from '../services/api';
import { fakeSearchAPI } from '../services/fakeApi';

const RESULTS_PER_PAGE = 5;

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isSummaryComplete, setIsSummaryComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [followUpQuery, setFollowUpQuery] = useState('');
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const searchRef = useRef(null);
  const abortControllerRef = useRef(null);

  const { colors, currentTheme, setCurrentTheme } = useTheme();

  const performSearch = async (searchQuery = query) => {
    if (searchQuery.length < 2) return;

    setIsSearching(true);
    setHasSearched(true);
    setIsGeneratingSummary(true);
    setIsSummaryComplete(false);
    setQuery(searchQuery);

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      const apiFunction = process.env.REACT_APP_USE_FAKE_API === 'true' ? fakeSearchAPI : searchAPI;
      const searchResults = await apiFunction(searchQuery, { signal });
      
      setResults(searchResults.relevants_documents);
      setAiSummary(searchResults.answer);
      setSuggestions(searchResults.followup_questions);

      setIsGeneratingSummary(false);
      setIsSummaryComplete(true);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Search aborted');
      } else {
        console.error('Erreur lors de la recherche:', error);
        // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setAiSummary('');
    setSuggestions([]);
    setHasSearched(false);
    setIsSummaryComplete(false);
    setIsFollowUpOpen(false);
    setIsSearching(false);
    searchRef.current.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handleFollowUpSubmit = (e) => {
    e.preventDefault();
    if (followUpQuery.trim()) {
      performSearch(followUpQuery);
      setFollowUpQuery('');
      setIsFollowUpOpen(false);
    }
  };

  const handleAbortSearch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsSearching(false);
      setIsGeneratingSummary(false);
    }
  };

  const handleReset = () => {
    clearSearch();
    setQuery('');
    setIsSummaryComplete(false);
    setIsSearching(false);
  };

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  return (
    <div className="min-h-screen flex flex-col p-4 relative" style={{ backgroundColor: colors.background, color: colors.text }}>
      <div className={`absolute top-4 left-4 z-10 ${hasSearched ? '' : 'hidden'}`}>
        <div className="flex-shrink-0">
          <Logo />
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500"
          style={{ color: colors.primary }}
        >
          <Settings size={24} />
        </button>
        {isOptionsOpen && (
          <div className="absolute right-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
          </div>
        )}
      </div>

      <motion.div 
        className="w-full max-w-4xl mx-auto flex flex-col items-center"
        initial={false}
        animate={{ 
          y: hasSearched ? 0 : '20vh',
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div 
          className={`w-full flex ${hasSearched ? 'justify-between items-center' : 'flex-col items-center'} mb-8`}
          initial={false}
          animate={{
            flexDirection: hasSearched ? 'row' : 'column',
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {!hasSearched && (
            <Lottie
              loop
              animationData={initialAnimation}
              play
              style={{ width: 300, height: 300 }}
            />
          )}

          {!hasSearched && (
            <motion.div
              className="mt-4"
              initial={false}
              animate={{
                alignSelf: 'center',
                marginBottom: '1rem',
                scale: 1,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Logo />
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          className="relative w-full flex items-center"
          initial={false}
          animate={{
            width: hasSearched ? '100%' : '80%',
            marginTop: hasSearched ? '1rem' : '0',
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {hasSearched && (
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 mr-4"
            >
              Reset
            </button>
          )}
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyPress}
            placeholder="Rechercher..."
            className="w-full py-3 px-4 pr-24 rounded-full border-2"
            style={{ borderColor: colors.primary, color: colors.text, backgroundColor: colors.background }}
          />
          {isSearching && (
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <div className="w-5 h-5 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
              <button onClick={handleAbortSearch} className="text-gray-400 hover:text-gray-600">
                <XCircle size={20} />
              </button>
            </div>
          )}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {query && !isSearching && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setQuery('')}
              >
                <X size={20} />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-opacity-80"
              onClick={() => performSearch()}
              style={{ color: colors.primary }}
            >
              <Search size={24} />
            </motion.button>
          </div>
        </motion.div>

        {isGeneratingSummary && (
          <div className="w-full space-y-4 relative mt-8">
            <SkeletonLoader colors={colors} />
          </div>
        )}

        {isSummaryComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full mt-8"
          >
            <div
              className="p-4 mb-6 rounded-lg"
              style={{ backgroundColor: colors.secondaryLight, borderRadius: '16px' }}
            >
              <h2 className="text-lg font-semibold mb-2 flex items-center" style={{ color: colors.primary }}>
                <ValidationIcon />
                Résumé IA
              </h2>
              <p style={{ color: colors.text }}>{aiSummary}</p>
              <div className="mt-4 flex justify-between items-stretch gap-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex-grow">
                    <ChatBubble
                      onClick={() => {
                        setQuery(suggestion);
                        performSearch(suggestion);
                      }}
                      colors={colors}
                      style={{ height: '100%', whiteSpace: 'normal', textAlign: 'center' }}
                    >
                      {suggestion}
                    </ChatBubble>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setIsFollowUpOpen(!isFollowUpOpen)}
                  className="flex items-center"
                  style={{ color: colors.primary }}
                >
                  <MessageSquare size={18} className="mr-2" />
                  Follow-up
                </button>
              </div>
              <AnimatePresence>
                {isFollowUpOpen && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onSubmit={handleFollowUpSubmit}
                    className="mt-4 flex items-stretch"
                  >
                    <input
                      type="text"
                      value={followUpQuery}
                      onChange={(e) => setFollowUpQuery(e.target.value)}
                      placeholder="Posez une question de suivi..."
                      className="flex-grow p-2 rounded-l-full border-2"
                      style={{ borderColor: colors.primary, color: colors.text, backgroundColor: colors.background }}
                    />
                    <button
                      type="submit"
                      className="text-white px-4 rounded-r-full flex items-center justify-center"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Send size={18} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4 w-full">
              {paginatedResults.map((result, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 py-2"
                >
                  <h2 className="text-lg font-semibold" style={{ color: colors.text }}>{result.title}</h2>
                  <a href={result.urls} className="text-sm hover:underline" style={{ color: colors.primary }}>{result.urls}</a>
                  <p className="text-sm mt-1" style={{ color: colors.text }}>{result.content}</p>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                  style={{ color: colors.primary }}
                >
                  <ChevronLeft size={24} />
                </button>
                <span style={{ color: colors.text }}>
                  Page {currentPage} sur {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-50"
                  style={{ color: colors.primary }}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SearchEngine;
