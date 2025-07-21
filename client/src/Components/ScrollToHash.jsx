import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const scrollToHash = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return true;
      }
      return false;
    };

    // First, try immediately
    if (scrollToHash()) return;

    // If not found, observe DOM until it's added
    const observer = new MutationObserver(() => {
      if (scrollToHash()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => observer.disconnect();
  }, [hash]);

  return null;
}
