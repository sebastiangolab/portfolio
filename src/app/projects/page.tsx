'use client';

import PageIntro from '@/components/PageIntro';
import Paragraph from '@/components/Paragraph';
import RealizationsSection from '@/sections/RealizationsSection';

export default function Projects() {
   return (
      <div className="projects">
         <PageIntro
            title={
               <>
                  My <span className="primary-color">Projects</span>
               </>
            }
            isSection
         >
            <Paragraph>
               Explore my diverse portfolio, from easy resposnive sites to
               innovative apps, wchich show my ability to adapt to different
               requirements . To made my pages I use diffrenet technologies and
               libraries to improve my skills. I make effective apps
               consistently exceeding client expectations.
            </Paragraph>
         </PageIntro>

         <RealizationsSection />
      </div>
   );
}
