'use client';

import './aboutContentSection.scss';
import ImageWithSticker from '@/components/ImageWithSticker';
import PageIntro from '@/components/PageIntro';
import Paragraph from '@/components/Paragraph';
import aboutImage from '@/assets/about-image.jpg';
import aboutImageRetina from '@/assets/about-image@2x.jpg';
import aboutImageMobile from '@/assets/about-image-mobile.jpg';
import aboutImageMobileRetina from '@/assets/about-image-mobile@2x.jpg';
import useBreakpoint, { Breakpoints } from '@/hooks/useBreakpoint';

const AboutContentSection = () => {
   const isMobile = useBreakpoint(Breakpoints.START, Breakpoints.MOBILE);

   return (
      <div id="about-content" className="section">
         <div className="about-text">
            <PageIntro
               title={
                  <>
                     <span className="primary-color">About</span> me
                  </>
               }
            >
               <Paragraph>
                  Hi, i am Sebastian Gołąb and i works as a programmer since
                  2017, I specialize in as frontend developer who makes new
                  projects and advances existing ones. I am independent but also
                  I good feel in team work where together we can develop our
                  competencies.
               </Paragraph>

               <Paragraph>
                  I am person who not only creates code, but also engages in the
                  full scope of the design process. I will be happy to share my
                  experience and knowledge to create unique solutions together.
               </Paragraph>
            </PageIntro>
         </div>

         <div className="about-image">
            {isMobile ? (
               <ImageWithSticker
                  src={aboutImageMobile.src}
                  retinaSrc={aboutImageMobileRetina.src}
               />
            ) : (
               <ImageWithSticker
                  src={aboutImage.src}
                  retinaSrc={aboutImageRetina.src}
               />
            )}
         </div>
      </div>
   );
};

export default AboutContentSection;
