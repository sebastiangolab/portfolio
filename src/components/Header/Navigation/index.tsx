import useNavigation from '@/hooks/useNavigation';
import { useEffect, useLayoutEffect } from 'react';
import NavLink from '../NavLink';

const Navigation = () => {
   const {
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
   } = useNavigation();

   useLayoutEffect(() => {
      window.addEventListener('resize', hideActiveMark);

      setActiveCurrentPage();

      return () => {
         window.removeEventListener('resize', hideActiveMark);
      };
   }, [hideActiveMark, setActiveCurrentPage]);

   useEffect(setActiveMarkPosition, [activeHoverLink, setActiveMarkPosition]);

   return (
      <>
         <div
            className={`hamburger ${mobileNavOpen ? 'open' : ''}`}
            onClick={handleHamburgerClick}
         >
            <span className="lines"></span>
         </div>

         <nav ref={navRef} className={`nav ${mobileNavOpen ? 'open' : ''}`}>
            <div ref={activeMarkRef} id="active-mark"></div>

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
         </nav>
      </>
   );
};

export default Navigation;
