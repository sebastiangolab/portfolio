import './button.scss';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactElement } from 'react';

interface Button {
   text: string;
   href?: string;
   title: string;
   isFormButton?: boolean;
   target?: HTMLAttributeAnchorTarget;
}

const Button = ({
   text,
   href,
   title,
   isFormButton,
   target,
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
      <Link href={href || ''} className="button" title={title} target={target}>
         {text}
      </Link>
   );
};

export default Button;
