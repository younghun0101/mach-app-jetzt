import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('Utils', () => {
  describe('cn (classname utility)', () => {
    it('soll Klassen korrekt zusammenführen', () => {
      expect(cn('bg-primary', 'text-white')).toBe('bg-primary text-white');
    });

    it('soll bedingte Klassen korrekt handhaben', () => {
      const isActive = true;
      expect(cn('base-class', isActive && 'active-class')).toBe('base-class active-class');
    });

    it('soll unbedingte Klassen filtern', () => {
      const isActive = false;
      expect(cn('base-class', isActive && 'active-class')).toBe('base-class');
    });

    it('soll undefined/null Werte ignorieren', () => {
      expect(cn('base-class', undefined, null)).toBe('base-class');
    });
  });
});

