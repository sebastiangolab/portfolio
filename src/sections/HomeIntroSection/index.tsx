'use client';

import './homeIntroSection.scss';
import avatarRetina from '@/assets/avatar@2x.webp';
import avatarMobileRetina from '@/assets/avatar-mobile@2x.webp';
import Paragraph from '@/components/Paragraph';
import Socials from '@/components/Socials';
import { UserIcon } from '@/assets/user';
import { ProjectsIcon } from '@/assets/projects';
import ImageWithSticker from '@/components/ImageWithSticker';

const HomeIntroSection = () => (
   <div className="section" id="home-intro">
      <div className="flex-wrapper">
         <div className="content">
            <h1 className="title">
               Hi I’m
               <br />
               <span className="primary-color">Sebastian</span>
            </h1>

            <Paragraph>
               Software Engineer with 8+ years building scalable web
               applications and multi-brand platforms. Specialized in
               TypeScript, React, and Next.js with strong focus on architecture,
               performance, and maintainable systems. Frontend-strong,
               fullstack-leaning engineer using AI-assisted development.
            </Paragraph>

            <div className="info-blocks">
               <div className="block secondary-bg">
                  <div className="icon">
                     <UserIcon />
                  </div>

                  <div className="block-content">
                     <div className="label">Experience</div>
                     <div className="text">
                        8 <span className="text-small">years</span>
                     </div>
                  </div>
               </div>

               <div className="block primary-bg">
                  <div className="icon">
                     <ProjectsIcon />
                  </div>

                  <div className="block-content">
                     <div className="label">Projects</div>
                     <div className="text">+30</div>
                  </div>
               </div>
            </div>
         </div>

         <div className="image">
            <h1 className="title">
               Hi I’m <span className="primary-color">Sebastian</span>
            </h1>

            <ImageWithSticker
               className="desktop-hide"
               src={avatarMobileRetina.src}
               width={737}
               height={434}
               blurDataURL={avatarMobileRetina.blurDataURL}
               isPriority
            />

            <ImageWithSticker
               className="mobile-hide"
               src={avatarRetina.src}
               blurDataURL={avatarRetina.blurDataURL}
               isPriority
               isFill
            />
         </div>
      </div>

      <div className="socials-wapper">
         <Socials />
      </div>
   </div>
);

export default HomeIntroSection;
