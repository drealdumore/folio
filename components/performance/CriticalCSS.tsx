"use client";

import { useEffect } from 'react';

export default function CriticalCSS() {
  useEffect(() => {
    // Remove non-critical CSS after load
    const removeCriticalCSS = () => {
      const criticalStyle = document.querySelector('style[data-critical]');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };

    // Defer non-critical CSS
    const loadNonCriticalCSS = () => {
      const links = document.querySelectorAll('link[rel="preload"][as="style"]');
      links.forEach(link => {
        link.setAttribute('rel', 'stylesheet');
      });
    };

    if (document.readyState === 'complete') {
      removeCriticalCSS();
      loadNonCriticalCSS();
    } else {
      window.addEventListener('load', () => {
        removeCriticalCSS();
        loadNonCriticalCSS();
      });
    }
  }, []);

  return null;
}