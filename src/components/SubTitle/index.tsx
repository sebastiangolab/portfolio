import './subTitle.scss';
import { ReactNode } from 'react';

interface SubTitleProps {
   children: ReactNode;
   isCenter?: boolean;
}

const SubTitle = ({ children, isCenter }: SubTitleProps) => (
   <h2 className={`sub-title ${isCenter ? 'center' : ''}`}>{children}</h2>
);

export default SubTitle;
