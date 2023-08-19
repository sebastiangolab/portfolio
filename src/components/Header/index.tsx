'use client';

import Link from 'next/link';
import React, { ReactElement } from 'react';
import './header.scss';
import Navigation from './Navigation';

const Header = (): ReactElement => {
   return (
      <div className="header">
         <Link href="/" className="logo">
            ImSebastian
         </Link>

         <Navigation />
      </div>
   );
};

export default Header;
