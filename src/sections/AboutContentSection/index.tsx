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
               Software Engineer with 8+ years of experience building scalable
               web applications and multi-brand platforms. Specialized in
               TypeScript, React, and Next.js, with a strong focus on
               architecture, performance, and long-term maintainability.
               Experienced in modern rendering strategies (SSR/ISR/SSG),
               caching, authentication, and API-driven systems. Frontend-strong,
               fullstack-leaning engineer who leverages AI-assisted development
               to build faster and smarter.
            </Paragraph>

            <Paragraph>
               <strong>CORE SKILLS</strong>
               <br />
               Scalable Web Architecture • Performance • API-driven Systems •
               SSR/ISR/SSG • Caching • Auth & Access Control • Design Systems •
               Maintainability • WCAG • SEO • AI-assisted Development
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
