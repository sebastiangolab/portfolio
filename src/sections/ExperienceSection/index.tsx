'use client';

import { MouseEvent } from 'react';
import Paragraph from '@/components/Paragraph';
import './experienceSection.scss';
import SubTitle from '@/components/SubTitle';

interface Row {
   name: string;
   position: string;
   period: string;
   text: string;
}

const rows = [
   {
      name: 'Home.pl',
      position: 'Frontend developer',
      period: '10.05.2022 - now',
      text: 'In Intermania i made many projects in Wordpress, every website was maked on template which i design in figma and wrote from zero. I participated in every website process from talking with clients to final product.',
   },
   {
      name: 'Intermania Wadowice',
      position: 'Web Developer',
      period: '01.09.2017 - 10.05.2022',
      text: 'At Home.pl I work as frontend developer in team who work on one large e- commerce project, we make new solutions, develop our project in terms of performance and fix bugs. I cooperate with UX and UI designers and business teams to make best product for our clients.',
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
               className="row content-hide"
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
                  <Paragraph>{row.text}</Paragraph>
               </div>
            </div>
         ))}
      </div>
   );
};

export default ExperienceSection;
