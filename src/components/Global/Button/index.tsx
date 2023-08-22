import './button.scss';
import Link from 'next/link';
import { ReactElement } from 'react';

interface Button {
   text: string;
   href: string;
   title: string;
}

const Button = ({ text, href, title }: Button): ReactElement<Button> => (
   <Link href={href} className="button" title={title}>
      {text}
   </Link>
);

export default Button;
