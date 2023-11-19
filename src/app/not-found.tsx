import { ReactElement } from 'react';
import Paragraph from '@/components/Paragraph';
import SubTitle from '@/components/SubTitle';

export default function NotFoundPage(): ReactElement {
   return (
      <div id="page-404">
         <SubTitle>Ooops, something is wrong with your link :C</SubTitle>
         <Paragraph>
            Please check entered link or use the navigation above
         </Paragraph>
      </div>
   );
}
