import '@testing-library/jest-dom/vitest';

if (!window.matchMedia) {
  (window as any).matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

if (!('IntersectionObserver' in window)) {
  class IntersectionObserverStub {
    root = null;
    rootMargin = '';
    thresholds: number[] = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  (window as any).IntersectionObserver = IntersectionObserverStub;
  (window as any).IntersectionObserverEntry = class {};
}

if (!('ResizeObserver' in window)) {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  (window as any).ResizeObserver = ResizeObserverStub;
}