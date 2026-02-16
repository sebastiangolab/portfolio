import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useNavigation from './useNavigation';

describe('useNavigation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.overflow = 'visible';
  });

  afterEach(() => {
    document.body.style.overflow = 'visible';
  });

  describe('initial state', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useNavigation());

      expect(result.current.activeHoverLink).toBe('');
      expect(result.current.mobileNavOpen).toBe(false);
    });
  });

  describe('handleHamburgerClick', () => {
    it('should toggle mobile navigation open state', () => {
      const { result } = renderHook(() => useNavigation());

      expect(result.current.mobileNavOpen).toBe(false);

      act(() => {
        result.current.handleHamburgerClick();
      });

      expect(result.current.mobileNavOpen).toBe(true);

      act(() => {
        result.current.handleHamburgerClick();
      });

      expect(result.current.mobileNavOpen).toBe(false);
    });

    it('should set body overflow to hidden when opening mobile nav', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.handleHamburgerClick();
      });

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should set body overflow to visible when closing mobile nav', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.handleHamburgerClick();
      });

      expect(document.body.style.overflow).toBe('hidden');

      act(() => {
        result.current.handleHamburgerClick();
      });

      expect(document.body.style.overflow).toBe('visible');
    });
  });

  describe('setActiveCurrentPage', () => {
    it('should set active mark position for current page', () => {
      // Setup DOM
      document.body.innerHTML = `
        <nav class="nav">
          <a id="home-link" href="/">Home</a>
          <a id="about-link" href="/about">About</a>
        </nav>
        <div id="active-mark" style="transform: translateX(0px); top: 0;"></div>
      `;

      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.setActiveCurrentPage();
      });

      const activeMark = document.getElementById('active-mark');
      expect(activeMark?.style.top).toBe('0px');
      expect(activeMark?.style.transform).toContain('translateX');
    });

    it('should not update if active link element is not found', () => {
      document.body.innerHTML = `
        <div id="active-mark" style="transform: translateX(0px);"></div>
      `;

      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.setActiveCurrentPage();
      });

      const activeMark = document.getElementById('active-mark');
      expect(activeMark?.style.transform).toBe('translateX(0px)');
    });

    it('should not update if active mark is not found', () => {
      document.body.innerHTML = `
        <nav class="nav">
          <a id="home-link" href="/">Home</a>
        </nav>
      `;

      const { result } = renderHook(() => useNavigation());

      // Should not throw error
      act(() => {
        result.current.setActiveCurrentPage();
      });
    });
  });

  describe('setActiveMarkPosition', () => {
    it('should update active mark position for hovered link', () => {
      document.body.innerHTML = `
        <nav class="nav">
          <a id="home-link" href="/">Home</a>
        </nav>
        <div id="active-mark" style="transform: translateX(0px);"></div>
      `;

      const { result } = renderHook(() => useNavigation());

      // First set the active hover link
      act(() => {
        const linkElement = document.getElementById('home-link');
        const mockEvent = {
          currentTarget: linkElement,
        } as any as React.MouseEvent;
        result.current.handleLinkMouseEnter(mockEvent);
      });

      act(() => {
        result.current.setActiveMarkPosition();
      });

      const activeMark = document.getElementById('active-mark');
      expect(activeMark?.style.transform).toContain('translateX');
    });

    it('should not update if no hover link is set', () => {
      document.body.innerHTML = `
        <div id="active-mark" style="transform: translateX(50px);"></div>
      `;

      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.setActiveMarkPosition();
      });

      const activeMark = document.getElementById('active-mark');
      expect(activeMark?.style.transform).toBe('translateX(50px)');
    });

    it('should not update if hover link element is not found', () => {
      const { result } = renderHook(() => useNavigation());

      // Manually set activeHoverLink
      act(() => {
        const linkElement = document.createElement('a');
        linkElement.id = 'test-link';
        const mockEvent = {
          currentTarget: linkElement,
        } as any as React.MouseEvent;
        result.current.handleLinkMouseEnter(mockEvent);
      });

      document.body.innerHTML = `
        <div id="active-mark" style="transform: translateX(50px);"></div>
      `;

      act(() => {
        result.current.setActiveMarkPosition();
      });

      const activeMark = document.getElementById('active-mark');
      expect(activeMark?.style.transform).toBe('translateX(50px)');
    });
  });

  describe('handleLinkClick', () => {
    it('should set body overflow to visible', () => {
      document.body.style.overflow = 'hidden';

      const { result } = renderHook(() => useNavigation());

      const mockElement = document.createElement('a');
      mockElement.id = 'test-link';

      act(() => {
        const mockEvent = {
          currentTarget: mockElement,
        } as any as React.MouseEvent;
        result.current.handleLinkClick(mockEvent);
      });

      expect(document.body.style.overflow).toBe('visible');
    });

    it('should close mobile navigation', () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.handleHamburgerClick();
      });

      expect(result.current.mobileNavOpen).toBe(true);

      const mockElement = document.createElement('a');
      mockElement.id = 'test-link';

      act(() => {
        const mockEvent = {
          currentTarget: mockElement,
        } as any as React.MouseEvent;
        result.current.handleLinkClick(mockEvent);
      });

      expect(result.current.mobileNavOpen).toBe(false);
    });
  });

  describe('handleLinkMouseEnter', () => {
    it('should set active hover link from nav-link child', () => {
      const { result } = renderHook(() => useNavigation());

      const containerElement = document.createElement('div');
      const linkElement = document.createElement('a');
      linkElement.id = 'home-link';
      linkElement.className = 'nav-link';
      containerElement.appendChild(linkElement);

      act(() => {
        const mockEvent = {
          currentTarget: containerElement,
        } as any as React.MouseEvent;
        result.current.handleLinkMouseEnter(mockEvent);
      });

      expect(result.current.activeHoverLink).toBe('home-link');
    });

    it('should set active hover link from current target if no child', () => {
      const { result } = renderHook(() => useNavigation());

      const linkElement = document.createElement('a');
      linkElement.id = 'direct-link';

      act(() => {
        const mockEvent = {
          currentTarget: linkElement,
        } as any as React.MouseEvent;
        result.current.handleLinkMouseEnter(mockEvent);
      });

      expect(result.current.activeHoverLink).toBe('direct-link');
    });
  });

  describe('handleLinkMouseLeave', () => {
    it('should reset hover link to active link', () => {
      const { result } = renderHook(() => useNavigation());

      // First set an active link
      const activeElement = document.createElement('a');
      activeElement.id = 'active-link';

      act(() => {
        const mockEvent = {
          currentTarget: activeElement,
        } as any as React.MouseEvent;
        result.current.handleLinkClick(mockEvent);
      });

      // Then set a hover link
      const hoverElement = document.createElement('a');
      hoverElement.id = 'hover-link';

      act(() => {
        const mockEvent = {
          currentTarget: hoverElement,
        } as any as React.MouseEvent;
        result.current.handleLinkMouseEnter(mockEvent);
      });

      expect(result.current.activeHoverLink).toBe('hover-link');

      // Mouse leave should reset to active link
      act(() => {
        result.current.handleLinkMouseLeave();
      });

      expect(result.current.activeHoverLink).toBe('active-link');
    });
  });

  describe('hideActiveMark', () => {
    it('should add hide class to active mark element', () => {
      document.body.innerHTML = `
        <div id="active-mark"></div>
      `;

      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.hideActiveMark();
      });

      const activeMark = document.getElementById('active-mark');
      expect(activeMark?.classList.contains('hide')).toBe(true);
    });

    it('should not throw if active mark element is not found', () => {
      const { result } = renderHook(() => useNavigation());

      expect(() => {
        act(() => {
          result.current.hideActiveMark();
        });
      }).not.toThrow();
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete navigation interaction flow', () => {
      document.body.innerHTML = `
        <nav class="nav">
          <a id="home-link" class="nav-link" href="/">Home</a>
          <a id="about-link" class="nav-link" href="/about">About</a>
        </nav>
        <div id="active-mark"></div>
      `;

      const { result } = renderHook(() => useNavigation());

      // Open mobile nav
      act(() => {
        result.current.handleHamburgerClick();
      });
      expect(result.current.mobileNavOpen).toBe(true);
      expect(document.body.style.overflow).toBe('hidden');

      // Click a link
      const linkElement = document.getElementById('home-link');
      act(() => {
        const mockEvent = {
          currentTarget: linkElement,
        } as any as React.MouseEvent;
        result.current.handleLinkClick(mockEvent);
      });
      expect(result.current.mobileNavOpen).toBe(false);
      expect(document.body.style.overflow).toBe('visible');
    });
  });
});
