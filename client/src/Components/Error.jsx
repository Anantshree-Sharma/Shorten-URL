import React, { useState, useEffect, useRef } from "react";
import { X, AlertCircle } from "lucide-react";

function Error({ error, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const timersRef = useRef([]);

  // Clear all timers
  const clearAllTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => {
    if (error) {
      // Clear any existing timers first
      clearAllTimers();

      // Reset visibility for new error
      setIsVisible(false);

      // Trigger slide-in animation after a brief delay
      const slideInTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10);

      // Auto-dismiss after 5 seconds
      const autoDismissTimer = setTimeout(() => {
        setIsVisible(false);
        // Call onClose after animation completes
        const closeTimer = setTimeout(() => {
          if (onClose) onClose();
        }, 300);
        timersRef.current.push(closeTimer);
      }, 5000);

      // Store timers for cleanup
      timersRef.current.push(slideInTimer, autoDismissTimer);
    }

    // Cleanup function
    return () => {
      clearAllTimers();
    };
  }, [error, onClose]);

  const handleClose = () => {
    clearAllTimers(); // Clear auto-dismiss timer
    setIsVisible(false);

    // Call onClose after animation completes
    const closeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, 300);
    timersRef.current.push(closeTimer);
  };

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <div
        className={`
          bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg
          transform transition-all duration-300 ease-out
          ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
        `}
      >
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <p className="text-red-800 text-sm font-medium">Error</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>

          <button
            onClick={handleClose}
            className="text-red-400 hover:text-red-600 transition-colors p-1 -m-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
