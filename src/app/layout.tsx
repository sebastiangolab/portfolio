import { ReactElement, ReactNode } from 'react';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { Roboto } from 'next/font/google';
import '@/styles/global.scss';

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });

export const metadata = {
   title: 'Sebastian Gołąb',
   description:
      "Experienced software engineer who has worked as a programmer since 2017. I like challenges and learning new technologies. Let's turn ideas into reality!",
};

export default function RootLayout({
   children,
}: {
   children: ReactNode;
}): ReactElement {
   return (
      <html lang="en">
         <body className={roboto.className}>
            <Layout>
               <>
                  <Header />
                  {children}
               </>
            </Layout>
         </body>
      </html>
   );
}
