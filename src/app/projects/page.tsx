'use client';

import './projects.scss';
import Paragraph from '@/components/Global/Paragraph';
import PageTitle from '@/components/Global/PageTitle';
import Realizations from '@/components/Projects/Realizations';

export default function Projects() {
   return (
      <div className="projects">
         <div className="content">
            <PageTitle>Projects</PageTitle>
            <Paragraph>
               Hi, my name is Sebastian and I have been programming
               professionally for 5 years. During this time, I have made many
               projects (about 40-50 websites) as well as some interesting
               projects at home. I am looking for a job as a frontend developer,
               where i will can. at home. I am looking for.
            </Paragraph>
         </div>

         <Realizations />
      </div>
   );
}
