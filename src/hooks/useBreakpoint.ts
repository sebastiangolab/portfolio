import { useEffect, useState } from 'react';

export enum Breakpoints {
   START = 0,
   MOBILE = 767,
   TABLET = 991,
   SMALL_DESKTOP = 1199,
   LAPTOP = 1479,
}

const useBreakpoint = (min: Breakpoints, max?: Breakpoints) => {
   const [isBreakpoint, setIsBreakpoint] = useState<boolean>(checkBreakpoint());

   function checkBreakpoint(): boolean {
      let screenWidth = 0;

      if (typeof window !== 'undefined') {
         screenWidth = window.innerWidth;
      }

      if (max !== undefined) {
         return screenWidth > min && screenWidth <= max;
      }

      return screenWidth > min;
   }

   function handleResize(): void {
      setIsBreakpoint(checkBreakpoint());
   }

   useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return isBreakpoint;
};

export default useBreakpoint;
