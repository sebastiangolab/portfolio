import Button from '@/components/Button';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactElement } from 'react';

interface NavLink {
   id: string;
   text: string;
   href: string;
   handleOnClick: (event: React.MouseEvent) => void;
   handleMouseEnter: (event: React.MouseEvent) => void;
   handleMouseLeave: () => void;
   isButton?: boolean;
   target?: HTMLAttributeAnchorTarget;
}

const NavLink = ({
   id,
   text,
   href,
   handleOnClick,
   handleMouseEnter,
   handleMouseLeave,
   isButton,
   target,
}: NavLink): ReactElement => {
   return (
      <div
         id={`wrapper-${id}`}
         className="container-link"
         onMouseEnter={isButton ? undefined : handleMouseEnter}
         onMouseLeave={isButton ? undefined : handleMouseLeave}
      >
         {isButton ? (
            <Button text={text} href={href} title={text} />
         ) : (
            <Link
               href={href}
               className="nav-link"
               onClick={handleOnClick}
               id={id}
               target={target}
            >
               {text}
            </Link>
         )}
      </div>
   );
};

export default NavLink;
