# Hydration Mismatch Prevention Guide

This guide explains how to prevent hydration mismatches in your Next.js application.

## What Causes Hydration Mismatches?

1. **Browser Extensions**: Extensions like Grammarly, clipboard managers, or password managers can add attributes to DOM elements
2. **Random Values**: Using `Math.random()`, `Date.now()` in render functions
3. **Client-only APIs**: Using `window`, `document`, `localStorage` without proper checks
4. **Theme Providers**: Improperly configured theme providers that differ between server and client

## Solutions Implemented

### 1. Client Body Wrapper
- Handles browser extension attributes automatically
- Removes common extension attributes that cause mismatches
- Uses MutationObserver to handle dynamically added attributes

### 2. Hydration Boundary
- Prevents client-side only components from causing mismatches
- Provides fallback rendering during hydration
- Error handling for hydration issues

### 3. Deterministic ID Generation
- Replaced `Math.random()` with `Date.now()` + index for file uploads
- Uses counter-based ID generation for toasts

### 4. Layout Configuration
- Added `suppressHydrationWarning={true}` to body element
- Removed problematic theme providers

## Usage Examples

### For Client-Only Components
```tsx
import { HydrationBoundary } from '@/components/hydration-boundary';

function MyComponent() {
  return (
    <HydrationBoundary fallback={<div>Loading...</div>}>
      <ClientOnlyComponent />
    </HydrationBoundary>
  );
}
```

### For Conditional Rendering
```tsx
import { useHasMounted } from '@/components/hydration-boundary';

function MyComponent() {
  const hasMounted = useHasMounted();
  
  if (!hasMounted) {
    return <div>Loading...</div>;
  }
  
  return <div>{/* Client-side content */}</div>;
}
```

### For File Upload IDs
```tsx
// ❌ Don't do this
const id = Math.random().toString(36);

// ✅ Do this instead
const id = `${Date.now()}-${index}`;
```

## Best Practices

1. **Always use deterministic values** during initial render
2. **Wrap client-only components** in HydrationBoundary
3. **Use useEffect** for client-side only logic
4. **Test with browser extensions** enabled
5. **Monitor console** for hydration warnings

## Common Browser Extension Attributes

The following attributes are automatically handled:
- `cz-shortcut-listen` (Clipboard managers)
- `data-new-gr-c-s-check-loaded` (Grammarly)
- `data-gr-ext-installed` (Grammarly)
- `spellcheck` (Various extensions)
- `data-gramm*` (Grammar checkers)
- `data-enable-grammarly` (Grammarly)
