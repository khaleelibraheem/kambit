import { useEffect, useState } from "react";

const ScrollHeader = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollHeader;