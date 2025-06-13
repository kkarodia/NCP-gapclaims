'use client';

import { useEffect } from 'react';

interface ClientBodyWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ClientBodyWrapper({ children, className }: ClientBodyWrapperProps) {
  useEffect(() => {
    // Handle browser extension attributes that might be added after hydration
    // This prevents hydration mismatches from browser extensions
    const body = document.body;
    
    // Common browser extension attributes that can cause hydration issues
    const extensionAttributes = [
      'cz-shortcut-listen',
      'data-new-gr-c-s-check-loaded',
      'data-gr-ext-installed',
      'spellcheck',
      'data-gramm',
      'data-gramm_editor',
      'data-enable-grammarly'
    ];

    // Remove any extension attributes that might have been added
    extensionAttributes.forEach(attr => {
      if (body.hasAttribute(attr)) {
        body.removeAttribute(attr);
      }
    });

    // Set up a mutation observer to handle dynamically added extension attributes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.target === body) {
          const attributeName = mutation.attributeName;
          if (attributeName && extensionAttributes.includes(attributeName)) {
            body.removeAttribute(attributeName);
          }
        }
      });
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: extensionAttributes
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div className={className}>{children}</div>;
}
