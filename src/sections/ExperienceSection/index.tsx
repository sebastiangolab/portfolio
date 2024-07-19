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
      text: 'I work as a frontend developer in a team that develops an engine for building static websites based on CMS, design system and e-commerce functionalities for our product.',
   },
   {
      name: 'Intermania Wadowice',
      position: 'Web Developer',
      period: '01.09.2017 - 10.05.2022',
      text: 'I mainly coded websites based on the Wordpress CMS. I took an active part in every process of creating the website, from talking with client, creating design in Figma, to the final product.',
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
