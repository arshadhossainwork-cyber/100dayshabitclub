import { describe, it, expect, vi, beforeEach } from 'vitest';
import { captureReferralSource, getReferralSource } from './referral.js';

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, 'sessionStorage', { value: sessionStorageMock });

beforeEach(() => {
  sessionStorageMock.clear();
  vi.clearAllMocks();
});

describe('captureReferralSource', () => {
  it('stores ref param from URL', () => {
    Object.defineProperty(window, 'location', {
      value: { search: '?ref=share' },
      writable: true,
    });
    captureReferralSource();
    expect(sessionStorageMock.setItem).toHaveBeenCalledWith('habitClub_ref', 'share');
  });

  it('does nothing when no ref param', () => {
    Object.defineProperty(window, 'location', {
      value: { search: '' },
      writable: true,
    });
    captureReferralSource();
    expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('does not overwrite existing ref', () => {
    sessionStorageMock.getItem.mockReturnValueOnce('existing');
    Object.defineProperty(window, 'location', {
      value: { search: '?ref=new' },
      writable: true,
    });
    captureReferralSource();
    expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('rejects invalid ref values', () => {
    Object.defineProperty(window, 'location', {
      value: { search: '?ref=<script>alert(1)</script>' },
      writable: true,
    });
    captureReferralSource();
    expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('rejects ref values exceeding 50 chars', () => {
    Object.defineProperty(window, 'location', {
      value: { search: `?ref=${'a'.repeat(51)}` },
      writable: true,
    });
    captureReferralSource();
    expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
  });
});

describe('getReferralSource', () => {
  it('returns stored ref', () => {
    sessionStorageMock.getItem.mockReturnValueOnce('share');
    expect(getReferralSource()).toBe('share');
  });

  it('returns null when no ref stored', () => {
    expect(getReferralSource()).toBeNull();
  });
});
