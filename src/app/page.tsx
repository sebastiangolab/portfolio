'use client';

import './home.scss';
import { ReactElement } from 'react';
import avatar from '@/images/avatar.jpg';
import { HomeImageDecorator } from '@/images/home-image-decorator';
import { MobileHomeImageDecorator } from '@/images/mobile-home-image-decorator';
import Paragraph from '@/components/Global/Paragraph';
import Socials from '@/components/Global/Socials';
import Button from '@/components/Global/Button';
import useBreakpoint, { Breakpoints } from '@/hooks/useBreakpoint';

export default function Home(): ReactElement {
   const isMobile = useBreakpoint(Breakpoints.START, Breakpoints.MOBILE);

   return (
      <div className="home">
         <div className="content">
            <p className="subtitle">Hi I’m</p>
            <h1 className="title">Sebastian Gołąb</h1>
            <h2 className="subtitle">Frontend developer</h2>

            <Paragraph>
               Hi, my name is Sebastian and I have been programming
               professionally for 5 years. During this time, I have made many
               projects (about 40-50 websites) as well as some interesting
               projects at home.
            </Paragraph>

            <Socials />

            <Button text="Projects" href="/projects" title="projects" />
         </div>

         <div className="image">
            <div className="circle-frame">
               <img src={avatar.src} alt="my face avatar" className="avatar" />
            </div>

            <div className="decorator">
               {!isMobile ? <HomeImageDecorator /> : null}
               {isMobile ? <MobileHomeImageDecorator /> : null}
            </div>
         </div>
      </div>
   );
}
