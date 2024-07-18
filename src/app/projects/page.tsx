'use client';

import PageIntro from '@/components/PageIntro';
import Paragraph from '@/components/Paragraph';
import RealizationsSection from '@/sections/RealizationsSection';

export default function Projects() {
   return (
      <div className="projects-page">
         <PageIntro
            title={<span className="primary-color">Projects</span>}
            isSection
         >
            <Paragraph>
               Explore my portfolio, where you will find commercial projects I
               worked on, those I designed from the beginning, and those I did
               privately as a hobby in free time.
            </Paragraph>
         </PageIntro>

         <RealizationsSection />
      </div>
   );
}
