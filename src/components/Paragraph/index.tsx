import { ReactElement, ReactNode } from 'react';
import './paragraph.scss';

interface ParagraphProps {
   children: ReactNode;
}

const Paragraph = ({
   children,
}: ParagraphProps): ReactElement<ParagraphProps> => (
   <p className="paragraph">{children}</p>
);

export default Paragraph;
