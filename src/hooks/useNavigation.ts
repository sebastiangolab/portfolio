import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface Results {
   activeHoverLink: string;
   mobileNavOpen: boolean;
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

   const handleHamburgerClick = () => {
      setMobileNavOpen((prevState: boolean) => {
         if (prevState) {
            document.body.style.overflow = 'visible';
         } else {
            document.body.style.overflow = 'hidden';
         }

         return !prevState;
      });
   };

   const setActiveCurrentPage = () => {
      const activeLinkElement = document.querySelector(
         `.nav [href='${pathname}']`,
      );

      if (activeLinkElement && activeLinkElement.id !== activeLink) {
         const elementBounding = activeLinkElement.getBoundingClientRect();
         const leftPosition = elementBounding.left + elementBounding.width / 2;

         const activeMarkElement = document.getElementById('active-mark');

         if (activeMarkElement) {
            activeMarkElement.style.top = '0';
            activeMarkElement.style.transform = `translateX(${leftPosition}px)`;
         }

         setActiveLink(activeLinkElement.id);
      }
   };

   const setActiveMarkPosition = () => {
      if (activeHoverLink) {
         const activeLinkElement = document.querySelector(
            `.nav #${activeHoverLink}`,
         );

         if (activeLinkElement) {
            const elementBounding = activeLinkElement.getBoundingClientRect();
            const leftPosition =
               elementBounding.left + elementBounding.width / 2;

            const activeMarkElement = document.getElementById('active-mark');
            if (activeMarkElement) {
               activeMarkElement.style.transform = `translateX(${leftPosition}px)`;
            }
         }
      }
   };

   const handleLinkClick = (event: React.MouseEvent) => {
      setActiveLink(event.currentTarget.id);
      setMobileNavOpen(false);
   };

   const handleLinkMouseEnter = (event: React.MouseEvent) => {
      let linkElement = event.currentTarget.querySelector('.nav-link');

      if (!linkElement) {
         linkElement = event.currentTarget;
      }

      setActiveHoverLink(linkElement ? linkElement.id : activeLink);
   };

   const handleLinkMouseLeave = () => {
      setActiveHoverLink(activeLink);
   };

   const hideActiveMark = () => {
      const activeMarkElement = document.getElementById('active-mark');

      activeMarkElement?.classList.add('hide');
   };

   return {
      activeHoverLink,
      mobileNavOpen,
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
