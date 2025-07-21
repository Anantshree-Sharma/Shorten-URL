const SpinnerLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-400 rounded-full animate-spin"></div>
        {/* Glow effect */}
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-orange-400/20 to-orange-500/20 animate-ping"></div>
      </div>

      {/* Loading text with animated dots */}
      <div className="mt-6 text-center">
        <div className="text-lg font-medium text-gray-700 mb-2 flex items-center justify-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpinnerLoading;
