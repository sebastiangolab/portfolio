import useNavigation from '@/hooks/useNavigation';
import { useEffect, useLayoutEffect } from 'react';
import NavLink from '../NavLink';

const Navigation = () => {
   const {
      activeHoverLink,
      mobileNavOpen,
      setActiveCurrentPage,
      setActiveMarkPosition,
      handleHamburgerClick,
      handleLinkClick,
      handleLinkMouseEnter,
      handleLinkMouseLeave,
      hideActiveMark,
   } = useNavigation();

   useLayoutEffect(() => {
      window.addEventListener('resize', hideActiveMark);

      setActiveCurrentPage();

      return () => {
         window.removeEventListener('resize', hideActiveMark);
      };
   }, []);

   useEffect(setActiveMarkPosition, [activeHoverLink]);

   return (
      <>
         <div
            className={`hamburger ${mobileNavOpen ? 'open' : ''}`}
            onClick={handleHamburgerClick}
         >
            <span className="lines"></span>
         </div>

         <div className={`nav ${mobileNavOpen ? 'open' : ''}`}>
            <div id="active-mark"></div>

            <NavLink
               id="home"
               text="Home"
               href="/"
               handleOnClick={handleLinkClick}
               handleMouseEnter={handleLinkMouseEnter}
               handleMouseLeave={handleLinkMouseLeave}
            />

            <NavLink
               id="projects"
               text="Projects"
               href="/projects"
               handleOnClick={handleLinkClick}
               handleMouseEnter={handleLinkMouseEnter}
               handleMouseLeave={handleLinkMouseLeave}
            />

            <NavLink
               id="about"
               text="About me"
               href="/about-me"
               handleOnClick={handleLinkClick}
               handleMouseEnter={handleLinkMouseEnter}
               handleMouseLeave={handleLinkMouseLeave}
            />

            <NavLink
               id="contact"
               text="Contact"
               href="/contact"
               handleOnClick={handleLinkClick}
               handleMouseEnter={handleLinkMouseEnter}
               handleMouseLeave={handleLinkMouseLeave}
            />

            <NavLink
               id="cv"
               text="See my CV"
               href="/sebastian-golab-cv.pdf"
               handleOnClick={handleLinkClick}
               handleMouseEnter={handleLinkMouseEnter}
               handleMouseLeave={handleLinkMouseLeave}
               isButton
               target="_blank"
            />
         </div>
      </>
   );
};

export default Navigation;
