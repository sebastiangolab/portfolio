import { performRequest } from '@/lib/datocms';
import { useEffect, useState } from 'react';

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
               includeDrafts: false,
               excludeInvalid: false,
               visualEditingBaseUrl: undefined,
               revalidate: 0,
            });

            setAllRealizations(result.allRealizations);
            setIsLoading(false);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, []);

   const filters: string[] = [DEFAULT_FILTER];

   if (allRealizations) {
      allRealizations.forEach((realization: Realization) => {
         realization.technologies.forEach(technology => {
            if (!filters.find(filter => filter === technology)) {
               filters.push(technology);
            }
         });
      });
   }

   const newestRealizations =
      allRealizations?.filter((realization: Realization, index) => index < 6) ||
      [];

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
