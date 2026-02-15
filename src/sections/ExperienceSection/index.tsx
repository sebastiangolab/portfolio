'use client';

import { MouseEvent, ReactNode } from 'react';
import './experienceSection.scss';
import SubTitle from '@/components/SubTitle';

interface Row {
   name: string;
   position: string;
   period: string;
   content: ReactNode;
}

const rows = [
   {
      name: 'Home.pl',
      position: 'Software Engineer',
      period: '10.05.2022 - now',
      content: (
         <>
            <ul>
               <li>Designed scalable multi-brand e-commerce architecture</li>
               <li>
                  Influenced architectural decisions around rendering, caching,
                  and data flow
               </li>
               <li>
                  Implemented SSG (Gatsby), SSR/ISR and caching improving
                  performance and stability
               </li>
               <li>
                  Created internal design system improving reuse and delivery
                  speed
               </li>
               <li>Improved Core Web Vitals and reduced system complexity</li>
               <li>
                  Used AI tools (Claude, Copilot, MCP) to accelerate development
                  and refactoring
               </li>
            </ul>
         </>
      ),
   },
   {
      name: 'Intermania Wadowice',
      position: 'Web Developer',
      period: '01.09.2017 - 10.05.2022',
      content: (
         <>
            <ul>
               <li>
                  Delivered production web applications and websites end-to-end
               </li>
               <li>
                  Delivered production web applications and websites end-to-end
               </li>
               <li>
                  Developed custom-coded WordPress themes from scratch, without
                  page builders
               </li>
               <li>
                  Worked directly with clients: requirements, UX/design,
                  implementation and deployment
               </li>
               <li>Improved performance, SEO, and page speed</li>
            </ul>
         </>
      ),
   },
];

const ExperienceSection = () => {
   const handleRowClick = (event: MouseEvent) => {
      const getRowElement = (
         target: HTMLElement | null,
      ): HTMLElement | null => {
         if (!target) {
            return null;
         }

         if (target.classList.contains('row')) {
            return target;
         }

         return getRowElement(target.parentElement);
      };

      const rowElement = getRowElement(event.target as HTMLElement);

      rowElement?.classList.toggle('content-hide');
   };

   return (
      <div className="section" id="experience">
         <SubTitle>Experience History</SubTitle>

         {rows.map((row: Row, index: number) => (
            <div
               className="row"
               onClick={handleRowClick}
               key={`${row.name}-${index}`}
            >
               <div className="row-grid">
                  <div className="column">
                     <p className="label">Company name</p>
                     <p className="text">{row.name}</p>
                  </div>

                  <div className="column">
                     <p className="label">Position</p>
                     <p className="text">{row.position}</p>
                  </div>

                  <div className="column">
                     <p className="label">Period of employment</p>
                     <p className="text">{row.period}</p>
                  </div>

                  <div className="arrow-icon">{'>'}</div>
               </div>

               <div className="row-content">
                  <div className="paragraph">{row.content}</div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default ExperienceSection;
