import { ReactElement } from 'react';
import EmployedBlockSection from '@/sections/EmployedBlockSection';
import ExperienceSection from '@/sections/ExperienceSection';
import HomeIntroSection from '@/sections/HomeIntroSection';
import HomeContactSection from '@/sections/HomeContactSection';
import RealizationsSection from '@/sections/RealizationsSection';

export default function Home(): ReactElement {
   return (
      <div id="home-page">
         <HomeIntroSection />

         <EmployedBlockSection />

         <RealizationsSection
            title={
               <>
                  Newest <span className="primary-color">Projects</span>
               </>
            }
            hasNewestOnly
         />

         <ExperienceSection />

         <HomeContactSection />
      </div>
   );
}
