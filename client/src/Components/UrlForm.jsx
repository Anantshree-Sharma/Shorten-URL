import { useState, useRef } from "react";
import { useUrl } from "../Context/urlContext";
import { motion } from "framer-motion";
import { Zap, Copy, Check, ExternalLink } from "lucide-react";

function UrlForm() {
  const [value, setValue] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const { error, setError } = useUrl();
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [isVisible, setIsVisble] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("URL: ", value);
    setLoadingUrl(true);
    setIsVisble(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/url`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: value }),
      });
      const result = await response.json();
      console.log(result);
      if (result.errors) {
        setError(result.errors[0]);
        setIsVisble(false);
        result;
      }
      setShortUrl(result.shortUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoadingUrl(false);
      }, 1000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="px-3 sm:px-6 py-12 sm:py-16 lg:py-20 mt-16 sm:mt-20 min-h-screen"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero section */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
          Generate URL
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-xl lg:max-w-2xl mx-auto px-4">
          Transform long URLs into short, memorable links with detailed
          analytics.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-3xl mx-auto">
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Main Form Container */}
        <div className="bg-orange-50 rounded-lg p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto border border-orange-200 shadow-sm">
          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* URL Input */}
              <div className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  name="url"
                  id="url"
                  placeholder="Enter the link here"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 bg-white border border-gray-200 rounded-lg text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loadingUrl || !value.trim()}
                className="px-4 sm:px-6 py-2.5 sm:py-3 lg:py-3.5 bg-orange-400 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 min-w-[120px] sm:min-w-[140px]"
              >
                {loadingUrl ? (
                  <>
                    <div className="w-4 h-4 border-2 border-orange-200 border-t-white rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Shortening...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Shorten</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Loading State */}
          {isVisible && loadingUrl && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-32"></div>
                  <div className="h-6 bg-gray-200 rounded w-full max-w-md"></div>
                </div>
                <div className="ml-4 w-20 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          )}

          {/* Result */}
          {shortUrl && !loadingUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm animate-fade-in"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
                    Your shortened URL:
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 font-mono text-sm sm:text-base break-all flex-1">
                      {shortUrl}
                    </p>
                  </div>
                </div>

                <button
                  onClick={copyToClipboard}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base min-w-[80px] sm:min-w-[100px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 hidden sm:inline">
                        Copied!
                      </span>
                      <span className="text-green-600 sm:hidden">✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UrlForm;
