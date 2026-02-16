import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useRealizations, { DEFAULT_FILTER, Realization } from './useRealizations';
import { server } from '@/tests/mocks/server';
import { http, HttpResponse } from 'msw';

describe('useRealizations', () => {
  it('should fetch and return realizations on mount', async () => {
    const { result } = renderHook(() => useRealizations());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.allRealizations).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.allRealizations).toHaveLength(1);
    expect(result.current.allRealizations[0]).toEqual({
      image: { url: 'https://example.com/image1.jpg' },
      link: 'https://project1.com',
      title: 'Project 1',
      technologies: ['React', 'TypeScript'],
    });
  });

  it('should return newest realizations (first 6)', async () => {
    const mockRealizations: Realization[] = Array.from(
      { length: 10 },
      (_, i) => ({
        image: { url: `https://example.com/image${i + 1}.jpg` },
        link: `https://project${i + 1}.com`,
        title: `Project ${i + 1}`,
        technologies: ['React'],
      })
    );

    server.use(
      http.post('/api/cms', () => {
        return HttpResponse.json({
          data: { allRealizations: mockRealizations },
        });
      })
    );

    const { result } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.newestRealizations).toHaveLength(6);
    expect(result.current.newestRealizations).toEqual(mockRealizations.slice(0, 6));
  });

  it('should generate filters from technologies', async () => {
    const mockRealizations: Realization[] = [
      {
        image: { url: 'https://example.com/image1.jpg' },
        link: 'https://project1.com',
        title: 'Project 1',
        technologies: ['React', 'TypeScript', 'Next.js'],
      },
      {
        image: { url: 'https://example.com/image2.jpg' },
        link: 'https://project2.com',
        title: 'Project 2',
        technologies: ['Vue', 'TypeScript'],
      },
      {
        image: { url: 'https://example.com/image3.jpg' },
        link: 'https://project3.com',
        title: 'Project 3',
        technologies: ['React', 'Sass'],
      },
    ];

    server.use(
      http.post('/api/cms', () => {
        return HttpResponse.json({
          data: { allRealizations: mockRealizations },
        });
      })
    );

    const { result } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.filters).toEqual([
      'All',
      'Next.js',
      'React',
      'Sass',
      'TypeScript',
      'Vue',
    ]);
  });

  it('should return only default filter when no realizations', async () => {
    server.use(
      http.post('/api/cms', () => {
        return HttpResponse.json({
          data: { allRealizations: [] },
        });
      })
    );

    const { result } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.filters).toEqual([DEFAULT_FILTER]);
  });

  it('should deduplicate technologies in filters', async () => {
    const mockRealizations: Realization[] = [
      {
        image: { url: 'https://example.com/image1.jpg' },
        link: 'https://project1.com',
        title: 'Project 1',
        technologies: ['React', 'TypeScript'],
      },
      {
        image: { url: 'https://example.com/image2.jpg' },
        link: 'https://project2.com',
        title: 'Project 2',
        technologies: ['React', 'TypeScript'],
      },
    ];

    server.use(
      http.post('/api/cms', () => {
        return HttpResponse.json({
          data: { allRealizations: mockRealizations },
        });
      })
    );

    const { result } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.filters).toEqual(['All', 'React', 'TypeScript']);
  });

  it('should sort filters alphabetically (except "All")', async () => {
    const mockRealizations: Realization[] = [
      {
        image: { url: 'https://example.com/image1.jpg' },
        link: 'https://project1.com',
        title: 'Project 1',
        technologies: ['Zend', 'Angular', 'MongoDB', 'Express'],
      },
    ];

    server.use(
      http.post('/api/cms', () => {
        return HttpResponse.json({
          data: { allRealizations: mockRealizations },
        });
      })
    );

    const { result } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.filters).toEqual([
      'All',
      'Angular',
      'Express',
      'MongoDB',
      'Zend',
    ]);
  });

  it('should initialize with default filter active', async () => {
    const { result } = renderHook(() => useRealizations());

    expect(result.current.activeFilter).toBe(DEFAULT_FILTER);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.activeFilter).toBe(DEFAULT_FILTER);
  });

  it('should allow changing active filter', async () => {
    const { result } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.activeFilter).toBe('All');

    result.current.setActiveFilter('React');

    await waitFor(() => {
      expect(result.current.activeFilter).toBe('React');
    });
  });

  it('should handle API errors gracefully', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    server.use(
      http.post('/api/cms', () => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.allRealizations).toEqual([]);
    expect(result.current.newestRealizations).toEqual([]);
    expect(result.current.filters).toEqual([DEFAULT_FILTER]);
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('should memoize filters to prevent unnecessary recalculations', async () => {
    const { result, rerender } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const firstFilters = result.current.filters;

    rerender();

    expect(result.current.filters).toBe(firstFilters);
  });

  it('should memoize newest realizations', async () => {
    const { result, rerender } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const firstNewest = result.current.newestRealizations;

    rerender();

    expect(result.current.newestRealizations).toBe(firstNewest);
  });

  it('should handle empty technologies array', async () => {
    const mockRealizations: Realization[] = [
      {
        image: { url: 'https://example.com/image1.jpg' },
        link: 'https://project1.com',
        title: 'Project 1',
        technologies: [],
      },
    ];

    server.use(
      http.post('/api/cms', () => {
        return HttpResponse.json({
          data: { allRealizations: mockRealizations },
        });
      })
    );

    const { result } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.filters).toEqual([DEFAULT_FILTER]);
  });

  it('should return empty array for newest realizations when no data', async () => {
    server.use(
      http.post('/api/cms', () => {
        return HttpResponse.json({
          data: { allRealizations: [] },
        });
      })
    );

    const { result } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.newestRealizations).toEqual([]);
  });

  it('should only fetch data once on mount', async () => {
    const fetchSpy = vi.fn();

    server.use(
      http.post('/api/cms', () => {
        fetchSpy();
        return HttpResponse.json({
          data: {
            allRealizations: [
              {
                image: { url: 'https://example.com/image1.jpg' },
                link: 'https://project1.com',
                title: 'Project 1',
                technologies: ['React'],
              },
            ],
          },
        });
      })
    );

    const { rerender } = renderHook(() => useRealizations());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    rerender();
    rerender();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
