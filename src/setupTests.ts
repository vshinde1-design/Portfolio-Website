import '@testing-library/jest-dom'

// Optionally set global mocks or helpers here
// Example: make window.matchMedia available to tests if needed
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    })
  })
}

// Polyfill IntersectionObserver for framer-motion viewport features used in components
if (typeof (window as any).IntersectionObserver === 'undefined') {
  class MockIntersectionObserver {
    callback: any
    constructor(cb: any) {
      this.callback = cb
    }
    observe() { return null }
    unobserve() { return null }
    disconnect() { return null }
    takeRecords() { return [] }
  }
  ;(window as any).IntersectionObserver = MockIntersectionObserver
}
