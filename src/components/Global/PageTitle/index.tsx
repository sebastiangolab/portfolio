import { ReactElement, ReactNode } from 'react';
import './pageTitle.scss';

const PageTitle = ({ children }: { children: ReactNode }): ReactElement => {
   return <h1 className="page-title">{children}</h1>;
};

export default PageTitle;
