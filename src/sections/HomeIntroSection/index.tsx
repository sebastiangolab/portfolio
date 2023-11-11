'use client';

import './homeIntroSection.scss';
import avatar from '@/assets/avatar.jpg';
import avatarRetina from '@/assets/avatar@2x.jpg';
import avatarMobile from '@/assets/avatar-mobile.jpg';
import avatarMobileRetina from '@/assets/avatar-mobile@2x.jpg';
import Paragraph from '@/components/Paragraph';
import Socials from '@/components/Socials';
import { UserIcon } from '@/assets/user';
import { ProjectsIcon } from '@/assets/projects';
import ImageWithSticker from '@/components/ImageWithSticker';
import useBreakpoint, { Breakpoints } from '@/hooks/useBreakpoint';

const HomeIntroSection = () => {
   const isMobile = useBreakpoint(Breakpoints.START, Breakpoints.MOBILE);

   return (
      <div className="section" id="home-intro">
         <div className="flex-wrapper">
            <div className="content">
               <h1 className="title">
                  Hi I’m
                  <br />
                  <span className="primary-color">Sebastian</span>
               </h1>

               <Paragraph>
                  I am Sebastian Gołąb, experienced frontend developer who has
                  worked as a programmer since 2017. I like challenges and
                  learning new technologies. I made many projects. Let's turn
                  ideas into reality!
               </Paragraph>

               <div className="info-blocks">
                  <div className="block secondary-bg">
                     <div className="icon">
                        <UserIcon />
                     </div>

                     <div className="block-content">
                        <div className="label">Experience</div>
                        <div className="text">
                           5 <span className="text-small">years</span>
                        </div>
                     </div>
                  </div>

                  <div className="block primary-bg">
                     <div className="icon">
                        <ProjectsIcon />
                     </div>

                     <div className="block-content">
                        <div className="label">Projects</div>
                        <div className="text">+40</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="image">
               <h1 className="title">
                  Hi I’m <span className="primary-color">Sebastian</span>
               </h1>

               {isMobile ? (
                  <ImageWithSticker
                     retinaSrc={avatarMobileRetina.src}
                     src={avatarMobile.src}
                  />
               ) : (
                  <ImageWithSticker
                     retinaSrc={avatarRetina.src}
                     src={avatar.src}
                  />
               )}
            </div>
         </div>

         <div className="socials-wapper">
            <Socials />
         </div>
      </div>
   );
};

export default HomeIntroSection;
