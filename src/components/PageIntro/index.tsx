import './pageIntro.scss';
import { ReactNode } from 'react';

interface PageIntroProps {
   title: ReactNode;
   children: ReactNode;
   isSection?: boolean;
}

const PageIntro = ({ title, children, isSection }: PageIntroProps) => (
   <div className={`page-intro ${!!isSection ? 'section' : ''}`}>
      <h1 className="title">{title}</h1>

      {children}
   </div>
);

export default PageIntro;
