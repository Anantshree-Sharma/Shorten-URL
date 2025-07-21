import { useEffect, useState } from "react";
import {
  Trash2,
  ExternalLink,
  Copy,
  Check,
  BarChart3,
  Calendar,
} from "lucide-react";

function AllUrls() {
  const [allUrls, setAllUrls] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchAllUrls = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/url/analytics`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await res.json();
        setAllUrls(result.analytics);
      } catch (error) {
        console.log("Internal Server Failure: ", error);
      } finally {
        setRefresh(false);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    fetchAllUrls();
  }, [refresh]);

  const handleDelete = async (deleteId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/url/analytics/delete/${deleteId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await res.json();
      if (result.error) {
        console.log("Url not Found");
        return;
      }
    } catch (error) {
      console.log("Internal Server Failure: ", error);
    } finally {
      setRefresh(true);
    }
  };

  const copyToClipboard = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const truncateUrl = (url, maxLength = 40) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto">
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-4 text-gray-900">
          Your Generated URLs
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
          Manage and track your shortened links
        </p>
      </div>

      {loading ? (
        // Mobile-first loading cards for small screens
        <>
          <div className="block lg:hidden space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop loading table */}
          <div className="hidden lg:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-50 border-b border-orange-200">
                  <tr>
                    <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Short URL
                    </th>
                    <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(3)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-4 xl:px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {allUrls && allUrls.length > 0 ? (
            <>
              {/* Mobile Cards (xs to lg) */}
              <div className="block lg:hidden space-y-4">
                {allUrls.map((url) => (
                  <div
                    key={url._id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Short URL Section */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Short URL
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              copyToClipboard(url.shortUrl, url._id)
                            }
                            className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors rounded hover:bg-orange-50"
                            title="Copy URL"
                          >
                            {copiedId === url._id ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <a
                            href={url.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors rounded hover:bg-orange-50"
                            title="Open URL"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <div className="font-mono text-sm text-gray-900 break-all">
                        {truncateUrl(url.shortUrl, 35)}
                      </div>
                    </div>

                    {/* Original URL Section */}
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">
                        Original URL
                      </span>
                      <div className="text-sm text-gray-600 break-all">
                        {url.redirectUrl}
                      </div>
                    </div>

                    {/* Bottom Section - Clicks and Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        <BarChart3 className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">
                          {url.clicks}
                        </span>
                        <span className="text-xs text-gray-500">clicks</span>
                      </div>
                      <button
                        onClick={() => handleDelete(url._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors duration-200 space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden xs:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table (lg and up) */}
              <div className="hidden lg:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-orange-50 border-b border-orange-200">
                      <tr>
                        <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Short URL
                        </th>
                        <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Original URL
                        </th>
                        <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Clicks
                        </th>
                        <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allUrls.map((url) => (
                        <tr
                          key={url._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 xl:px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-mono text-gray-900 min-w-0 flex-1">
                                {truncateUrl(url.shortUrl, 30)}
                              </span>
                              <div className="flex items-center space-x-1 flex-shrink-0">
                                <button
                                  onClick={() =>
                                    copyToClipboard(url.shortUrl, url._id)
                                  }
                                  className="p-1 text-gray-400 hover:text-orange-500 transition-colors rounded hover:bg-orange-50"
                                  title="Copy URL"
                                >
                                  {copiedId === url._id ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                                <a
                                  href={url.shortUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 text-gray-400 hover:text-orange-500 transition-colors rounded hover:bg-orange-50"
                                  title="Open URL"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 xl:px-6 py-4">
                            <div className="text-sm text-gray-600 break-all max-w-xs xl:max-w-md">
                              {url.redirectUrl}
                            </div>
                          </td>
                          <td className="px-4 xl:px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 space-x-1">
                              <BarChart3 className="w-3 h-3" />
                              <span>{url.clicks}</span>
                            </span>
                          </td>
                          <td className="px-4 xl:px-6 py-4">
                            <button
                              onClick={() => handleDelete(url._id)}
                              className="inline-flex items-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors duration-200 space-x-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="xl:inline hidden">Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No URLs found
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Start by shortening your first URL to see it here
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllUrls;
