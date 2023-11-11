import './button.scss';
import Link from 'next/link';
import { ReactElement } from 'react';

interface Button {
   text: string;
   href?: string;
   title: string;
   isFormButton?: boolean;
}

const Button = ({
   text,
   href,
   title,
   isFormButton,
}: Button): ReactElement<Button> => {
   if (isFormButton) {
      return (
         <>
            <button type="submit" title={title} className="button">
               {text}
            </button>
         </>
      );
   }

   return (
      <Link href={href || ''} className="button" title={title}>
         {text}
      </Link>
   );
};

export default Button;
