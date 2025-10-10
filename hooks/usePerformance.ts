"use client";

import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalImages = [
        '/avatars/avatar-smile.png',
        '/avatars/laptop-avatar.png'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimize third-party scripts
    const optimizeThirdParty = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
          script.setAttribute('defer', '');
        }
      });
    };

    // Run optimizations
    preloadCriticalResources();
    optimizeThirdParty();

    // Cleanup function
    return () => {
      // Remove preload links if needed
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (link.getAttribute('as') === 'image') {
          link.remove();
        }
      });
    };
  }, []);
};