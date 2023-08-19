import Link from 'next/link';
import { ReactElement } from 'react';

interface NavLink {
   id: string;
   text: string;
   href: string;
   handleOnClick: (event: React.MouseEvent) => void;
   handleMouseEnter: (event: React.MouseEvent) => void;
   handleMouseLeave: () => void;
}

const NavLink = ({
   id,
   text,
   href,
   handleOnClick,
   handleMouseEnter,
   handleMouseLeave,
}: NavLink): ReactElement => {
   return (
      <div
         className="container-link"
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <Link href={href} className="link" onClick={handleOnClick} id={id}>
            {text}
         </Link>
      </div>
   );
};

export default NavLink;
