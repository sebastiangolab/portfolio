import { usePathname } from 'next/navigation';
import { useState, useCallback, useRef, useEffect } from 'react';

interface Results {
   activeHoverLink: string;
   mobileNavOpen: boolean;
   navRef: React.RefObject<HTMLElement>;
   activeMarkRef: React.RefObject<HTMLDivElement>;
   setActiveCurrentPage: () => void;
   setActiveMarkPosition: () => void;
   handleHamburgerClick: () => void;
   handleLinkClick: (event: React.MouseEvent) => void;
   handleLinkMouseEnter: (event: React.MouseEvent) => void;
   handleLinkMouseLeave: () => void;
   hideActiveMark: () => void;
}

const useNavigation = (): Results => {
   const pathname = usePathname();
   const [activeLink, setActiveLink] = useState<string>('');
   const [activeHoverLink, setActiveHoverLink] = useState<string>('');
   const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

   // Use refs instead of repeated DOM queries
   const navRef = useRef<HTMLElement>(null);
   const activeMarkRef = useRef<HTMLDivElement>(null);

   const handleHamburgerClick = useCallback(() => {
      setMobileNavOpen((prevState: boolean) => {
         document.body.style.overflow = prevState ? 'visible' : 'hidden';
         return !prevState;
      });
   }, []);

   const setActiveCurrentPage = useCallback(() => {
      if (!navRef.current || !activeMarkRef.current) return;

      const activeLinkElement = navRef.current.querySelector(
         `[href='${pathname}']`,
      ) as HTMLElement;

      if (activeLinkElement && activeLinkElement.id !== activeLink) {
         const elementBounding = activeLinkElement.getBoundingClientRect();
         const leftPosition = elementBounding.left + elementBounding.width / 2;

         activeMarkRef.current.style.top = '0';
         activeMarkRef.current.style.transform = `translateX(${leftPosition}px)`;

         setActiveLink(activeLinkElement.id);
      }
   }, [pathname, activeLink]);

   const setActiveMarkPosition = useCallback(() => {
      if (!activeHoverLink || !navRef.current || !activeMarkRef.current) return;

      const activeLinkElement = navRef.current.querySelector(
         `#${activeHoverLink}`,
      ) as HTMLElement;

      if (activeLinkElement) {
         const elementBounding = activeLinkElement.getBoundingClientRect();
         const leftPosition = elementBounding.left + elementBounding.width / 2;

         activeMarkRef.current.style.transform = `translateX(${leftPosition}px)`;
      }
   }, [activeHoverLink]);

   const handleLinkClick = useCallback((event: React.MouseEvent) => {
      document.body.style.overflow = 'visible';
      setActiveLink(event.currentTarget.id);
      setMobileNavOpen(false);
   }, []);

   const handleLinkMouseEnter = useCallback((event: React.MouseEvent) => {
      let linkElement = event.currentTarget.querySelector('.nav-link') as HTMLElement;

      if (!linkElement) {
         linkElement = event.currentTarget as HTMLElement;
      }

      setActiveHoverLink(linkElement?.id || '');
   }, []);

   const handleLinkMouseLeave = useCallback(() => {
      setActiveHoverLink(activeLink);
   }, [activeLink]);

   const hideActiveMark = useCallback(() => {
      activeMarkRef.current?.classList.add('hide');
   }, []);

   // Update active hover link when active link changes
   useEffect(() => {
      setActiveHoverLink(activeLink);
   }, [activeLink]);

   return {
      activeHoverLink,
      mobileNavOpen,
      navRef,
      activeMarkRef,
      setActiveCurrentPage,
      setActiveMarkPosition,
      handleHamburgerClick,
      handleLinkClick,
      handleLinkMouseEnter,
      handleLinkMouseLeave,
      hideActiveMark,
   };
};

export default useNavigation;
