'use client';

import { useEffect, useState } from 'react';

interface HydrationBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

/**
 * A boundary component that prevents hydration mismatches by ensuring
 * client-side only rendering for components that might have different
 * server and client states.
 */
export function HydrationBoundary({ 
  children, 
  fallback = null, 
  onError 
}: HydrationBoundaryProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      setHasMounted(true);
    } catch (error) {
      setHasError(true);
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  }, [onError]);

  if (hasError) {
    return <>{fallback}</>;
  }

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Hook to check if component has mounted on client side
 * Useful for preventing hydration mismatches
 */
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
