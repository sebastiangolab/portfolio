'use client';

import './aboutContentSection.scss';
import ImageWithSticker from '@/components/ImageWithSticker';
import PageIntro from '@/components/PageIntro';
import Paragraph from '@/components/Paragraph';
import aboutImageRetina from '@/assets/about-image@2x.webp';
import aboutImageMobileRetina from '@/assets/about-image-mobile@2x.webp';

const AboutContentSection = () => (
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
               Hi, i am Sebastian Gołąb and i works as a programmer since 2017,
               I specialize in as frontend developer who makes new projects and
               advances existing ones. I am independent but also I good feel in
               team work where together we can develop our competencies.
            </Paragraph>

            <Paragraph>
               I am person who not only creates code, but also engages in the
               full scope of the design process. I will be happy to share my
               experience and knowledge to create unique solutions together.
            </Paragraph>
         </PageIntro>
      </div>

      <div className="about-image">
         <ImageWithSticker
            className="desktop-hide"
            src={aboutImageMobileRetina.src}
            width={737}
            height={434}
            blurDataURL={aboutImageMobileRetina.blurDataURL}
            isPriority
         />

         <ImageWithSticker
            className="mobile-hide"
            src={aboutImageRetina.src}
            blurDataURL={aboutImageRetina.blurDataURL}
            isPriority
            isFill
         />
      </div>
   </div>
);

export default AboutContentSection;
