"use client";

import { lazy, Suspense } from "react";

const LazyLoad = ({ 
  children, 
  fallback = <div className="h-20 animate-pulse bg-gray-800 rounded" /> 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default LazyLoad;