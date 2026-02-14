import { performRequest } from '@/lib/datocms';
import { useEffect, useState, useMemo } from 'react';

const PROJECTS_QUERY = `query Realizations {
    allRealizations(first: 100) {
       image {
        url
       }
       link
       title
       technologies
   }
 }`;

export const DEFAULT_FILTER = 'All';

export interface Realization {
   image: {
      url: string;
   };
   link: string;
   title: string;
   technologies: string[];
}

interface HookResult {
   isLoading: boolean;
   allRealizations: Realization[];
   newestRealizations: Realization[];
   filters: string[];
   activeFilter: string;
   setActiveFilter: (val: string) => void;
}

const useRealizations = (): HookResult => {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [allRealizations, setAllRealizations] = useState<Realization[]>([]);
   const [activeFilter, setActiveFilter] = useState<string>(DEFAULT_FILTER);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await performRequest({
               query: PROJECTS_QUERY,
               variables: {},
               revalidate: 3600, // Cache for 1 hour instead of 0
            });

            setAllRealizations(result.allRealizations);
            setIsLoading(false);
         } catch (error) {
            console.error('Failed to fetch realizations:', error);
            setIsLoading(false);
         }
      };

      fetchData();
   }, []);

   const filters = useMemo(() => {
      if (!allRealizations?.length) return [DEFAULT_FILTER];

      const techSet = new Set<string>();

      for (const realization of allRealizations) {
         for (const tech of realization.technologies) {
            techSet.add(tech);
         }
      }

      return [DEFAULT_FILTER, ...Array.from(techSet).sort()];
   }, [allRealizations]);

   // Memoize newest realizations
   const newestRealizations = useMemo(
      () => allRealizations?.slice(0, 6) || [],
      [allRealizations]
   );

   return {
      isLoading,
      allRealizations,
      newestRealizations,
      filters,
      activeFilter,
      setActiveFilter,
   };
};

export default useRealizations;
